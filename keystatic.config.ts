import { collection, config, fields } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';
import { blogCategories } from './src/data/blog';

const repository = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;

const title = () => fields.slug({
  name: { label: 'Title', validation: { isRequired: true } },
  slug: { label: 'URL slug', description: 'Keep this stable after publishing. Use lowercase words separated by hyphens.', validation: { pattern: { regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Use lowercase words separated by hyphens.' } } },
});
const publication = () => fields.select({
  label: 'Publication',
  description: 'Save as Draft while writing. Choose Published and save when ready. Online changes go live after the Git deployment finishes.',
  options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
  defaultValue: 'draft',
});
const description = (label = 'Description') => fields.text({ label, multiline: true, validation: { isRequired: true } });
const dates = () => ({
  publishedAt: fields.date({ label: 'Publication date', validation: { isRequired: true }, defaultValue: { kind: 'today' }, description: 'Use today or an earlier date when publishing.' }),
  updatedAt: fields.date({ label: 'Last updated', description: 'Set when you make a meaningful update to published content.' }),
});
const image = (label: string) => fields.image({ label, directory: 'public/images/blog', publicPath: '/images/blog/' });
const cover = () => ({
  coverImage: image('Cover image'),
  coverAlt: fields.text({ label: 'Cover image description', description: 'Describe the image for readers using a screen reader.' }),
});
const seo = () => fields.object({
  title: fields.text({ label: 'SEO title', description: 'Optional. Defaults to the article or series title.' }),
  description: fields.text({ label: 'SEO description', multiline: true, description: 'Optional. Defaults to the description.' }),
  image: image('Social sharing image'),
}, { label: 'SEO and social sharing' });
const body = () => fields.mdx({
  label: 'Body',
  options: { heading: [2, 3, 4, 5, 6], image: { directory: 'public/images/blog', publicPath: '/images/blog/' } },
  components: {
    Callout: wrapper({ label: 'Tip / callout', schema: { title: fields.text({ label: 'Title', defaultValue: 'Rule of thumb' }) } }),
    Quote: wrapper({ label: 'Quote', schema: {} }),
    CodeBlock: block({ label: 'Code with filename', schema: {
      code: fields.text({ label: 'Code', multiline: true, validation: { isRequired: true } }),
      language: fields.text({ label: 'Language', defaultValue: 'typescript' }),
      filename: fields.text({ label: 'Filename' }),
    } }),
  },
});

export default config({
  storage: repository
    ? { kind: 'github', repo: repository as `${string}/${string}` }
    : { kind: 'local' },
  ui: { brand: { name: 'Owaish / Blog' }, navigation: { Writing: ['articles', 'series', 'chapters'] } },
  collections: {
    articles: collection({
      label: 'Articles', slugField: 'title', path: 'content/articles/*', format: { contentField: 'body' },
      entryLayout: 'content', columns: ['title', 'publication', 'publishedAt'],
      schema: {
        title: title(), publication: publication(), description: description(),
        category: fields.select({ label: 'Category', options: blogCategories.map(value => ({ label: value, value })), defaultValue: 'Development' }),
        tags: fields.array(fields.text({ label: 'Tag', validation: { isRequired: true } }), { label: 'Tags', itemLabel: props => props.value }),
        ...dates(), ...cover(),
        coverType: fields.select({ label: 'Default cover illustration', description: 'Used when no cover image is uploaded.', options: [{ label: 'Code', value: 'code' }, { label: 'Diagram', value: 'diagram' }, { label: 'Gradient', value: 'gradient' }], defaultValue: 'code' }),
        seo: seo(), body: body(),
      },
    }),
    series: collection({
      label: 'Series', slugField: 'title', path: 'content/series/*', columns: ['title', 'publication', 'status'],
      schema: {
        title: title(), publication: publication(), description: description(),
        subtitle: description('Introduction'),
        status: fields.select({ label: 'Series status', options: [{ label: 'Ongoing', value: 'Ongoing' }, { label: 'Completed', value: 'Completed' }], defaultValue: 'Ongoing' }),
        featured: fields.checkbox({ label: 'Feature this series', description: 'Featured series appear first on the blog.' }),
        ...dates(), ...cover(),
        overview: description('About this series'),
        audience: fields.text({ label: 'Who is this for?', multiline: true }),
        parts: fields.array(fields.object({ title: fields.text({ label: 'Part title', validation: { isRequired: true } }) }), {
          label: 'Curriculum parts', description: 'Ordered groups of chapters. Chapters choose their part by its number, starting at 1. Keep part order stable after publishing.',
          itemLabel: props => props.fields.title.value, validation: { length: { min: 1 } },
        }),
        resourcesDescription: fields.text({ label: 'Resources introduction', multiline: true }),
        resources: fields.array(fields.object({
          label: fields.text({ label: 'Link label', validation: { isRequired: true } }),
          url: fields.url({ label: 'URL', validation: { isRequired: true } }),
        }), { label: 'Resources and code', itemLabel: props => props.fields.label.value }),
        seo: seo(),
      },
    }),
    chapters: collection({
      label: 'Chapters', slugField: 'title', path: 'content/chapters/*', format: { contentField: 'body' },
      entryLayout: 'content', columns: ['title', 'series', 'publication'],
      schema: {
        title: title(), publication: publication(),
        series: fields.relationship({ label: 'Series', collection: 'series', validation: { isRequired: true } }),
        part: fields.integer({ label: 'Part number', defaultValue: 1, validation: { isRequired: true, min: 1 }, description: 'Matches the ordered curriculum parts on the series.' }),
        order: fields.integer({ label: 'Chapter order', defaultValue: 1, validation: { isRequired: true, min: 1 }, description: 'Unique across this series. Readers are numbered automatically from the published chapters.' }),
        summary: description('Summary'), ...dates(), ...cover(), seo: seo(), body: body(),
      },
    }),
  },
});
