"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Series } from "@/data/blog";
import IsometricServerGraphic from "./IsometricServerGraphic";

export default function SeriesHubClient({ series }: { series: Series }) {
  const [activeTab, setActiveTab] = useState<"articles" | "overview" | "resources">(
    "articles"
  );
  const [bookmarked, setBookmarked] = useState(false);
  const [lastReadSlug, setLastReadSlug] = useState<string>("introduction");
  const [lastReadNumber, setLastReadNumber] = useState<number>(1);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`series_progress_${series.slug}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.chapterSlug) {
          setLastReadSlug(data.chapterSlug);
          setLastReadNumber(data.chapterNumber || 1);
        }
      }
      const savedBookmark = localStorage.getItem(`series_bookmark_${series.slug}`);
      if (savedBookmark) {
        setBookmarked(savedBookmark === "true");
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [series.slug]);

  const toggleBookmark = () => {
    const nextVal = !bookmarked;
    setBookmarked(nextVal);
    try {
      localStorage.setItem(`series_bookmark_${series.slug}`, String(nextVal));
    } catch {}
  };

  return (
    <div className="mx-auto w-[92%] max-w-272 pt-28 pb-20 sm:pt-36">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-mid hover:text-black transition-colors"
        >
          <span>←</span>
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Series Hero */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12 items-center mb-12 min-w-0">
        <div className="space-y-4 min-w-0">
          <span className="inline-block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {series.eyebrow}
          </span>
          <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl lg:text-5xl leading-tight break-words">
            {series.title}
          </h1>
          <p className="text-base text-gray-mid leading-relaxed sm:text-[17px] break-words">
            {series.subtitle}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-[11px] font-mono text-gray-light sm:gap-5 sm:text-xs">
            {/* Ongoing status badge (First to capture attention) */}
            <div className="inline-flex items-center gap-1.5 font-medium text-gray-mid shrink-0">
              <svg
                className="h-3 w-3 text-gray-light shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span>{series.status}</span>
            </div>

            <div className="flex min-w-0 items-center gap-1.5 shrink-0">
              <svg
                className="h-4 w-4 text-gray-light"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              </svg>
              <span>{series.articleCount} articles</span>
            </div>

            <div className="flex min-w-0 items-center gap-1.5 shrink-0">
              <svg
                className="h-4 w-4 text-gray-light"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{series.totalReadTime}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              href={`/blog/series/${series.slug}/${lastReadSlug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_4px_16px_rgba(30,45,246,0.25)] transition-all hover:scale-[0.98] hover:opacity-90 max-w-full text-center"
            >
              <span className="truncate">
                {lastReadNumber > 1
                  ? `Continue Reading (Ch. ${lastReadNumber})`
                  : "Continue Reading"}
              </span>
              <span className="shrink-0">→</span>
            </Link>

            <button
              type="button"
              onClick={toggleBookmark}
              aria-label={bookmarked ? "Bookmarked" : "Bookmark"}
              title={bookmarked ? "Bookmarked" : "Bookmark"}
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-3 text-sm font-medium transition-all cursor-pointer sm:px-5 ${
                bookmarked
                  ? "border-accent bg-blue-50 text-accent"
                  : "border-black/10 bg-white text-gray-dark hover:border-black/20"
              }`}
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill={bookmarked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              <span className="hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="overflow-hidden rounded-3xl border border-[#e4ebf8] bg-white p-2 shadow-[0_16px_30px_rgba(20,30,60,0.06)]">
          <IsometricServerGraphic className="h-64 sm:h-80 w-full" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-10 flex justify-center border-b-0 overflow-x-auto no-scrollbar scroll-smooth sm:justify-start sm:border-b sm:border-black/8">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`pb-3.5 pr-6 max-[380px]:pr-3 text-sm font-medium transition-colors cursor-pointer shrink-0 ${
            activeTab === "overview"
              ? "border-b-2 border-accent text-accent font-semibold"
              : "text-gray-mid hover:text-black"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("articles")}
          className={`pb-3.5 px-6 max-[380px]:px-3 text-sm font-medium transition-colors cursor-pointer shrink-0 ${
            activeTab === "articles"
              ? "border-b-2 border-accent text-accent font-semibold"
              : "text-gray-mid hover:text-black"
          }`}
        >
          Articles
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("resources")}
          className={`pb-3.5 px-6 max-[380px]:px-3 text-sm font-medium transition-colors cursor-pointer shrink-0 ${
            activeTab === "resources"
              ? "border-b-2 border-accent text-accent font-semibold"
              : "text-gray-mid hover:text-black"
          }`}
        >
          Resources
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="rounded-3xl border border-[#e4ebf8] bg-white p-6 sm:p-8 space-y-4 max-w-3xl min-w-0 break-words">
          <h2 className="text-xl font-medium text-black">About This Series</h2>
          <p className="text-sm leading-relaxed text-gray-mid">
            Backend development often gets taught as a set of disconnected library
            APIs. This series takes a step back to build a unified first-principles
            mental model. From raw sockets, TCP streams, and memory buffers to
            high-availability database clustering and zero-downtime deployment pipelines.
          </p>
          <h3 className="text-base font-medium text-black pt-4">Who is this for?</h3>
          <p className="text-sm leading-relaxed text-gray-mid">
            Frontend engineers transitioning to full-stack, junior backend developers
            seeking deep foundational understanding, or anyone who wants to demystify
            what happens behind the curtain of modern web architecture.
          </p>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="rounded-3xl border border-[#e4ebf8] bg-white p-6 sm:p-8 space-y-4 max-w-3xl min-w-0 break-words">
          <h2 className="text-xl font-medium text-black">Series Resources & Code</h2>
          <p className="text-sm text-gray-mid">
            Accompanying GitHub repository with executable code samples for every chapter:
          </p>
          <div className="pt-2">
            <a
              href="https://github.com/owaish3301"
              target="_blank"
              rel="noreferrer"
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-surface-alt px-4 py-2 text-xs font-mono text-black hover:border-black/30 transition-colors"
            >
              <span className="truncate">owaish3301/backend-from-first-principles</span>
              <span className="shrink-0">↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Curriculum View (Articles Tab) */}
      {activeTab === "articles" && (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] min-w-0">
          {/* Left: Parts Outline Rail */}
          <div className="hidden lg:block space-y-8 sticky top-28 self-start">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-gray-light">
              Curriculum Outline
            </h3>
            <nav className="space-y-6">
              {series.parts.map((part) => (
                <div key={part.id} className="space-y-2">
                  <a
                    href={`#${part.id}`}
                    className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
                  >
                    {part.partNumber} — {part.title}
                  </a>
                  <ul className="space-y-1 pl-2 border-l border-black/8 text-xs text-gray-mid">
                    {part.chapters.map((ch) => (
                      <li key={ch.slug}>
                        <Link
                          href={`/blog/series/${series.slug}/${ch.slug}`}
                          className={`block py-1 transition-colors hover:text-black line-clamp-1 ${
                            ch.slug === lastReadSlug
                              ? "text-accent font-medium"
                              : ""
                          }`}
                        >
                          {ch.number}. {ch.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Detailed Chapters by Part */}
          <div className="space-y-12 min-w-0">
            {series.parts.map((part) => (
              <section key={part.id} id={part.id} className="space-y-4 min-w-0">
                <div className="border-b border-black/6 pb-2 min-w-0">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                    {part.partNumber}
                  </span>
                  <h2 className="text-xl font-medium tracking-tight text-black sm:text-2xl break-words">
                    {part.title}
                  </h2>
                </div>

                <div className="space-y-3 min-w-0">
                  {part.chapters.map((chapter) => {
                    const isCurrent = chapter.slug === lastReadSlug;

                    if (isCurrent) {
                      return (
                        <Link
                          key={chapter.slug}
                          href={`/blog/series/${series.slug}/${chapter.slug}`}
                          className="group relative block overflow-hidden rounded-2xl border border-accent/20 bg-accent/[0.04] p-3 sm:p-5 transition-all sm:shadow-[0_8px_20px_rgba(30,45,246,0.08)] hover:border-accent/50 hover:bg-blue-50 min-w-0"
                        >
                          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-mono font-bold">
                                {chapter.number}
                              </div>
                              <div className="space-y-1 min-w-0">
                                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent">
                                  <span>Currently reading</span>
                                </div>
                                <h4 className="text-base font-medium text-black sm:text-lg group-hover:text-accent transition-colors break-words">
                                  {chapter.title}
                                </h4>
                                {chapter.summary && (
                                  <p className="text-xs text-gray-mid line-clamp-2 break-words">
                                    {chapter.summary}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="pl-9 font-mono text-[11px] text-gray-mid sm:shrink-0 sm:pl-0 sm:text-xs sm:text-accent">
                              {chapter.readTime}
                            </span>
                          </div>
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={chapter.slug}
                        href={`/blog/series/${series.slug}/${chapter.slug}`}
                        className="group flex items-center justify-between rounded-2xl border border-[#e4ebf8] bg-white p-4 transition-all hover:border-black/20 hover:shadow-[0_4px_12px_rgba(10,10,10,0.04)] sm:p-5 min-w-0 gap-3"
                      >
                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-surface-alt font-mono text-xs text-gray-mid group-hover:border-black/30 group-hover:text-black transition-colors">
                            {chapter.number}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-black group-hover:text-accent transition-colors sm:text-base truncate">
                              {chapter.title}
                            </h4>
                          </div>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-gray-light group-hover:text-gray-mid">
                          {chapter.readTime}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
