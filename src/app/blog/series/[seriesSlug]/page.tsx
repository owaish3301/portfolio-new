import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import BlogFooter from "@/components/blog/BlogFooter";
import SeriesHubClient from "@/components/blog/SeriesHubClient";
import ScrollReveal from "@/components/ScrollReveal";
import { sampleSeries } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";

interface SeriesPageProps {
  params: Promise<{
    seriesSlug: string;
  }>;
}

export async function generateStaticParams() {
  return [{ seriesSlug: sampleSeries.slug }];
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { seriesSlug } = await params;
  if (seriesSlug !== sampleSeries.slug) {
    return { title: "Series Not Found" };
  }

  return {
    title: `${sampleSeries.title} | ${siteConfig.name}`,
    description: sampleSeries.subtitle,
    openGraph: {
      title: `${sampleSeries.title} - Full Series`,
      description: sampleSeries.subtitle,
      url: `${siteConfig.siteUrl}/blog/series/${sampleSeries.slug}`,
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { seriesSlug } = await params;

  if (seriesSlug !== sampleSeries.slug) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <SeriesHubClient series={sampleSeries} />
      </main>
      <BlogFooter />
      <ScrollReveal />
    </>
  );
}
