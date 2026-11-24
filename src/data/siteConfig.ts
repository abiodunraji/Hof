/**
 * Site Configuration
 *
 * DEFAULT values for the site-wide settings the admin panel can change.
 * Every default below is exactly what the public pages showed before the
 * panel was connected to the Worker, so an empty or unreachable Worker gives
 * today's site.
 *
 * The values the owner saves live on the Worker (Cloudflare KV), not in the
 * browser. Public pages read them through `useSiteConfig()`.
 *
 * Where each setting shows up:
 *   contactPhone         Interiors contact page, Construction contact page (and its
 *                        emergency line), Construction footer. "A / B" = two numbers.
 *   contactEmail         the same three places
 *   contactAddress       both contact pages, the map block, Construction footer.
 *                        One line per row; the footer joins the rows with ", ".
 *   socialInstagram,
 *   socialFacebook,
 *   socialLinkedIn       Interiors footer and the "Follow Me" card (empty = icon hidden)
 *   interiorsTagline     Interiors footer paragraph
 *   constructionTagline  Construction footer paragraph
 *   consultationCtaText  the button on the Interiors contact page that opens the
 *                        consultation form
 *   showConsultationCta  the "Complimentary Consultation" card on that page
 *   portfolioEnabled     the Portfolio link in both navigation bars and the footer
 */

export interface SiteConfig {
  // Contact
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;

  // Social
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;

  // Business
  interiorsTagline: string;
  constructionTagline: string;
  consultationCtaText: string;

  // Feature toggles
  showConsultationCta: boolean;
  portfolioEnabled: boolean;
}

export const defaultConfig: SiteConfig = {
  // Contact
  contactPhone: '09039330335 / 07040654539',
  contactEmail: 'Houseoffaridahh@gmail.com',
  contactAddress: 'Node by COBUILDIT\nMabushi, Abuja\nFederal Capital Territory',

  // Social
  socialInstagram: 'https://instagram.com/houseoffaridah',
  socialFacebook: 'https://facebook.com/houseoffaridah',
  socialLinkedIn: 'https://linkedin.com/company/houseoffaridah',

  // Business
  interiorsTagline:
    'Creating beautiful, timeless spaces that nurture the soul and celebrate the art of living. Every design tells a unique story of elegance and comfort.',
  constructionTagline:
    'Building excellence since 2010. Quality construction and renovation services you can trust.',
  consultationCtaText: 'Book Consultation',

  // Feature toggles
  showConsultationCta: true,
  portfolioEnabled: true,
};

/** The keys the Worker accepts for `config`; anything else is rejected. */
export const CONFIG_KEYS = Object.keys(defaultConfig) as (keyof SiteConfig)[];
