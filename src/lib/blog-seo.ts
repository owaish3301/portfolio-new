import type { Metadata } from 'next';
import type { ContentMetadata } from '../data/blog';
import { siteConfig } from '../data/siteConfig';

export function absoluteUrl(path: string) { return new URL(path, siteConfig.siteUrl).href; }

export function contentMetadata(entry: ContentMetadata, description: string, path: string, article = true): Metadata {
  const title = entry.seo.title || entry.title;
  const summary = entry.seo.description || description;
  const image = absoluteUrl(entry.seo.image || entry.coverImage || `/api/blog/og?path=${encodeURIComponent(path)}`);
  return {
    title: `${title} | ${siteConfig.name}`, description: summary,
    alternates: { canonical: absoluteUrl(path), types: { 'application/rss+xml': absoluteUrl('/feed.xml') } },
    openGraph: {
      title, description: summary, url: absoluteUrl(path), siteName: `${siteConfig.name} Blog`,
      images: [{ url: image, alt: entry.coverAlt || title }],
      ...(article ? { type: 'article' as const, publishedTime: entry.publishedDate, modifiedTime: entry.updatedDate, authors: [siteConfig.name] } : { type: 'website' as const }),
    },
    twitter: { card: 'summary_large_image', title, description: summary, images: [image] },
  };
}

export function articleJsonLd(entry: ContentMetadata, description: string, path: string, series?: { title: string; slug: string }) {
  return {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: entry.title, description, url: absoluteUrl(path), mainEntityOfPage: absoluteUrl(path),
    datePublished: entry.publishedDate, dateModified: entry.updatedDate,
    image: absoluteUrl(entry.seo.image || entry.coverImage || `/api/blog/og?path=${encodeURIComponent(path)}`),
    author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.siteUrl },
    ...(series ? { isPartOf: { '@type': 'CreativeWorkSeries', name: series.title, url: absoluteUrl(`/blog/series/${series.slug}`) } } : {}),
  };
}

export function serializeJsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
