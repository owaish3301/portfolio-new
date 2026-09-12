'use client';

import { useSyncExternalStore } from 'react';

function subscribe(listener: () => void) {
  window.addEventListener('storage', listener);
  return () => window.removeEventListener('storage', listener);
}

export function useStoredValue(key: string) {
  return useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(key); } catch { return null; }
  }, () => null);
}
