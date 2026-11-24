/**
 * The site's editable content (settings + portfolio) as seen by every public page.
 *
 * Source of truth: the Worker. The built-in defaults (src/data) are the fallback, so an
 * empty or unreachable Worker gives exactly the site that was built.
 *
 * Hydration: the first snapshot is always the defaults, on the server and in the
 * browser, so the prerendered HTML and the first client render match. The saved content
 * arrives a moment later and swaps in.
 */
import { useEffect, useSyncExternalStore } from 'react';
import { defaultConfig, type SiteConfig } from '../data/siteConfig';
import {
  constructionCategories as defaultConstructionCategories,
  constructionProjects as defaultConstruction,
  interiorsCategories as defaultInteriorsCategories,
  interiorsProjects as defaultInteriors,
  type ConstructionProject,
  type InteriorsProject,
} from '../data/portfolioData';
import { apiFetch } from './api';

export type ManagedInteriorsProject = InteriorsProject & { visible?: boolean };
export type ManagedConstructionProject = ConstructionProject & { visible?: boolean };

export interface PortfolioStore {
  interiors: ManagedInteriorsProject[];
  construction: ManagedConstructionProject[];
  interiorsCategories: string[];
  constructionCategories: string[];
}

export interface SiteContent {
  config: SiteConfig;
  portfolio: PortfolioStore;
}

/** What GET /api/content returns. `portfolio` has only the sections the owner has saved. */
export interface ContentResponse {
  config?: Partial<SiteConfig>;
  portfolio?: Partial<PortfolioStore> | null;
  updatedAt?: string | null;
}

export const DEFAULT_PORTFOLIO: PortfolioStore = {
  interiors: defaultInteriors,
  construction: defaultConstruction,
  interiorsCategories: defaultInteriorsCategories,
  constructionCategories: defaultConstructionCategories,
};

export const DEFAULT_CONTENT: SiteContent = { config: defaultConfig, portfolio: DEFAULT_PORTFOLIO };

/** Fills whatever the Worker did not send with the built-in defaults. */
export function mergeContent(data: ContentResponse | null | undefined): SiteContent {
  const p = data?.portfolio ?? {};
  return {
    config: { ...defaultConfig, ...(data?.config ?? {}) },
    portfolio: {
      interiors: p.interiors ?? DEFAULT_PORTFOLIO.interiors,
      construction: p.construction ?? DEFAULT_PORTFOLIO.construction,
      interiorsCategories: p.interiorsCategories ?? DEFAULT_PORTFOLIO.interiorsCategories,
      constructionCategories: p.constructionCategories ?? DEFAULT_PORTFOLIO.constructionCategories,
    },
  };
}

// ---------------------------------------------------------------- the store

let snapshot: SiteContent = DEFAULT_CONTENT;
let loaded = false;
let inFlight: Promise<void> | null = null;
let lastAttempt = 0;
const RETRY_AFTER_MS = 30_000;
const listeners = new Set<() => void>();

function publish(next: SiteContent) {
  snapshot = next;
  for (const l of listeners) l();
}

/** Used by the admin panel right after a save so the open site tab shows it at once. */
export function setContent(data: ContentResponse | null) {
  loaded = true;
  publish(mergeContent(data));
}

/** Fetches the saved content once; a failed attempt is retried by the next page that asks, at most every 30 s. */
export function loadContent(): Promise<void> {
  if (typeof window === 'undefined' || loaded) return Promise.resolve();
  if (inFlight) return inFlight;
  if (Date.now() - lastAttempt < RETRY_AFTER_MS && lastAttempt !== 0) return Promise.resolve();
  lastAttempt = Date.now();
  inFlight = apiFetch<ContentResponse>('/api/content')
    .then((res) => {
      if (res.ok) {
        loaded = true;
        publish(mergeContent(res.data));
      }
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export function useSiteContent(): SiteContent {
  const content = useSyncExternalStore(subscribe, () => snapshot, () => DEFAULT_CONTENT);
  useEffect(() => {
    void loadContent();
  }, []);
  return content;
}
