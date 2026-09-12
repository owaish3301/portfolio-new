import Link from "next/link";

export default function MoreToExplore() {
  return (
    <section className="mb-20">
      <div className="mb-6">
        <h2 className="text-xl font-medium tracking-tight text-gray-dark sm:text-2xl">
          More to explore
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 min-w-0">
        {/* Card 1 */}
        <Link
          href="/blog#articles"
          className="group flex items-center justify-between rounded-3xl border border-[#e4ebf8] bg-white p-5 sm:p-6 shadow-[0_10px_20px_rgba(20,30,60,0.04)] transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_30px_rgba(20,30,60,0.08)] min-w-0 gap-3"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-accent transition-transform group-hover:scale-110">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-medium text-black group-hover:text-accent transition-colors truncate">
                Browse all articles
              </h3>
              <p className="text-xs text-gray-mid truncate">
                Explore everything I've written.
              </p>
            </div>
          </div>
          <span className="text-lg text-gray-light transition-transform group-hover:translate-x-1 group-hover:text-accent shrink-0">
            →
          </span>
        </Link>

        {/* Card 2 */}
        <Link
          href="/blog/series/backend-from-first-principles"
          className="group flex items-center justify-between rounded-3xl border border-[#e4ebf8] bg-white p-5 sm:p-6 shadow-[0_10px_20px_rgba(20,30,60,0.04)] transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_30px_rgba(20,30,60,0.08)] min-w-0 gap-3"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-accent transition-transform group-hover:scale-110">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-medium text-black group-hover:text-accent transition-colors truncate">
                View all series
              </h3>
              <p className="text-xs text-gray-mid truncate">
                Long-form deep dives on specific topics.
              </p>
            </div>
          </div>
          <span className="text-lg text-gray-light transition-transform group-hover:translate-x-1 group-hover:text-accent shrink-0">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
