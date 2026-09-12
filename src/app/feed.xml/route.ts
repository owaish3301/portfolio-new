import { getBlogContent } from '@/lib/blog';
import { absoluteUrl } from '@/lib/blog-seo';
import { siteConfig } from '@/data/siteConfig';

export const revalidate = 60;
const xml = (value: string) => value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!);

export async function GET() {
  const { articles, series } = await getBlogContent();
  const entries = [
    ...articles.map(article => ({ ...article, url: absoluteUrl(`/blog/${article.slug}`) })),
    ...series.flatMap(series => series.parts.flatMap(part => part.chapters.map(ch => ({ ...ch, description: ch.summary, url: absoluteUrl(`/blog/series/${series.slug}/${ch.slug}`) })))),
  ].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  const items = entries.map(entry => `<item><title>${xml(entry.title)}</title><link>${xml(entry.url)}</link><guid isPermaLink="true">${xml(entry.url)}</guid><description>${xml(entry.description)}</description><pubDate>${new Date(entry.publishedDate).toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(siteConfig.name)} Blog</title><link>${absoluteUrl('/blog')}</link><description>Engineering notes, articles, and series.</description><language>en</language><atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=60' } });
}
