import Link from "next/link";
import { BlogPost } from "@/data/blog";

function ArticlePreviewBanner({ type }: { type: BlogPost["coverType"] }) {
  if (type === "code") {
    return (
      <div className="relative flex h-36 w-full items-end overflow-hidden bg-[#16181d] px-5 pb-4 pt-6">
        <div className="absolute top-3.5 left-4 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
        <pre className="font-mono text-[11px] leading-5 text-white/55">
          <span className="text-[#79c0ff]">package</span> main{"\n"}
          <span className="text-white/30">func</span> Echo() {"{"}
          {"\n"}
          {"  "}listen(){"\n"}
          {"}"}
        </pre>
      </div>
    );
  }

  if (type === "diagram") {
    return (
      <div className="relative flex h-36 w-full items-center justify-center gap-2 overflow-hidden bg-[#16181d] px-4">
        <span className="rounded-md bg-white/8 px-2.5 py-1 font-mono text-[10px] text-white/70">
          Client
        </span>
        <span className="h-px w-5 bg-white/20" aria-hidden="true" />
        <span className="rounded-md bg-accent/25 px-2.5 py-1 font-mono text-[10px] text-[#c5d0ff]">
          LB
        </span>
        <span className="h-px w-5 bg-white/20" aria-hidden="true" />
        <span className="rounded-md bg-white/8 px-2.5 py-1 font-mono text-[10px] text-white/70">
          App
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex h-36 w-full items-end overflow-hidden bg-accent px-5 pb-4">
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_0%,#9bceff_0%,transparent_55%),radial-gradient(70%_80%_at_0%_100%,#6c63ff_0%,transparent_50%)]" />
      <span className="relative font-mono text-[11px] tracking-wide text-white/80">
        oklch · hue 330
      </span>
    </div>
  );
}

export default function LatestArticles({ articles }: { articles: BlogPost[] }) {
  if (articles.length === 0) return null;

  return (
    <section id="all" className="mb-16 scroll-mt-28">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight text-gray-dark sm:text-2xl">
          Latest Articles
        </h2>
        <Link
          href="/blog#all"
          className="text-xs font-mono uppercase tracking-wider text-accent hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
        {articles.map((article) => (
          <article key={article.slug} className="min-w-0">
            <Link
              href={`/blog/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4ebf8] bg-white transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30 min-w-0"
            >
              <ArticlePreviewBanner type={article.coverType} />

              <div className="flex flex-1 flex-col p-5 min-w-0">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-light">
                  <span className="text-accent">{article.category}</span>
                  <span aria-hidden="true">•</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h3 className="mt-2.5 text-[17px] font-medium leading-snug tracking-tight text-black transition-colors duration-300 group-hover:text-accent break-words">
                  {article.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-mid break-words">
                  {article.description}
                </p>

                <span className="mt-auto pt-5 font-mono text-[11px] text-gray-light">
                  {article.readTime}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
