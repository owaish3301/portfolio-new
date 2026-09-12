import { siteConfig } from "@/data/siteConfig";

function ArrowDiagonalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.25 h-3.25"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7H17V16" />
    </svg>
  );
}

export default function Contact() {
  const { email, socials, resume } = siteConfig;

  return (
    <section
      id="contact"
      className="pt-4 pb-0 bg-surface-alt border-t border-[#e4ebf8]"
    >
      <div className="mx-auto w-[95%] sm:w-[92%] md:w-[68%] max-w-260 pt-20 pb-16 flex flex-col items-center gap-14">
        <h2 className="text-center text-[26px] sm:text-[34px] font-medium text-gray-dark leading-[1.3] tracking-[-0.02em] max-w-140 appear">
          If something here caught your eye,
          <br />
          sparked a thought —{" "}
          <span className="font-serif italic font-normal text-accent [-webkit-text-stroke:0.4px_#1e2df6]">
            let&apos;s talk.
          </span>
        </h2>

        <div className="flex flex-col w-full appear appear-d1">
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="group flex items-center justify-between px-2 py-4 sm:py-4.5 border-b border-[#d4ddf0] first:border-t transition-all duration-200 hover:bg-[rgba(30,45,246,0.04)] hover:pl-4 rounded-lg gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0 border border-[#e4ebf8] bg-white shadow-[0_2px_8px_rgba(20,30,60,0.05)] transition-all duration-200 group-hover:shadow-[0_4px_16px_rgba(30,45,246,0.12)] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 text-black"
                  aria-hidden="true"
                >
                  <rect width={20} height={16} x={2} y={4} rx={2} />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-medium text-gray-dark">
                  Email
                </div>
                <div className="text-[14px] text-gray-light underline underline-offset-[3px] decoration-[#c8d4ee] tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent group-hover:decoration-accent">
                  {email}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full grid place-items-center shrink-0 bg-white border border-[#e4ebf8] text-gray-light transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowDiagonalIcon />
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-2 py-4 sm:py-4.5 border-b border-[#d4ddf0] transition-all duration-200 hover:bg-[rgba(30,45,246,0.04)] hover:pl-4 rounded-lg gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0 border border-[#e4ebf8] bg-white shadow-[0_2px_8px_rgba(20,30,60,0.05)] transition-all duration-200 group-hover:shadow-[0_4px_16px_rgba(30,45,246,0.12)] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 text-black"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width={4} height={12} x={2} y={9} />
                  <circle cx={4} cy={4} r={2} />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-medium text-gray-dark">
                  LinkedIn
                </div>
                <div className="text-[14px] text-gray-light underline underline-offset-[3px] decoration-[#c8d4ee] tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent group-hover:decoration-accent">
                  {socials.linkedin.username}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full grid place-items-center shrink-0 bg-white border border-[#e4ebf8] text-gray-light transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowDiagonalIcon />
            </div>
          </a>

          {/* GitHub */}
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-2 py-4 sm:py-4.5 border-b border-[#d4ddf0] transition-all duration-200 hover:bg-[rgba(30,45,246,0.04)] hover:pl-4 rounded-lg gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0 border border-[#e4ebf8] bg-white shadow-[0_2px_8px_rgba(20,30,60,0.05)] transition-all duration-200 group-hover:shadow-[0_4px_16px_rgba(30,45,246,0.12)] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 text-black"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-medium text-gray-dark">
                  GitHub
                </div>
                <div className="text-[14px] text-gray-light underline underline-offset-[3px] decoration-[#c8d4ee] tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent group-hover:decoration-accent">
                  {socials.github.username}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full grid place-items-center shrink-0 bg-white border border-[#e4ebf8] text-gray-light transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowDiagonalIcon />
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href={socials.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-2 py-4 sm:py-4.5 border-b border-[#d4ddf0] transition-all duration-200 hover:bg-[rgba(30,45,246,0.04)] hover:pl-4 rounded-lg gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0 border border-[#e4ebf8] bg-white shadow-[0_2px_8px_rgba(20,30,60,0.05)] transition-all duration-200 group-hover:shadow-[0_4px_16px_rgba(30,45,246,0.12)] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5 text-black"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-medium text-gray-dark">
                  X (Twitter)
                </div>
                <div className="text-[14px] text-gray-light underline underline-offset-[3px] decoration-[#c8d4ee] tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent group-hover:decoration-accent">
                  {socials.twitter.username}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full grid place-items-center shrink-0 bg-white border border-[#e4ebf8] text-gray-light transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowDiagonalIcon />
            </div>
          </a>

          {/* Resume */}
          <a
            href={resume.path}
            download={resume.filename}
            className="group flex items-center justify-between px-2 py-4 sm:py-4.5 border-b border-[#d4ddf0] transition-all duration-200 hover:bg-[rgba(30,45,246,0.04)] hover:pl-4 rounded-lg gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0 border border-[#e4ebf8] bg-white shadow-[0_2px_8px_rgba(20,30,60,0.05)] transition-all duration-200 group-hover:shadow-[0_4px_16px_rgba(30,45,246,0.12)] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 text-black"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-medium text-gray-dark">
                  Resume
                </div>
                <div className="text-[14px] text-gray-light underline underline-offset-[3px] decoration-[#c8d4ee] tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent group-hover:decoration-accent">
                  {resume.cvDownloadLabel}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full grid place-items-center shrink-0 bg-white border border-[#e4ebf8] text-gray-light transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.25 h-3.25"
                aria-hidden="true"
              >
                <path d="M12 3v11" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
