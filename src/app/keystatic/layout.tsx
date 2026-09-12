import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Blog editor',
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO) notFound();
  return <KeystaticApp />;
}
