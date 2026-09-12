export const blogCategories = ["Development", "System Design", "Design", "Tutorials", "Notes", "Tools", "Career", "Personal"] as const;
export const filterTags = ["All", "Series", "Tutorials", "Notes", "Tools", "System Design", "Career", "Personal"] as const;
export type FilterTag = (typeof filterTags)[number];
export interface Heading { id: string; title: string; level: number }
export interface Seo { title: string; description: string; image: string | null }
export interface ContentMetadata {
  slug: string;
  title: string;
  publishedAt: string;
  publishedDate: string;
  updatedDate: string;
  coverImage: string | null;
  coverAlt: string;
  seo: Seo;
}
export interface Chapter extends ContentMetadata {
  number: number;
  readTime: string;
  readMinutes: number;
  summary: string;
  headings: Heading[];
}
export interface SeriesPart {
  id: string;
  partNumber: string;
  title: string;
  chapters: Chapter[];
}
export interface Series extends ContentMetadata {
  subtitle: string;
  description: string;
  eyebrow: string;
  status: "Ongoing" | "Completed";
  articleCount: number;
  totalReadTime: string;
  featured: boolean;
  parts: SeriesPart[];
  overview: string;
  audience: string;
  resourcesDescription: string;
  resources: { label: string; url: string }[];
}
export interface BlogPost extends ContentMetadata {
  description: string;
  category: (typeof blogCategories)[number];
  readTime: string;
  readMinutes: number;
  coverType: "code" | "diagram" | "gradient";
  tags: string[];
  headings: Heading[];
}
