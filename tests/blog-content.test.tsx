import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { renderToStaticMarkup } from 'react-dom/server';
import { inspectMdx, loadBlogContent } from '../src/lib/blog-content';
import { articleJsonLd, contentMetadata, serializeJsonLd } from '../src/lib/blog-seo';
import MdxBody from '../src/components/blog/MdxBody';

const now = new Date('2026-09-12T12:00:00Z');
const base = { title: 'Test entry', publication: 'published', publishedAt: '2026-09-01', seo: {} };
const article = { ...base, description: 'Description', category: 'Development', tags: ['Tutorials'], coverType: 'code' };
const series = { ...base, description: 'Description', subtitle: 'Introduction', status: 'Ongoing', featured: false, overview: 'About this series', parts: [{ title: 'Foundation' }, { title: 'Practice' }], resources: [] };
const chapter = { ...base, series: 'test-series', part: 1, order: 1, summary: 'Chapter summary' };

async function fixture(t: TestContext) {
  const root = await mkdtemp(join(tmpdir(), 'keystatic-blog-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const collection of ['articles', 'series', 'chapters']) await mkdir(join(root, 'content', collection), { recursive: true });
  return {
    root,
    async write(collection: string, slug: string, entry: Record<string, unknown>, body = '## Test heading\n\nTest body.') {
      const mdx = collection !== 'series';
      // JSON is also valid YAML, which lets the real Keystatic Reader parse these fixtures.
      const text = mdx ? `---\n${JSON.stringify(entry)}\n---\n${body}\n` : JSON.stringify(entry);
      await writeFile(join(root, 'content', collection, `${slug}.${mdx ? 'mdx' : 'yaml'}`), text);
    },
  };
}

test('empty CMS returns an empty blog without demo fallback', async t => {
  const { root } = await fixture(t);
  const result = await loadBlogContent(root, now);
  assert.deepEqual(result.articles, []);
  assert.deepEqual(result.series, []);
});

test('publish, update, and unpublish change visibility without leaking drafts or future posts', async t => {
  const f = await fixture(t);
  await f.write('articles', 'visible', article);
  await f.write('articles', 'draft', { ...article, publication: 'draft' }, 'SECRET DRAFT');
  await f.write('articles', 'future', { ...article, publishedAt: '2099-01-01' });
  let result = await loadBlogContent(f.root, now);
  assert.deepEqual(result.articles.map(a => a.slug), ['visible']);
  assert.deepEqual([...result.articleBodies.keys()], ['visible']);
  await f.write('articles', 'visible', { ...article, title: 'Updated title', updatedAt: '2026-09-10' }, 'Updated body.');
  result = await loadBlogContent(f.root, now);
  assert.equal(result.articles[0].title, 'Updated title');
  assert.equal(result.articleBodies.get('visible'), 'Updated body.\n');
  await f.write('articles', 'visible', { ...article, publication: 'draft' });
  assert.equal((await loadBlogContent(f.root, now)).articles.length, 0);
});

test('multiple series group and number only their published chapters', async t => {
  const f = await fixture(t);
  await f.write('series', 'test-series', series);
  await f.write('series', 'second-series', { ...series, featured: true });
  await f.write('series', 'draft-series', { ...series, publication: 'draft' });
  await f.write('chapters', 'later', { ...chapter, part: 2, order: 30 });
  await f.write('chapters', 'start-here', { ...chapter, order: 10 });
  await f.write('chapters', 'draft-chapter', { ...chapter, order: 20, publication: 'draft' });
  await f.write('chapters', 'hidden-parent', { ...chapter, series: 'draft-series' });
  const result = await loadBlogContent(f.root, now);
  assert.deepEqual(result.series.map(s => s.slug), ['second-series', 'test-series']);
  const current = result.series[1];
  assert.equal(current.articleCount, 2);
  assert.equal(current.totalReadTime, '2 min read');
  assert.deepEqual(current.parts.flatMap(p => p.chapters.map(c => [c.slug, c.number])), [['start-here', 1], ['later', 2]]);
  assert.deepEqual([...result.chapterBodies.keys()].sort(), ['test-series/later', 'test-series/start-here']);
  assert.equal(result.series[0].parts.length, 0);
});

test('invalid chapter placement and duplicate ordering fail with actionable messages', async t => {
  const f = await fixture(t);
  await f.write('series', 'test-series', series);
  await f.write('chapters', 'bad', { ...chapter, part: 8 });
  await assert.rejects(loadBlogContent(f.root, now), /part 8 does not exist/);
  await f.write('chapters', 'bad', chapter);
  await f.write('chapters', 'duplicate', chapter);
  await assert.rejects(loadBlogContent(f.root, now), /unique, positive chapter orders/);
});

test('MDX renders headings, tables, quotes, code, and literal component props in the existing styles', async () => {
  const code = 'const answer = 42;\nconsole.log(answer);';
  const source = `## Hello **world**\n\n### Repeated\n\n### Repeated\n\n> A quote\n\n| Name | Value |\n| --- | --- |\n| Answer | 42 |\n\n\`\`\`js\n${code}\n\`\`\`\n\n<Callout title="Remember">\n\nA useful note.\n\n</Callout>\n\n<CodeBlock code={${JSON.stringify(code)}} language="js" filename="answer.js" />`;
  const html = renderToStaticMarkup(await MdxBody({ source }));
  const { headings } = inspectMdx(source);
  assert.deepEqual(headings.map(h => h.id), ['hello-world', 'repeated', 'repeated-1']);
  for (const { id } of headings) assert.ok(html.includes(`id="${id}"`), id);
  assert.match(html, /<table/);
  assert.match(html, /<blockquote/);
  assert.match(html, /A useful note/);
  assert.match(html, /answer.js/);
  assert.match(html, /const answer = 42;/);
  assert.match(html, /console.log\(answer\);/);
  assert.doesNotMatch(html, /<pre[^>]*><tbody/);
});

test('article SEO has its own canonical, sharing image, dates, and safe structured data', async t => {
  const f = await fixture(t);
  await f.write('articles', 'seo', { ...article, title: 'Title </script>', seo: { title: 'Search title', description: 'Search description' } });
  const entry = (await loadBlogContent(f.root, now)).articles[0];
  const meta = contentMetadata(entry, entry.description, '/blog/seo');
  assert.equal(meta.alternates?.canonical, 'https://owaish.codes/blog/seo');
  assert.equal(meta.title, 'Search title | Md Owaish Alam');
  assert.equal(meta.description, 'Search description');
  const data = articleJsonLd(entry, entry.description, '/blog/seo');
  assert.equal(data.datePublished, '2026-09-01');
  assert.ok(data.image.includes('/api/blog/og?path='));
  assert.ok(!serializeJsonLd(data).includes('</script>'));
});
