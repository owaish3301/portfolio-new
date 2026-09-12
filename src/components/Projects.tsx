import ProjectCards from "@/components/ProjectCards";
import { siteConfig } from "@/data/siteConfig";

export default function Projects() {
  return (
    <section id="work" className="px-4 pt-28 pb-20 md:px-6 md:pt-32 md:pb-24">
      <div className="mx-auto w-full max-w-272">
        <div
          data-reveal
          className="mb-3 flex flex-wrap items-baseline gap-2.5 opacity-0 translate-y-6 scale-[0.98] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        >
          <span className="text-[40px] font-medium tracking-[-0.02em] text-gray-dark sm:text-[54px]">
            Selected
          </span>
          <span className="font-serif text-[40px] italic text-accent [-webkit-text-stroke:0.4px_var(--color-accent)] sm:text-[54px]">
            Projects
          </span>
        </div>
        <p
          data-reveal
          className="mb-10 max-w-184 opacity-0 translate-y-6 scale-[0.98] text-[15px] leading-[1.6] text-gray-light transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] delay-75"
        >
          A mix of full-stack web applications engineered by {siteConfig.name} (
          {siteConfig.nickname}).
        </p>
        <ProjectCards />
      </div>
    </section>
  );
}
