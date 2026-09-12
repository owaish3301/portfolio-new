"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Chapter, Series } from "@/data/blog";
import CodeBlock from "./CodeBlock";
import TableOfContents, { MobileTableOfContents } from "./TableOfContents";
import IsometricServerGraphic from "./IsometricServerGraphic";

interface ChapterReaderProps {
  series: Series;
  chapter: Chapter;
  previousChapter: Chapter | null;
  nextChapter: Chapter | null;
  totalChapters: number;
}

export default function ChapterReaderClient({
  series,
  chapter,
  previousChapter,
  nextChapter,
  totalChapters,
}: ChapterReaderProps) {
  const [copied, setCopied] = useState(false);

  // Flatten all chapters from all parts for the series sidebar
  const allChapters: Chapter[] = [];
  series.parts.forEach((part) => {
    part.chapters.forEach((ch) => allChapters.push(ch));
  });

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

  const sampleCode = `import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    status: "ok",
    path: url,
    timestamp: Date.now()
  }));
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});`;

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
        <div className="grid gap-10 xl:grid-cols-[190px_minmax(0,1fr)_310px] lg:grid-cols-[minmax(0,1fr)_310px] items-start min-w-0">
          
          {/* Left Column: Sticky "On this page" TOC (Desktop XL) */}
          <aside className="hidden xl:block min-w-0">
            <div className="sticky top-28 space-y-6">
              <TableOfContents headings={chapter.headings || []} />
            </div>
          </aside>

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
              <IsometricServerGraphic className="h-64 sm:h-96 w-full" />
            </div>

            {/* Article Body */}
            <div className="prose prose-slate max-w-none text-base text-gray-dark leading-relaxed sm:text-[17px] space-y-6 break-words [overflow-wrap:anywhere]">
              {chapter.slug === "introduction" ? (
                <>
                  <p>
                    Backend development can feel overwhelming at first — there are so
                    many tools, frameworks, and buzzwords. This series is my attempt to
                    simplify things, focus on fundamentals, and build a solid mental
                    model of how backend systems actually work.
                  </p>

                  <p>
                    We&apos;ll go step by step, starting from the very basics and gradually
                    building up to more advanced topics like caching, queues, and
                    distributed systems.
                  </p>

                  {/* Quote Callout matching reference screen */}
                  <div className="my-8 rounded-2xl border-l-4 border-accent bg-blue-50/70 p-6 shadow-xs">
                    <blockquote className="font-serif italic text-lg sm:text-xl text-gray-dark leading-snug">
                      &ldquo;The goal is not just to use tools, but to understand
                      what&apos;s happening under the hood.&rdquo;
                    </blockquote>
                  </div>

                  <h2
                    id="why-this-series"
                    className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6"
                  >
                    Why this series?
                  </h2>

                  <p>
                    Most backend tutorials jump directly into using high-level
                    frameworks like Express, NestJS, or Django without explaining what a
                    server actually does at the OS and network level. When something
                    breaks in production — high latency, connection timeouts, or
                    database deadlocks — a superficial understanding of syntax
                    isn&apos;t enough.
                  </p>

                  <p>
                    In this series, we unpack backend architecture layer by layer. We
                    will build tiny versions of HTTP parsers, connection multiplexers,
                    router engines, and memory stores to see the mechanics firsthand.
                  </p>

                  <h2
                    id="the-modern-web"
                    className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6"
                  >
                    The Modern Web &amp; Systemic Thinking
                  </h2>

                  <p>
                    The modern web is experiential analytics and under processes to
                    new component and flexible control design, knitting everything into
                    reliable composition. When you understand the baseline protocols,
                    you stop fearing architecture meetings.
                  </p>

                  <h2
                    id="implementing-the-core"
                    className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6"
                  >
                    Implementing the Component / Server
                  </h2>

                  <p>
                    Here is a minimal HTTP listener in Node.js illustrating raw socket
                    request lifecycle:
                  </p>

                  {/* Code Snippet */}
                  <CodeBlock
                    code={sampleCode}
                    language="typescript"
                    filename="server.ts"
                  />

                  {/* Rule of Thumb / Tip Callout */}
                  <div className="my-6 flex items-start gap-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-sm text-gray-dark break-words">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      i
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-0.5">
                        RULE OF THUMB
                      </span>
                      Always design backend handlers to be stateless wherever possible. Storing state in memory makes horizontal autoscaling significantly more difficult down the road.
                    </div>
                  </div>

                  <h2
                    id="what-youll-learn"
                    className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6 break-words"
                  >
                    What you&apos;ll learn
                  </h2>

                  <ul className="list-disc space-y-2 pl-6 text-gray-mid break-words">
                    <li>
                      <strong className="text-gray-dark">
                        How the web works from first principles:
                      </strong>{" "}
                      Protocols, DNS, TCP/IP, and raw sockets.
                    </li>
                    <li>
                      <strong className="text-gray-dark">
                        Building a backend server from scratch:
                      </strong>{" "}
                      Routing, middleware pipelines, and validation.
                    </li>
                    <li>
                      <strong className="text-gray-dark">
                        Working with databases, caching, and queues:
                      </strong>{" "}
                      Query indexing, Redis cache invalidation, and async worker
                      queues.
                    </li>
                    <li>
                      <strong className="text-gray-dark">
                        Scaling and production-ready architecture:
                      </strong>{" "}
                      Load balancers, rate limiters, Dockerization, and zero-downtime
                      rolling deploys.
                    </li>
                  </ul>

                  <p className="pt-2">
                    By the end of this series, you should have a clear mental model of
                    how modern backend systems work and be able to design and build your
                    own with complete confidence.
                  </p>
                </>
              ) : (
                <>
                  <p className="lead text-lg sm:text-xl text-gray-dark leading-relaxed break-words">
                    {chapter.summary}
                  </p>

                  <div className="my-6 flex items-start gap-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-sm text-gray-dark break-words">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      i
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-0.5">
                        RULE OF THUMB
                      </span>
                      Treat distributed protocols as resources you observe, not static assumptions you control.
                    </div>
                  </div>

                  {chapter.headings && chapter.headings.length > 0 ? (
                    chapter.headings.map((h, idx) => (
                      <div key={h.id} className="space-y-4 pt-4 min-w-0">
                        <h2
                          id={h.id}
                          className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6 border-t border-black/6 break-words"
                        >
                          {h.title}
                        </h2>

                        <p className="break-words">
                          In this section, we deconstruct the core mechanics of{" "}
                          <strong className="text-black font-medium">{h.title.toLowerCase()}</strong>. Understanding this layer allows us to reason about failure boundaries and trade-offs rather than memorizing framework configurations.
                        </p>

                        {idx === 1 && (
                          <CodeBlock
                            code={`// Core handler implementation for ${chapter.slug}
export async function executePipeline(req: Request): Promise<Response> {
  const startTime = performance.now();
  
  try {
    const context = await initializeContext(req);
    const result = await processStep(context);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return handleFallback(error, req);
  } finally {
    recordLatency(performance.now() - startTime);
  }
}`}
                            language="typescript"
                            filename={`${chapter.slug}.ts`}
                          />
                        )}

                        <p className="break-words">
                          When architecting resilient software, each decision around concurrency, caching, and data guarantees cascades through your entire application stack.
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4 min-w-0">
                      <h2 id="overview" className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6 break-words">
                        Overview
                      </h2>
                      <p className="break-words">
                        This chapter explores practical patterns and engineering trade-offs when designing robust backend workflows.
                      </p>
                    </div>
                  )}
                </>
              )}
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
                    <p className="mt-2 text-sm">Series complete</p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Right Sticky Sidebar: "In this series" card matching reference design */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between pb-3 border-b border-black/6">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-black">
                    In this series
                  </h3>
                  <span className="font-mono text-[11px] text-gray-mid">
                    {chapter.number} / {totalChapters}
                  </span>
                </div>

                <div className="mt-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 space-y-1">
                  {allChapters.map((ch) => {
                    const isCurrent = ch.slug === chapter.slug;
                    const isCompleted = ch.number < chapter.number;
                    const chapterNumStr = String(ch.number).padStart(2, "0");

                    return (
                      <Link
                        key={ch.slug}
                        href={`/blog/series/${series.slug}/${ch.slug}`}
                        className={`group flex items-start justify-between gap-3 rounded-xl p-2.5 transition-all ${
                          isCurrent
                            ? "bg-accent/8 border border-accent/20"
                            : "hover:bg-surface-alt/70"
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span
                            className={`font-mono text-xs font-medium shrink-0 pt-0.5 ${
                              isCurrent ? "text-accent font-semibold" : "text-gray-light"
                            }`}
                          >
                            {chapterNumStr}
                          </span>
                          <div className="min-w-0">
                            <p
                              className={`text-xs leading-snug line-clamp-2 ${
                                isCurrent
                                  ? "font-medium text-accent"
                                  : "text-gray-dark group-hover:text-black"
                              }`}
                            >
                              {ch.title}
                            </p>
                            <span className="font-mono text-[11px] text-gray-mid mt-0.5 block">
                              {ch.readTime}
                            </span>
                          </div>
                        </div>

                        {/* Status Indicator circle matching reference */}
                        <div className="shrink-0 pt-0.5">
                          {isCompleted ? (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/5 text-gray-dark">
                              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          ) : isCurrent ? (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-accent bg-accent/15">
                              <span className="h-2 w-2 rounded-full bg-accent" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-black/15" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-black/6">
                  <Link
                    href={`/blog/series/${series.slug}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 text-xs font-mono text-gray-mid hover:text-black transition-colors"
                  >
                    <span>View full series outline</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* On tablet/small-desktop screens (LG but < XL), also show On This Page below the series box */}
              <div className="xl:hidden rounded-2xl border border-black/8 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <TableOfContents headings={chapter.headings || []} />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

