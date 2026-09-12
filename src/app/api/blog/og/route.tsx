import { ImageResponse } from 'next/og';
import { getBlogContent } from '@/lib/blog';
import { siteConfig } from '@/data/siteConfig';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path');
  const { articles, series } = await getBlogContent();
  const entry = articles.find(article => path === `/blog/${article.slug}`)
    ?? series.find(series => path === `/blog/series/${series.slug}`)
    ?? series.flatMap(series => series.parts.flatMap(part => part.chapters.map(chapter => ({ ...chapter, path: `/blog/series/${series.slug}/${chapter.slug}` })))).find(chapter => chapter.path === path);
  if (!entry) return new Response('Not found', { status: 404 });
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f9f9f7', color: '#0a0a0a', padding: 72, width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', color: '#1e2df6', fontSize: 25 }}>{siteConfig.name} / Blog</div>
      <div style={{ display: 'flex', fontSize: 60, lineHeight: 1.12, letterSpacing: -2 }}>{entry.seo.title || entry.title}</div>
      <div style={{ display: 'flex', color: '#545454', fontSize: 24 }}>owaish.codes</div>
    </div>,
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=60' } },
  );
}
