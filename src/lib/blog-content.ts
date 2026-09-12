import { createReader } from '@keystatic/core/reader';
import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import type { Root, RootContent } from 'mdast';
import config from '../../keystatic.config';
import type { BlogPost, Chapter, ContentMetadata, Heading, Series } from '../data/blog';

export interface BlogContent {
  articles: BlogPost[];
  series: Series[];
  articleBodies: Map<string, string>;
  chapterBodies: Map<string, string>;
}

export function inspectMdx(source: string) {
  const tree = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).parse(source);
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  function walk(node: Root | RootContent) {
    if (node.type === 'heading') {
      const title = toString(node);
      const id = slugger.slug(title);
      if (node.depth === 2 || node.depth === 3) headings.push({ id, title, level: node.depth });
    }
    if ('children' in node) for (const child of node.children) walk(child as RootContent);
  }
  walk(tree);
  const words = toString(tree).trim().split(/\s+/u).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(words / 200));
  return { headings, readMinutes, readTime: `${readMinutes} min read` };
}

function assertPublishedDate(value: string | null, label: string): asserts value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`${label}: a valid publication date is required.`);
  }
}

function isPublished(entry: { publication: string; publishedAt: string | null }, now: Date) {
  return entry.publication === 'published' && !!entry.publishedAt && entry.publishedAt <= now.toISOString().slice(0, 10);
}

type MetadataEntry = {
  title: string; publishedAt: string | null; updatedAt: string | null;
  coverImage: string | null; coverAlt: string;
  seo: { title: string; description: string; image: string | null };
};

function metadata(slug: string, entry: MetadataEntry): ContentMetadata {
  assertPublishedDate(entry.publishedAt, entry.title);
  if (entry.updatedAt && entry.updatedAt < entry.publishedAt) throw new Error(`${entry.title}: last updated cannot be before publication.`);
  return {
    slug, title: entry.title,
    publishedDate: entry.publishedAt,
    updatedDate: entry.updatedAt || entry.publishedAt,
    publishedAt: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(entry.publishedAt)),
    coverImage: entry.coverImage, coverAlt: entry.coverAlt, seo: { ...entry.seo },
  };
}

function roman(number: number) {
  let result = '';
  for (const [value, letter] of [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']] as const) {
    while (number >= value) { result += letter; number -= value; }
  }
  return result;
}

// The root argument allows the same production loader to be exercised against isolated fixtures.
export async function loadBlogContent(root = process.cwd(), now = new Date()): Promise<BlogContent> {
  const reader = createReader(root, config);
  const [rawArticles, rawSeries, rawChapters] = await Promise.all([
    reader.collections.articles.all(), reader.collections.series.all(), reader.collections.chapters.all(),
  ]);
  const articleBodies = new Map<string, string>();
  const chapterBodies = new Map<string, string>();
  const articles: BlogPost[] = [];
  for (const { slug, entry } of rawArticles) {
    if (!isPublished(entry, now)) continue;
    if (slug === 'series') throw new Error('The article slug "series" is reserved. Choose another slug.');
    const body = await entry.body();
    if (!body.trim()) throw new Error(`${entry.title}: published articles need a body.`);
    articles.push({ ...metadata(slug, entry), description: entry.description, category: entry.category, tags: [...entry.tags], coverType: entry.coverType, ...inspectMdx(body) });
    articleBodies.set(slug, body);
  }
  articles.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate) || a.slug.localeCompare(b.slug));

  const series: Series[] = [];
  for (const { slug, entry } of rawSeries) {
    if (!isPublished(entry, now)) continue;
    const publishedChapters = rawChapters.filter(chapter => chapter.entry.series === slug && isPublished(chapter.entry, now))
      .sort((a, b) => (a.entry.part ?? 0) - (b.entry.part ?? 0) || (a.entry.order ?? 0) - (b.entry.order ?? 0));
    const parts = entry.parts.map((part, index) => ({ id: `part-${index + 1}`, partNumber: `PART ${roman(index + 1)}`, title: part.title, chapters: [] as Chapter[] }));
    const orders = new Set<number>();
    let minutes = 0;
    for (const [index, chapter] of publishedChapters.entries()) {
      const ch = chapter.entry;
      const part = parts[(ch.part ?? 0) - 1];
      if (!part) throw new Error(`${ch.title}: part ${ch.part} does not exist in ${entry.title}.`);
      if (!ch.order || orders.has(ch.order)) throw new Error(`${entry.title}: published chapters must have unique, positive chapter orders.`);
      orders.add(ch.order);
      const body = await ch.body();
      if (!body.trim()) throw new Error(`${ch.title}: published chapters need a body.`);
      const stats = inspectMdx(body);
      minutes += stats.readMinutes;
      part.chapters.push({ ...metadata(chapter.slug, ch), summary: ch.summary, number: index + 1, ...stats });
      chapterBodies.set(`${slug}/${chapter.slug}`, body);
    }
    series.push({
      ...metadata(slug, entry), description: entry.description, subtitle: entry.subtitle,
      eyebrow: 'SERIES', status: entry.status, featured: entry.featured,
      articleCount: publishedChapters.length, totalReadTime: minutes >= 60 ? `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ''} read` : `${minutes} min read`,
      parts: parts.filter(part => part.chapters.length > 0), overview: entry.overview, audience: entry.audience,
      resourcesDescription: entry.resourcesDescription, resources: entry.resources.map(resource => ({ ...resource })),
    });
  }
  series.sort((a, b) => Number(b.featured) - Number(a.featured) || b.publishedDate.localeCompare(a.publishedDate) || a.slug.localeCompare(b.slug));
  return { articles, series, articleBodies, chapterBodies };
}
