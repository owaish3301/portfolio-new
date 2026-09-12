import 'server-only';
import { cache } from 'react';
import { loadBlogContent } from './blog-content';

// React cache is scoped to the server render, so local CMS saves are visible on refresh.
export const getBlogContent = cache(() => loadBlogContent());

export const getArticle = cache(async (slug: string) => {
  const content = await getBlogContent();
  const index = content.articles.findIndex(article => article.slug === slug);
  if (index < 0) return null;
  return { article: content.articles[index], body: content.articleBodies.get(slug)!, previousArticle: content.articles[index - 1] ?? null, nextArticle: content.articles[index + 1] ?? null };
});

export const getSeries = cache(async (slug: string) => (await getBlogContent()).series.find(series => series.slug === slug) ?? null);

export const getChapter = cache(async (seriesSlug: string, chapterSlug: string) => {
  const content = await getBlogContent();
  const series = content.series.find(series => series.slug === seriesSlug);
  if (!series) return null;
  const chapters = series.parts.flatMap(part => part.chapters);
  const index = chapters.findIndex(chapter => chapter.slug === chapterSlug);
  if (index < 0) return null;
  return { series, chapter: chapters[index], body: content.chapterBodies.get(`${seriesSlug}/${chapterSlug}`)!, previousChapter: chapters[index - 1] ?? null, nextChapter: chapters[index + 1] ?? null, totalChapters: chapters.length };
});
