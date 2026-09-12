"use client";

import Link from "next/link";
import { BlogPost } from "@/data/blog";
import type { ReactNode } from "react";
import TableOfContents, { MobileTableOfContents } from "./TableOfContents";

interface ArticleReaderProps {
  article: BlogPost;
  children: ReactNode;
  previousArticle: BlogPost | null;
  nextArticle: BlogPost | null;
}

export default function ArticleReaderClient({
  article,
  children,
  previousArticle,
  nextArticle,
}: ArticleReaderProps) {
  return (
    <div className="mx-auto w-[92%] max-w-272 pt-28 pb-20 sm:pt-36">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-mid hover:text-black transition-colors"
        >
          <span>←</span>
          <span>Back to all articles</span>
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] min-w-0">
        {/* Article Column */}
        <article className="min-w-0 max-w-full overflow-hidden">
          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              <span>{article.category}</span>
              <span className="text-gray-light">•</span>
              <span className="text-gray-light">{article.publishedAt}</span>
              <span className="text-gray-light">•</span>
              <span className="text-gray-light">{article.readTime}</span>
            </div>

            <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl lg:text-5xl leading-tight break-words">
              {article.title}
            </h1>

            {article.description && (
              <p className="text-lg text-gray-mid leading-relaxed sm:text-xl break-words">
                {article.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-black/8 bg-surface-alt px-2.5 py-1 font-mono text-[11px] text-gray-dark"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Mobile TOC */}
          <div className="lg:hidden mb-8 min-w-0">
            <MobileTableOfContents headings={article.headings || []} />
          </div>

          {/* Body Prose */}
          <div className="prose prose-slate max-w-none text-base text-gray-dark leading-relaxed sm:text-[17px] space-y-6 break-words [overflow-wrap:anywhere]">
            {children}
          </div>

          {/* Bottom Pagination */}
          <div className="mt-14 border-t border-black/8 pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {previousArticle ? (
                <Link
                  href={`/blog/${previousArticle.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#e4ebf8] bg-white p-5 transition-all hover:border-black/20 hover:shadow-sm min-w-0"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-light">
                    ← Previous Article
                  </span>
                  <span className="mt-2 text-sm font-medium text-black group-hover:text-accent transition-colors break-words">
                    {previousArticle.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#e4ebf8] bg-white p-5 text-left sm:text-right transition-all hover:border-accent hover:shadow-sm sm:col-start-2 min-w-0"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                    Next Article →
                  </span>
                  <span className="mt-2 text-sm font-medium text-black group-hover:text-accent transition-colors break-words">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </article>

        {/* Right Sticky Sidebar: On this page */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-6">
            <TableOfContents headings={article.headings || []} />

            <div className="border-t border-black/6 pt-4">
              <Link
                href="/blog"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/8 bg-white py-2.5 text-xs font-mono font-medium text-gray-dark hover:border-black/20 hover:bg-surface-alt transition-colors"
              >
                <span>View all articles</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
