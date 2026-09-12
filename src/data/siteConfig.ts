export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  label: string;
  username: string;
  url: string;
}

export interface TechStackCategory {
  title: string;
  skills: string[];
}

export const siteConfig = {
  name: "Md Owaish Alam",
  shortName: "Owaish Alam",
  nickname: "Owaish / Owais",
  title: "Md Owaish Alam (Owaish / Owais) | Full Stack & Frontend Developer Portfolio",
  description:
    "Official portfolio of Md Owaish Alam (commonly known as Owaish or Owais). Full Stack & Frontend Developer specializing in React, Next.js, TypeScript, Node.js, and web systems engineering.",
  siteUrl: "https://owaish.codes",
  email: "owaish3301@gmail.com",
  currentRole: {
    position: "Frontend Developer",
    company: "Ekatraa",
    companyUrl: "https://ekatraa.in",
    startDateFormatted: "July 9, 2026",
  },
  resume: {
    path: "/resume.pdf",
    filename: "Owaish-Alam-Resume.pdf",
    cvDownloadLabel: "Download CV",
  },
  navLinks: [
    { label: "Projects", href: "/#work" },
    { label: "Blog", href: "/blog" },
    { label: "About Me", href: "/#about" },
    { label: "Contact Me", href: "/#contact" },
  ] as NavLink[],
  socials: {
    github: {
      name: "GitHub",
      username: "@owaish3301",
      url: "https://github.com/owaish3301",
    },
    linkedin: {
      name: "LinkedIn",
      username: "/in/owaish-alam-a7393a314",
      url: "https://www.linkedin.com/in/owaish-alam-a7393a314/",
    },
    twitter: {
      name: "X (Twitter)",
      username: "@owaish3301",
      url: "https://x.com/owaish3301",
    },
  },
  techStack: [
    {
      title: "frontend",
      skills: ["React", "TypeScript", "Tailwind"],
    },
    {
      title: "backend",
      skills: ["Node.js", "Express"],
    },
    {
      title: "database",
      skills: ["PostgreSQL", "MongoDB", "Prisma"],
    },
    {
      title: "tools",
      skills: ["GitHub Actions", "Docker", "Vercel"],
    },
  ] as TechStackCategory[],
};
