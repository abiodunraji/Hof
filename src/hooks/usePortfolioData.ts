import { useMemo } from 'react';
import { useSiteContent } from '../lib/content';

export type {
  ManagedInteriorsProject,
  ManagedConstructionProject,
  PortfolioStore,
} from '../lib/content';

/**
 * Used by the public portfolio pages: the projects the owner has saved on the Worker
 * (or the built-in ones when nothing is saved or the Worker is unreachable),
 * hidden projects filtered out.
 */
export function usePortfolioData() {
  const { portfolio } = useSiteContent();
  return useMemo(
    () => ({
      interiorsProjects: portfolio.interiors.filter((p) => p.visible !== false),
      constructionProjects: portfolio.construction.filter((p) => p.visible !== false),
      interiorsCategories: portfolio.interiorsCategories,
      constructionCategories: portfolio.constructionCategories,
    }),
    [portfolio],
  );
}
