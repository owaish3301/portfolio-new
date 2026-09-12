"use client";

import { useEffect, useState } from "react";

export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

const EMPTY_HEADINGS: HeadingItem[] = [];

interface TOCProps {
  headings?: HeadingItem[];
  seriesSlug?: string;
}

export default function TableOfContents({ headings: initialHeadings }: TOCProps) {
  const headings = initialHeadings ?? EMPTY_HEADINGS;
  const [observedId, setActiveId] = useState<string>("");
  const activeId = headings.some(heading => heading.id === observedId) ? observedId : headings[0]?.id ?? "";

  // IntersectionObserver to highlight current active heading
  useEffect(() => {
    if (headings.length === 0) return;


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (!headings || headings.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-light">
        On this page
      </h4>
      <nav className="space-y-2 min-w-0">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              className={`group flex items-start gap-2 text-xs transition-colors duration-150 min-w-0 ${
                h.level === 3 ? "pl-3 text-[11px]" : ""
              } ${
                isActive
                  ? "text-accent font-medium"
                  : "text-gray-mid hover:text-black"
              }`}
            >
              {isActive ? (
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              ) : (
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-transparent" />
              )}
              <span className="line-clamp-2 leading-snug break-words min-w-0">{h.title}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export function MobileTableOfContents({
  headings: initialHeadings,
}: {
  headings?: HeadingItem[];
}) {
  const headings = initialHeadings ?? EMPTY_HEADINGS;
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
      setIsOpen(false);
    }
  };

  if (!headings || headings.length === 0) return null;

  const currentHeading = headings.find((h) => h.id === activeId) || headings[0];

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-black/[0.02]"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent shrink-0">
            On this page
          </span>
          <span className="text-gray-light text-xs">•</span>
          <span className="text-xs text-gray-dark truncate font-medium">
            {currentHeading?.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pl-2">
          <span className="font-mono text-[11px] text-gray-mid">
            {headings.length}
          </span>
          <svg
            className={`h-3.5 w-3.5 text-gray-mid transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <nav className="border-t border-black/6 bg-surface-alt/40 p-3 space-y-1.5 min-w-0">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors min-w-0 ${
                  h.level === 3 ? "pl-5 text-[11px]" : ""
                } ${
                  isActive
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-gray-mid hover:bg-black/4 hover:text-black"
                }`}
              >
                {isActive && (
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                )}
                <span className="line-clamp-2 leading-snug break-words min-w-0">{h.title}</span>
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
