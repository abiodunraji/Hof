import type { SiteConfig } from '../../data/siteConfig';
import type { PortfolioStore } from '../../lib/content';

/** Shows the owner the real outcome of an action (the banner at the bottom of the panel). */
export type Notify = (kind: 'success' | 'error', text: string) => void;

export type SaveResult = { ok: true } | { ok: false; error: string };

/** What the panel can send to PUT /api/content. */
export interface ContentUpdate {
  config?: Partial<SiteConfig>;
  portfolio?: Partial<PortfolioStore>;
}
