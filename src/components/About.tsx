import { siteConfig } from "@/data/siteConfig";

export default function About() {
  const { currentRole } = siteConfig;

  return (
    <section
      id="about"
      className="px-4 py-20 md:px-6 md:py-32 relative overflow-hidden"
    >
      <div className="mx-auto w-full max-w-272">
        {/* Section Header */}
        <div
          data-reveal
          className="mb-12 flex flex-wrap items-baseline gap-2.5 opacity-0 translate-y-6 scale-[0.98] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        >
          <span className="text-[40px] font-medium tracking-[-0.02em] text-gray-dark sm:text-[54px]">
            About
          </span>
          <span className="font-serif text-[40px] italic text-accent [-webkit-text-stroke:0.4px_var(--color-accent)] sm:text-[54px]">
            Me
          </span>
        </div>

        <div className="w-full">
          {/* Content Column */}
          <div className="flex flex-col gap-6">
            <p
              data-reveal
              className="text-[17px] md:text-[20px] leading-[1.65] text-gray-dark font-medium opacity-0 translate-y-6 scale-[0.98] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] delay-75"
            >
              I&apos;m{" "}
              <strong className="font-semibold text-gray-dark">
                {siteConfig.name}
              </strong>
              , a full-stack developer driven by a simple philosophy:{" "}
              <span className="bg-[linear-gradient(120deg,rgba(36,56,247,0.08)_0%,rgba(36,56,247,0)_100%)] px-1.5 py-0.5 rounded-md text-accent">
                build things that work and feel right.
              </span>{" "}
              Currently pursuing my B.Tech at ITER, SOA, I enjoy turning ideas
              into clean, usable web experiences.
            </p>

            <p
              data-reveal
              className="text-[16px] md:text-[18px] leading-[1.7] text-gray-light opacity-0 translate-y-6 scale-[0.98] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] delay-150"
            >
              I believe in a user-centered approach, making sure every project I
              work on is shaped around the specific needs of the people using
              it. I care about performance, accessibility, and responsive design
              because those details are what make a product feel smooth,
              reliable, and easy to use.
            </p>

            <div
              data-reveal
              className="mt-4 opacity-0 translate-y-6 scale-[0.98] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] delay-225"
            >
              <div className="relative flex w-full flex-col gap-3 border-y border-[#dfe5f1] py-5 sm:flex-row sm:items-start sm:gap-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d6def2] bg-[#f4f7ff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-accent"
                    aria-hidden="true"
                  >
                    <path d="M12 12h.01" />
                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                    <rect width="20" height="14" x="2" y="6" rx="2" />
                  </svg>
                </div>
                <p className="min-w-0 flex-1 text-[15px] leading-[1.7] text-[#4f5f78]">
                  Currently working as a{" "}
                  <span className="font-semibold text-gray-dark">
                    {currentRole.position}
                  </span>{" "}
                  at{" "}
                  <a
                    href={currentRole.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-dark underline decoration-[#c5d0e8] underline-offset-3 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                  >
                    ekatraa.in
                  </a>
                  , joined{" "}
                  <span className="font-semibold text-gray-dark">
                    {currentRole.startDateFormatted}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
