import type { MetadataRoute } from 'next';
import { getBlogContent } from '@/lib/blog';
import { absoluteUrl } from '@/lib/blog-seo';

export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, series } = await getBlogContent();
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.9 },
    ...articles.map(article => ({ url: absoluteUrl(`/blog/${article.slug}`), lastModified: article.updatedDate })),
    ...series.flatMap(series => [
      { url: absoluteUrl(`/blog/series/${series.slug}`), lastModified: [series.updatedDate, ...series.parts.flatMap(part => part.chapters.map(ch => ch.updatedDate))].sort().at(-1)! },
      ...series.parts.flatMap(part => part.chapters.map(ch => ({ url: absoluteUrl(`/blog/series/${series.slug}/${ch.slug}`), lastModified: ch.updatedDate }))),
    ]),
  ];
}
