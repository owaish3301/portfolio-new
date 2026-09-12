"use client";

import { FilterTag, filterTags } from "@/data/blog";

interface BlogHeroProps {
  selectedTag: FilterTag;
  onSelectTag: (tag: FilterTag) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogHero({
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
}: BlogHeroProps) {
  return (
    <section className="pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Title & Subtitle */}
        <div className="max-w-xl space-y-4 min-w-0">
          <h1 className="text-4xl font-medium tracking-[-0.03em] text-black sm:text-5xl lg:text-[54px] leading-[1.12] break-words">
            Thoughts, learnings, and{" "}
            <span className="font-serif italic text-accent font-normal [-webkit-text-stroke:0.4px_var(--color-accent)]">
              ideas
            </span>
          </h1>
          <p className="text-base text-gray-mid leading-relaxed sm:text-[17px] break-words">
            I write about web development, system design, tools, and anything I
            learn while building things. These are{" "}
            <span className="underline decoration-accent/40 decoration-2 underline-offset-4 text-gray-dark">
              notes
            </span>{" "}
            to my future self — and maybe useful to you too.
          </p>
        </div>

        {/* Right: Search Bar & Filter Chips */}
        <div className="w-full lg:max-w-[420px] flex flex-col gap-3.5">
          <div className="relative w-full">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10 h-4 w-4 text-gray-dark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full border border-black/16 bg-white py-2.5 pl-11 pr-10 text-sm text-black placeholder:text-gray-mid shadow-[0_2px_8px_rgba(10,10,10,0.05),0_1px_2px_rgba(10,10,10,0.04)] transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 rounded-full p-1 text-xs text-gray-mid hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Chips: Horizontally centered with high accessibility contrast */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-1">
            {filterTags.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(tag)}
                  className={`rounded-full px-4.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border border-accent bg-accent text-white shadow-[0_4px_14px_rgba(30,45,246,0.28)]"
                      : "border border-black/14 bg-white text-gray-dark shadow-[0_1px_3px_rgba(10,10,10,0.05)] hover:border-black/30 hover:text-black hover:bg-surface-alt"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
