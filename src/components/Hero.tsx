import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

export default function Hero() {
  const { currentRole, techStack, socials } = siteConfig;

  return (
    <section className="pt-28 flex flex-col items-center gap-0">
      {/* Title & Kicker */}
      <div className="flex flex-col items-center gap-4 py-12 md:py-12.5 pb-10 opacity-0 animate-[riseUp_1s_0.3s_cubic-bezier(.22,1,.36,1)_forwards]">
        <p
          id="hero-kicker"
          className="text-[15px] md:text-lg text-gray-mid font-normal text-center"
        >
          Full Stack Developer
        </p>
        <h1 className="text-center leading-[1.15] tracking-tight">
          <span className="block font-sans text-4xl md:text-[54px] font-medium text-gray-dark">
            Engineering systems from
          </span>
          <span className="flex items-center gap-2 md:gap-3.5 justify-center flex-wrap">
            <span className="font-sans text-4xl md:text-[54px] font-medium text-gray-dark">
              data layer to{" "}
            </span>
            <span className="font-serif text-4xl md:text-[54px] font-normal italic text-accent [-webkit-text-stroke:0.4px_var(--color-accent)]">
              interface
            </span>
          </span>
        </h1>
      </div>

      {/* Bento Grid */}
      <div
        id="projects"
        className="mx-auto w-[68%] max-w-260 pb-5 opacity-0 animate-[bentoScaleIn_1s_1s_cubic-bezier(.22,1,.36,1)_forwards] max-[960px]:w-[92%] max-[600px]:w-[95%]"
      >
        <div className="grid grid-cols-3 gap-3 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
          {/* Card 1: GitHub Contributions */}
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub"
            className="group relative flex min-h-57.5 overflow-hidden rounded-2xl border border-[#e1e8f8] bg-[linear-gradient(145deg,#ffffff_0%,#f4f7ff_100%)] no-underline max-[600px]:col-span-1"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e2df6_1px,transparent_1px)] bg-size-[16px_16px]" />
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="font-mono text-[11px] tracking-[0.08em] text-[#627390] uppercase">
                GitHub
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-gray-light"
                aria-hidden="true"
              >
                <path
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Git Graph Container */}
            <div className="absolute inset-x-0 top-14 bottom-16 flex items-center overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%)]">
              <Image
                src="https://ghchart.rshah.org/1e2df6/owaish3301"
                alt="GitHub Contributions"
                width={700}
                height={110}
                unoptimized
                className="absolute right-0 h-25 sm:h-27.5 w-auto max-w-none opacity-80 mix-blend-multiply pr-2 sm:pr-4"
              />
            </div>

            {/* Pill */}
            <span className="absolute right-4 bottom-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black px-4.5 py-1.75 text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              {socials.github.username}
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7H17V16" />
              </svg>
            </span>
          </a>

          {/* Card 2: Working At */}
          <article className="relative flex min-h-57.5 flex-col justify-between overflow-hidden rounded-2xl border border-[#dce9ff] bg-white px-6 py-5.5 shadow-[0_16px_26px_rgba(20,30,60,0.08)] max-[600px]:col-span-1">
            <div className="max-w-42">
              <span className="font-mono text-[11px] tracking-[0.08em] text-[#3157c4] uppercase">
                Working At
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-[32px] font-medium leading-[0.96] tracking-[-0.02em] text-gray-dark sm:text-[34px]">
                <a
                  href={currentRole.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-inherit no-underline transition-opacity duration-200 hover:opacity-80"
                >
                  {currentRole.company}
                </a>
              </h2>
              <div className="h-px w-14 bg-[#dce9ff]" />
              <p className="text-[24px] font-medium leading-[1.02] tracking-[-0.02em] text-gray-light">
                Frontend Dev
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6d7f9b]">
                Joined {currentRole.startDateFormatted}
              </p>
            </div>
          </article>

          {/* Card 3: Portrait & View Work */}
          <div className="col-start-3 row-[1/3] flex flex-col gap-3 max-[960px]:col-span-2 max-[960px]:col-start-auto max-[960px]:row-auto max-[600px]:col-span-1">
            <div className="relative flex-1 overflow-hidden rounded-2xl min-h-67.5 shadow-[0_16px_26px_rgba(20,30,60,0.08)] max-[960px]:min-h-50">
              <Image
                src="/shadow-dp2.png"
                alt={`${siteConfig.name} (${siteConfig.nickname}) - Full Stack & Frontend Developer`}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 320px"
                className="object-cover object-top"
              />
            </div>
            <a
              href="#work"
              aria-label={`View work by ${siteConfig.name}`}
              className="group flex items-center justify-center gap-2.5 rounded-2xl border border-black bg-black px-6 py-4.25 text-[17px] font-medium tracking-[-0.01em] text-[#f8fbff] no-underline shadow-[0_16px_26px_rgba(20,30,60,0.08)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:scale-[0.98] hover:border-[rgba(17,26,127,0.35)] hover:bg-accent hover:shadow-[0_18px_32px_rgba(30,45,246,0.24)] max-[960px]:hidden"
            >
              <span>View Work</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5"
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
            </a>
          </div>

          {/* Card 4: Tech Stack */}
          <article className="col-span-2 flex min-h-43.75 flex-col gap-3.5 rounded-2xl border border-[#dce9ff] bg-[linear-gradient(160deg,#f8fbff_0%,#edf4ff_100%)] px-7 py-6 shadow-[0_16px_26px_rgba(20,30,60,0.08)] max-[600px]:col-span-1">
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#3157c4]">
              {"// tech stack"}
            </div>
            <div className="flex flex-col gap-2.25">
              {techStack.map((category) => (
                <div key={category.title} className="flex items-center gap-3">
                  <span className="w-20.5 shrink-0 font-mono text-[10px] tracking-[0.05em] text-[#7a8dab] uppercase">
                    {category.title}
                  </span>
                  <div className="flex flex-wrap gap-1.25">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[#cfdef7] bg-white/86 px-2.5 py-0.75 font-mono text-[12px] text-[#30415f]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
