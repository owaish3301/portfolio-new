export type Project = {
  name: string;
  eyebrow: string;
  headline: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  metric: string;
  githubUrl: string;
  liveUrl: string;
};

export const projects: Project[] = [
  {
    name: "The Monkey's Captain",
    eyebrow: "Restaurant Landing Page",
    headline: "Bold food-stall website for menu discovery and event bookings",
    shortDescription:
      "A mobile-friendly restaurant landing page with strong branding, menu sections, gallery, and booking CTAs.",
    description:
      "A high-energy website for The Monkey's Captain, a Dumduma food stall. It presents the brand, best sellers, event catering, gallery, map access, and booking paths through a responsive Vite build.",
    image: "/monkeys-captain-hero-screenshot.png",
    imageAlt: "Screenshot of The Monkey's Captain hero section",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    metric: "Menu discovery / Event booking / Mobile-first layout",
    githubUrl: "https://github.com/owaish3301/MonkeysCaptain",
    liveUrl: "https://monkeys-captain.vercel.app/",
  },
  {
    name: "Clipcode",
    eyebrow: "Code Screenshot Tool",
    headline: "Beautiful code screenshots with themes, exports, and sharing",
    shortDescription:
      "A polished tool for turning code snippets into shareable PNG and SVG screenshots.",
    description:
      "A Next.js app for creating clean code images with gradient themes, syntax highlighting, font controls, line numbers, resizable frames, high-DPI export, copy actions, and shareable links.",
    image: "/clipcode-preview.png",
    imageAlt: "Clipcode code screenshot preview",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Highlight.js"],
    metric: "PNG and SVG export / Theme controls / Share links",
    githubUrl: "https://github.com/owaish3301/clipcode",
    liveUrl: "https://clipcode-mu.vercel.app/",
  },
];
