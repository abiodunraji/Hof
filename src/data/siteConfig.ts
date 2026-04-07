/**
 * Site Configuration
 *
 * Default values for site-wide settings the admin can override.
 * Overrides are stored in localStorage under the key "hofAdminConfig".
 *
 * To use config values in a page component:
 *   import { useSiteConfig } from '../hooks/useSiteConfig';
 *   const config = useSiteConfig();
 *   config.contactPhone   // e.g. "+234 ..."
 */

export interface SiteConfig {
  // Contact
  contactPhone: string;
  contactEmail: string;
  contactWhatsApp: string;
  contactAddress: string;

  // Social
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;
  socialPinterest: string;

  // Business
  interiorsTagline: string;
  constructionTagline: string;
  consultationCtaText: string;

  // Feature toggles
  showConsultationCta: boolean;
  showWhatsAppButton: boolean;
  portfolioEnabled: boolean;
}

export const defaultConfig: SiteConfig = {
  // Contact
  contactPhone: '',
  contactEmail: '',
  contactWhatsApp: '',
  contactAddress: '',

  // Social
  socialInstagram: '',
  socialFacebook: '',
  socialLinkedIn: '',
  socialPinterest: '',

  // Business
  interiorsTagline: 'Luxury interior design tailored to your lifestyle.',
  constructionTagline: 'Building excellence, crafted with precision.',
  consultationCtaText: 'Book a Free Consultation',

  // Feature toggles
  showConsultationCta: true,
  showWhatsAppButton: false,
  portfolioEnabled: true,
};

export const STORAGE_KEY = 'hofAdminConfig';
