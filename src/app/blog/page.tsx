import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogHubClient from "@/components/blog/BlogHubClient";
import ScrollReveal from "@/components/ScrollReveal";
import { getBlogContent } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/feed.xml' } },
  title: `Blog, Thoughts & Learnings | ${siteConfig.name}`,
  description:
    "Engineering notes, deep dives, system design, and practical series by Md Owaish Alam.",
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Engineering notes, deep dives, system design, and practical series by Md Owaish Alam.",
    url: `${siteConfig.siteUrl}/blog`,
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const { articles, series } = await getBlogContent();
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <BlogHubClient series={series} articles={articles} />
      </main>
      <BlogFooter />
      <ScrollReveal />
    </>
  );
}
