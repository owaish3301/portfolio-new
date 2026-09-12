import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogHubClient from "@/components/blog/BlogHubClient";
import ScrollReveal from "@/components/ScrollReveal";
import { sampleArticles, sampleSeries } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
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

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <BlogHubClient series={sampleSeries} articles={sampleArticles} />
      </main>
      <BlogFooter />
      <ScrollReveal />
    </>
  );
}
