import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BlogFooter from '@/components/blog/BlogFooter';
import SeriesHubClient from '@/components/blog/SeriesHubClient';
import ScrollReveal from '@/components/ScrollReveal';
import { getBlogContent, getSeries } from '@/lib/blog';
import { absoluteUrl, contentMetadata, serializeJsonLd } from '@/lib/blog-seo';

export const revalidate = 60;
interface Props { params: Promise<{ seriesSlug: string }> }
export async function generateStaticParams() { return (await getBlogContent()).series.map(series => ({ seriesSlug: series.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = await getSeries((await params).seriesSlug);
  if (!series) notFound();
  return contentMetadata(series, series.description, `/blog/series/${series.slug}`, false);
}
export default async function SeriesPage({ params }: Props) {
  const series = await getSeries((await params).seriesSlug);
  if (!series) notFound();
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'CreativeWorkSeries', name: series.title,
    description: series.description, url: absoluteUrl(`/blog/series/${series.slug}`),
    hasPart: series.parts.flatMap(part => part.chapters.map(chapter => ({ '@type': 'BlogPosting', headline: chapter.title, position: chapter.number, url: absoluteUrl(`/blog/series/${series.slug}/${chapter.slug}`) }))),
  };
  return <>
    <Navbar />
    <main id="main-content" className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <SeriesHubClient key={series.slug} series={series} />
    </main>
    <BlogFooter /><ScrollReveal />
  </>;
}
