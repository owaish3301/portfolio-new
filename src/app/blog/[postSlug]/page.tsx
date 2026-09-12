import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import BlogFooter from "@/components/blog/BlogFooter";
import ArticleReaderClient from "@/components/blog/ArticleReaderClient";
import ScrollReveal from "@/components/ScrollReveal";
import { sampleArticles } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";

interface ArticlePageProps {
  params: Promise<{
    postSlug: string;
  }>;
}

export async function generateStaticParams() {
  return sampleArticles.map((article) => ({
    postSlug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const article = sampleArticles.find((a) => a.slug === postSlug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${siteConfig.siteUrl}/blog/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { postSlug } = await params;
  const currentIndex = sampleArticles.findIndex((a) => a.slug === postSlug);

  if (currentIndex === -1) {
    notFound();
  }

  const article = sampleArticles[currentIndex];
  const previousArticle = currentIndex > 0 ? sampleArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < sampleArticles.length - 1
      ? sampleArticles[currentIndex + 1]
      : null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <ArticleReaderClient
          article={article}
          previousArticle={previousArticle}
          nextArticle={nextArticle}
        />
      </main>
      <BlogFooter />
      <ScrollReveal />
    </>
  );
}
