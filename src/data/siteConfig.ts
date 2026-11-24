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
 *   tallyInteriorsFormId   the owner's Tally form shown on the Interiors contact page and in
 *                        the Interiors consultation pop-up (empty = show phone and email)
 *   tallyConstructionFormId the Tally form for Construction (none exists yet: empty = the
 *                        Construction contact page shows phone and email instead of a form)
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

  // Enquiry forms (Tally form ids; empty = no form)
  tallyInteriorsFormId: string;
  tallyConstructionFormId: string;

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
  // Only the Instagram account that exists. The pages instagram.com/houseoffaridah,
  // facebook.com/houseoffaridah and the LinkedIn company page were not found (1 Nov 2026),
  // so they are empty here (an empty link hides its icon). The owner can add them in the panel.
  socialInstagram: 'https://instagram.com/hofinteriorconcept',
  socialFacebook: '',
  socialLinkedIn: '',

  // Business
  interiorsTagline:
    'Creating beautiful, timeless spaces that nurture the soul and celebrate the art of living. Every design tells a unique story of elegance and comfort.',
  constructionTagline:
    'Construction and renovation services by House of Faridah.',
  consultationCtaText: 'Book Consultation',

  // Enquiry forms: the owner's "Client Onboarding Form" is an Interiors intake; there is no Construction form yet
  tallyInteriorsFormId: 'vGPYv8',
  tallyConstructionFormId: '',

  // Feature toggles
  showConsultationCta: true,
  portfolioEnabled: true,
};

/** The keys the Worker accepts for `config`; anything else is rejected. */
export const CONFIG_KEYS = Object.keys(defaultConfig) as (keyof SiteConfig)[];
