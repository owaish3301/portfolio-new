'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function PublicAnalytics({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith('/keystatic') ? null : children;
}
