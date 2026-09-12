import { siteConfig } from "@/data/siteConfig";

export default function BlogFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e4ebf8] bg-transparent py-14">
      <div className="mx-auto w-[95%] sm:w-[92%] md:w-[75%] max-w-260 flex flex-col items-center justify-center text-center space-y-8">
        {/* Editorial Quote from reference mockup */}
        <p className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-dark">
          Good{" "}
          <span className="font-serif italic text-accent font-normal [-webkit-text-stroke:0.4px_var(--color-accent)]">
            ideas
          </span>{" "}
          deserve a place to live.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-black/6 text-xs font-mono text-gray-light gap-4">
          <p className="text-center sm:text-left">
            © {currentYear} {siteConfig.name} ({siteConfig.nickname}). All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.socials.github.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.socials.twitter.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors"
            >
              X (Twitter)
            </a>
            <a
              href={siteConfig.socials.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
