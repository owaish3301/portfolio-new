import Image from "next/image";
import { projects, type Project } from "@/data/projects";

const revealDelayClasses = ["delay-0", "delay-75", "delay-150"] as const;

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.25 w-3.25 shrink-0"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.25 w-3.25 shrink-0"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7H17V16" />
    </svg>
  );
}

function ProjectLink({
  label,
  href,
  variant,
  projectName,
}: {
  label: string;
  href: string;
  variant: "github" | "live";
  projectName: string;
}) {
  const isPlaceholder = href === "#";
  const baseClass =
    "inline-flex items-center gap-1.75 rounded-xl px-4 py-2.5 text-[13px] font-medium no-underline transition-[opacity,transform,box-shadow] duration-200 ease-out hover:opacity-82 hover:scale-[0.97]";
  const variantClass =
    variant === "github"
      ? "bg-black text-[#f0f0f0] shadow-[0_4px_12px_rgba(10,10,10,0.15)]"
      : "border border-[rgba(17,26,127,0.35)] bg-accent text-[#f0f6ff] shadow-[0_4px_12px_rgba(30,45,246,0.22)]";

  return (
    <a
      href={href}
      aria-label={`${projectName} ${label}`}
      aria-disabled={isPlaceholder ? true : undefined}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noreferrer"}
      className={`${baseClass} ${variantClass}`}
      onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
    >
      {variant === "github" ? <GithubIcon /> : <LiveIcon />}
      <span>{label}</span>
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const delayClass = revealDelayClasses[index % revealDelayClasses.length];

  return (
    <article
      data-reveal
      className={`group overflow-hidden rounded-3xl border border-[#e4ebf8] bg-white opacity-0 translate-y-6 scale-[0.98] shadow-[0_16px_26px_rgba(20,30,60,0.06)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${delayClass}`}
    >
      <div className="grid md:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]">
        <div className="relative min-h-60 overflow-hidden bg-surface-alt sm:min-h-70 md:min-h-80">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(10,10,10,0)_0%,rgba(10,10,10,0.1)_100%)]" />
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 550px"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/82 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#425577] shadow-[0_10px_24px_rgba(20,30,60,0.08)] backdrop-blur-md">
            {project.eyebrow}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 p-5 sm:p-7 md:p-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-black sm:text-[22px]">
                {project.name}
                <span className="text-gray-mid"> - {project.headline}</span>
              </h3>
              <p className="text-[14px] leading-7 text-gray-mid sm:text-[15px]">
                {project.description}
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#627390]">
                Technologies used
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#cfdef7] bg-white/86 px-2.5 py-1 font-mono text-[11px] text-[#30415f]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ProjectLink
              label="GitHub"
              href={project.githubUrl}
              variant="github"
              projectName={project.name}
            />
            <ProjectLink
              label="Live Site"
              href={project.liveUrl}
              variant="live"
              projectName={project.name}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectCards() {
  return (
    <div data-project-grid className="grid gap-5 md:gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  );
}
