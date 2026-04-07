import { useState, useEffect } from 'react';
import { type SiteConfig, defaultConfig, STORAGE_KEY } from '../data/siteConfig';

/** Reads site config from localStorage, merged over defaults. */
export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(() => loadConfig());

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setConfig(loadConfig());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return config;
}

export function loadConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConfig;
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return defaultConfig;
  }
}

export function saveConfig(updates: Partial<SiteConfig>): void {
  const current = loadConfig();
  const next = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function resetConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}
