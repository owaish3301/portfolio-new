import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-alt border-t border-[#e4ebf8] py-8">
      <div className="mx-auto w-[95%] sm:w-[92%] md:w-[68%] max-w-260 flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black grid place-items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
              aria-hidden="true"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className="text-[13px] text-gray-light tracking-[-0.01em]">
            © {currentYear} {siteConfig.name} ({siteConfig.nickname}). All
            rights reserved.
          </span>
        </div>
        <div className="text-[13px] text-gray-light flex items-center justify-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.25 h-3.25 text-gray-light"
            aria-hidden="true"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {siteConfig.name}
        </div>
      </div>
    </footer>
  );
}
