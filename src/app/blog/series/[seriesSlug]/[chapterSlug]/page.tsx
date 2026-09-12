import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BlogFooter from '@/components/blog/BlogFooter';
import ChapterReaderClient from '@/components/blog/ChapterReaderClient';
import MdxBody from '@/components/blog/MdxBody';
import ScrollReveal from '@/components/ScrollReveal';
import { getBlogContent, getChapter } from '@/lib/blog';
import { articleJsonLd, contentMetadata, serializeJsonLd } from '@/lib/blog-seo';

export const revalidate = 60;
interface Props { params: Promise<{ seriesSlug: string; chapterSlug: string }> }
export async function generateStaticParams() {
  return (await getBlogContent()).series.flatMap(series => series.parts.flatMap(part => part.chapters.map(chapter => ({ seriesSlug: series.slug, chapterSlug: chapter.slug }))));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seriesSlug, chapterSlug } = await params;
  const data = await getChapter(seriesSlug, chapterSlug);
  if (!data) notFound();
  return contentMetadata(data.chapter, data.chapter.summary, `/blog/series/${seriesSlug}/${chapterSlug}`);
}
export default async function ChapterPage({ params }: Props) {
  const { seriesSlug, chapterSlug } = await params;
  const data = await getChapter(seriesSlug, chapterSlug);
  if (!data) notFound();
  const { body, ...props } = data;
  return <>
    <Navbar />
    <main id="main-content" className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd(data.chapter, data.chapter.summary, `/blog/series/${seriesSlug}/${chapterSlug}`, data.series)) }} />
      <ChapterReaderClient {...props}><MdxBody source={body} /></ChapterReaderClient>
    </main>
    <BlogFooter /><ScrollReveal />
  </>;
}
