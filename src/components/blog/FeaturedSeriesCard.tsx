import Link from "next/link";
import { Series } from "@/data/blog";
import IsometricServerGraphic from "./IsometricServerGraphic";

export default function FeaturedSeriesCard({ series }: { series: Series }) {
  return (
    <section className="mb-16">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight text-gray-dark sm:text-2xl">
          Featured Series
        </h2>
      </div>

      <article className="group overflow-hidden rounded-3xl border border-[#e4ebf8] bg-white p-5 sm:p-8 shadow-[0_16px_30px_rgba(20,30,60,0.06)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(20,30,60,0.09)] min-w-0">
        <div className="grid gap-6 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10 min-w-0">
          {/* Visual Graphic */}
          <Link
            href={`/blog/series/${series.slug}`}
            className="block overflow-hidden rounded-2xl min-w-0"
          >
            <IsometricServerGraphic className="h-60 sm:h-72 w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
          </Link>

          {/* Content */}
          <div className="flex flex-col justify-between space-y-5 min-w-0">
            <div className="space-y-3 min-w-0">
              <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                {series.eyebrow}
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-black sm:text-3xl leading-snug break-words">
                <Link
                  href={`/blog/series/${series.slug}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {series.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-gray-mid sm:text-[15px] break-words">
                {series.description}
              </p>
            </div>

            {/* Metadata Stats */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-mono text-gray-mid">
              {/* Ongoing status badge (First to capture attention) */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-mono font-medium text-accent shrink-0">
                <svg
                  className="h-3.5 w-3.5 text-accent shrink-0"
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

              <div className="flex items-center gap-1.5 shrink-0">
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

              <div className="flex items-center gap-1.5 shrink-0">
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

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={`/blog/series/${series.slug}`}
                aria-label={`Explore ${series.title} series`}
                className="group/btn inline-flex max-w-full items-center justify-center gap-2.5 rounded-2xl border border-black bg-black px-6 py-3.5 text-[15px] sm:text-[17px] font-medium tracking-[-0.01em] text-[#f8fbff] no-underline shadow-[0_16px_26px_rgba(20,30,60,0.08)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:scale-[0.98] hover:border-[rgba(17,26,127,0.35)] hover:bg-accent hover:shadow-[0_18px_32px_rgba(30,45,246,0.24)] text-center"
              >
                <span>Explore Series</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                >
                  <path
                    d="M7 17L17 7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 7H17V16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
