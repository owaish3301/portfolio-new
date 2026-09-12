"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Chapter, Series } from "@/data/blog";

import TableOfContents, { MobileTableOfContents } from "./TableOfContents";
import IsometricServerGraphic from "./IsometricServerGraphic";

interface ChapterReaderProps {
  series: Series;
  children: ReactNode;
  chapter: Chapter;
  previousChapter: Chapter | null;
  nextChapter: Chapter | null;
  totalChapters: number;
}

export default function ChapterReaderClient({
  series,
  children,
  chapter,
  previousChapter,
  nextChapter,
  totalChapters,
}: ChapterReaderProps) {
  const [copied, setCopied] = useState(false);

  // Update reading progress in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        `series_progress_${series.slug}`,
        JSON.stringify({
          chapterSlug: chapter.slug,
          chapterNumber: chapter.number,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {}
  }, [series.slug, chapter.slug, chapter.number]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${chapter.title} - ${series.title}`,
            text: chapter.summary,
            url: window.location.href,
          });
        } catch {
          // User canceled
        }
      } else {
        handleCopyLink();
      }
    }
  };

  return (
    <div className="pt-24 pb-20 sm:pt-28">
      {/* Top Navigation Bar */}
      <div className="mb-8 border-y border-black/6 py-3">
        <div className="mx-auto flex w-[92%] max-w-[1360px] flex-wrap items-center justify-between gap-3 sm:gap-4">
          <Link
            href={`/blog/series/${series.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gray-mid hover:text-black transition-colors shrink-0"
          >
            <span>←</span>
            <span>Back to series</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-medium text-black truncate max-w-[180px] lg:max-w-none">{series.title}</span>
              <span className="text-gray-light">•</span>
              <span className="font-mono text-gray-mid shrink-0">
                Part {chapter.number} of {totalChapters}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              {previousChapter ? (
                <Link
                  href={`/blog/series/${series.slug}/${previousChapter.slug}`}
                  className="rounded-lg border border-black/8 bg-white/80 px-2.5 py-1 text-gray-mid hover:text-black hover:border-black/20 transition-colors"
                >
                  ← Prev
                </Link>
              ) : (
                <span className="rounded-lg border border-black/4 bg-black/2 px-2.5 py-1 text-gray-light cursor-not-allowed">
                  ← Prev
                </span>
              )}

              <Link
                href={`/blog/series/${series.slug}`}
                className="hidden md:inline-block rounded-lg border border-black/8 bg-white/80 px-2.5 py-1 text-gray-mid hover:text-black hover:border-black/20 transition-colors"
              >
                View series
              </Link>

              {nextChapter ? (
                <Link
                  href={`/blog/series/${series.slug}/${nextChapter.slug}`}
                  className="rounded-lg border border-black/8 bg-white/80 px-2.5 py-1 text-accent font-medium hover:border-accent transition-colors"
                >
                  Next →
                </Link>
              ) : (
                <span className="rounded-lg border border-black/4 bg-black/2 px-2.5 py-1 text-gray-light cursor-not-allowed">
                  Next →
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout matching reference design */}
      <div className="mx-auto w-[92%] max-w-[1360px] min-w-0">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_310px] lg:grid-cols-[minmax(0,1fr)_310px] items-start min-w-0">

          {/* Center Column: Main Article Content */}
          <article className="min-w-0 max-w-3xl w-full overflow-hidden">
            {/* Breadcrumb Eyebrow */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gray-mid mb-4">
              <Link href="/blog" className="hover:text-black transition-colors">
                Series
              </Link>
              <span>/</span>
              <Link
                href={`/blog/series/${series.slug}`}
                className="text-accent font-semibold hover:underline"
              >
                {series.title}
              </Link>
              <span>/</span>
              <span className="text-gray-light">
                Part {chapter.number} of {totalChapters}
              </span>
            </div>

            {/* Header */}
            <header className="space-y-4 mb-8 min-w-0">
              <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl lg:text-5xl leading-tight break-words">
                {chapter.title}
              </h1>

              {chapter.summary && (
                <p className="text-lg text-gray-mid leading-relaxed sm:text-xl font-normal break-words">
                  {chapter.summary}
                </p>
              )}

              {/* Author & Action Bar matching design */}
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-black/6">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/shadow-dp.png"
                    alt="Owaish Alam"
                    className="h-9 w-9 rounded-full object-cover border border-black/10 shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-black">
                      Owaish Alam
                    </span>
                    <span className="block text-xs font-mono text-gray-mid">
                      {chapter.publishedAt} · {chapter.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/8 bg-white px-3 py-1.5 text-gray-dark hover:border-black/20 hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <svg className="h-3.5 w-3.5 text-accent-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-accent-green font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-3.5 w-3.5 text-gray-mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>Copy link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/8 bg-white px-3 py-1.5 text-gray-dark hover:border-black/20 hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5 text-gray-mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Mobile / Tablet On this page Dropdown (Visible on < XL screens) */}
            <div className="xl:hidden mb-8 min-w-0">
              <MobileTableOfContents headings={chapter.headings || []} />
            </div>

            {/* Visual Cover Diagram */}
            <div className="mb-10 overflow-hidden rounded-3xl border border-[#e4ebf8] bg-white p-2 shadow-[0_16px_30px_rgba(20,30,60,0.06)] min-w-0">
              {chapter.coverImage || series.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={chapter.coverImage || series.coverImage || undefined} alt={chapter.coverImage ? chapter.coverAlt : series.coverAlt} className="h-64 sm:h-96 w-full object-cover" />
              ) : <IsometricServerGraphic className="h-64 sm:h-96 w-full" />}
            </div>

            {/* Article Body */}
            <div className="prose prose-slate max-w-none text-base text-gray-dark leading-relaxed sm:text-[17px] space-y-6 break-words [overflow-wrap:anywhere]">
              {children}
            </div>

            {/* Next in Series Card matching reference screen */}
            {nextChapter && (
              <div className="mt-12 min-w-0">
                <Link
                  href={`/blog/series/${series.slug}/${nextChapter.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-black/8 bg-white p-5 transition-all hover:border-accent hover:shadow-sm group min-w-0"
                >
                  <div className="min-w-0 pr-4">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                      Next in the series
                    </span>
                    <p className="mt-1 text-base sm:text-lg font-medium text-black group-hover:text-accent transition-colors truncate">
                      {nextChapter.title}
                    </p>
                  </div>
                  <span className="text-xl text-gray-light group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0">
                    →
                  </span>
                </Link>
              </div>
            )}

            {/* Bottom Chapter Pagination */}
            <div className="mt-8 border-t border-black/8 pt-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {previousChapter ? (
                  <Link
                    href={`/blog/series/${series.slug}/${previousChapter.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-[#e4ebf8] bg-white p-5 transition-all hover:border-black/20 hover:shadow-sm min-w-0"
                  >
                    <span className="font-mono text-xs uppercase tracking-wider text-gray-light">
                      ← Previous Chapter
                    </span>
                    <span className="mt-2 text-sm font-medium text-black group-hover:text-accent transition-colors break-words">
                      {previousChapter.title}
                    </span>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-black/5 bg-black/[0.01] p-5 text-gray-light min-w-0">
                    <span className="font-mono text-xs uppercase tracking-wider">
                      Previous
                    </span>
                    <p className="mt-2 text-sm">Start of series</p>
                  </div>
                )}

                {nextChapter ? (
                  <Link
                    href={`/blog/series/${series.slug}/${nextChapter.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-[#e4ebf8] bg-white p-5 text-left sm:text-right transition-all hover:border-accent hover:shadow-sm min-w-0"
                  >
                    <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                      Next Chapter →
                    </span>
                    <span className="mt-2 text-sm font-medium text-black group-hover:text-accent transition-colors break-words">
                      {nextChapter.title}
                    </span>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-black/5 bg-black/[0.01] p-5 text-left sm:text-right text-gray-light min-w-0">
                    <span className="font-mono text-xs uppercase tracking-wider">
                      Next
                    </span>
                    <p className="mt-2 text-sm">{series.status === "Completed" ? "Series complete" : "More chapters coming soon"}</p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Right Sticky Sidebar */}
          <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
            <div className="space-y-6">
                <div className="hidden">
                  <Link
                    href={`/blog/series/${series.slug}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 text-xs font-mono text-gray-mid hover:text-black transition-colors"
                  >
                    <span>View full series outline</span>
                    <span>→</span>
                  </Link>
                </div>
              {/* On tablet/small-desktop screens (LG but < XL), also show On This Page */}
              <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <TableOfContents headings={chapter.headings || []} />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
