import type { SiteConfig } from '../data/siteConfig';
import { useSiteContent } from '../lib/content';

/**
 * The site-wide settings (contact details, social links, footer text, toggles).
 * Saved values come from the Worker; the defaults in src/data/siteConfig.ts are
 * exactly what the pages showed before, so the first render never changes.
 */
export function useSiteConfig(): SiteConfig {
  return useSiteContent().config;
}
