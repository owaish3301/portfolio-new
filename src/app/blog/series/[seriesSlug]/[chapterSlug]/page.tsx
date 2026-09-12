import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import BlogFooter from "@/components/blog/BlogFooter";
import ChapterReaderClient from "@/components/blog/ChapterReaderClient";
import ScrollReveal from "@/components/ScrollReveal";
import { sampleSeries, Chapter } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";

interface ChapterPageProps {
  params: Promise<{
    seriesSlug: string;
    chapterSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { seriesSlug: string; chapterSlug: string }[] = [];
  sampleSeries.parts.forEach((part) => {
    part.chapters.forEach((chapter) => {
      params.push({
        seriesSlug: sampleSeries.slug,
        chapterSlug: chapter.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { seriesSlug, chapterSlug } = await params;

  if (seriesSlug !== sampleSeries.slug) {
    return { title: "Series Not Found" };
  }

  let matchedChapter: Chapter | undefined;
  sampleSeries.parts.forEach((part) => {
    const ch = part.chapters.find((c) => c.slug === chapterSlug);
    if (ch) matchedChapter = ch;
  });

  if (!matchedChapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${matchedChapter.title} - ${sampleSeries.title} | ${siteConfig.name}`,
    description: matchedChapter.summary,
    openGraph: {
      title: `${matchedChapter.title} - ${sampleSeries.title}`,
      description: matchedChapter.summary,
      url: `${siteConfig.siteUrl}/blog/series/${seriesSlug}/${chapterSlug}`,
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { seriesSlug, chapterSlug } = await params;

  if (seriesSlug !== sampleSeries.slug) {
    notFound();
  }

  // Flatten all chapters to compute previous and next
  const allChapters: Chapter[] = [];
  sampleSeries.parts.forEach((part) => {
    part.chapters.forEach((ch) => allChapters.push(ch));
  });

  const currentIndex = allChapters.findIndex((c) => c.slug === chapterSlug);
  if (currentIndex === -1) {
    notFound();
  }

  const currentChapter = allChapters[currentIndex];
  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <ChapterReaderClient
          series={sampleSeries}
          chapter={currentChapter}
          previousChapter={previousChapter}
          nextChapter={nextChapter}
          totalChapters={allChapters.length}
        />
      </main>
      <BlogFooter />
      <ScrollReveal />
    </>
  );
}
