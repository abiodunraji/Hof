import { useState, useEffect } from 'react';
import {
  type InteriorsProject,
  type ConstructionProject,
  interiorsProjects as defaultInteriors,
  constructionProjects as defaultConstruction,
  interiorsCategories as defaultInteriorsCategories,
  constructionCategories as defaultConstructionCategories,
} from '../data/portfolioData';

export type ManagedProject<T> = T & { visible?: boolean };

export type ManagedInteriorsProject = ManagedProject<InteriorsProject>;
export type ManagedConstructionProject = ManagedProject<ConstructionProject>;

export interface PortfolioStore {
  interiors: ManagedInteriorsProject[];
  construction: ManagedConstructionProject[];
  interiorsCategories: string[];
  constructionCategories: string[];
}

export const PORTFOLIO_KEY = 'hofAdminPortfolio';

const DEFAULTS: PortfolioStore = {
  interiors: defaultInteriors,
  construction: defaultConstruction,
  interiorsCategories: defaultInteriorsCategories,
  constructionCategories: defaultConstructionCategories,
};

export function loadPortfolioStore(): PortfolioStore {
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<PortfolioStore>;
    return {
      interiors: parsed.interiors ?? DEFAULTS.interiors,
      construction: parsed.construction ?? DEFAULTS.construction,
      interiorsCategories: parsed.interiorsCategories ?? DEFAULTS.interiorsCategories,
      constructionCategories: parsed.constructionCategories ?? DEFAULTS.constructionCategories,
    };
  } catch {
    return DEFAULTS;
  }
}

export function savePortfolioStore(store: PortfolioStore): void {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(store));
  // Notify same-tab listeners
  window.dispatchEvent(new Event('hofPortfolioUpdate'));
}

export function resetPortfolioStore(): void {
  localStorage.removeItem(PORTFOLIO_KEY);
  window.dispatchEvent(new Event('hofPortfolioUpdate'));
}

/** Used by public portfolio pages — returns only visible projects. */
export function usePortfolioData() {
  const [store, setStore] = useState<PortfolioStore>(() => loadPortfolioStore());

  useEffect(() => {
    const refresh = () => setStore(loadPortfolioStore());
    // Cross-tab updates
    const storageHandler = (e: StorageEvent) => {
      if (e.key === PORTFOLIO_KEY) refresh();
    };
    window.addEventListener('storage', storageHandler);
    // Same-tab updates (from admin)
    window.addEventListener('hofPortfolioUpdate', refresh);
    return () => {
      window.removeEventListener('storage', storageHandler);
      window.removeEventListener('hofPortfolioUpdate', refresh);
    };
  }, []);

  return {
    interiorsProjects: store.interiors.filter((p) => p.visible !== false),
    constructionProjects: store.construction.filter((p) => p.visible !== false),
    interiorsCategories: store.interiorsCategories,
    constructionCategories: store.constructionCategories,
  };
}
