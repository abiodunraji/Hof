/**
 * Strict validation. Anything not listed here is refused, so the stored
 * content can only ever have the shape the site expects.
 */
import { CONFIG_KEYS, defaultConfig, type SiteConfig } from '../../src/data/siteConfig';

export type Checked<T> = { ok: true; value: T } | { ok: false; error: string };

const fail = (error: string): { ok: false; error: string } => ({ ok: false, error });

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** https only: social links and image links must never be javascript:, data:, http: or protocol-relative. */
export function isHttpsUrl(s: string, max = 500): boolean {
  if (s.length === 0 || s.length > max || /\s/.test(s)) return false;
  try {
    const u = new URL(s);
    return u.protocol === 'https:' && u.hostname.length > 0 && !u.username && !u.password;
  } catch {
    return false;
  }
}

/** An image is either a full https link (Cloudinary) or a path on the site itself. */
export function isImageRef(s: string): boolean {
  if (s.startsWith('/')) {
    return s.length <= 500 && !s.startsWith('//') && !s.includes('..') && /^\/[^\s\\<>"']*$/.test(s);
  }
  return isHttpsUrl(s);
}

// ---------------------------------------------------------------- config

const CONFIG_LIMITS: Record<keyof SiteConfig, { max: number; min?: number }> = {
  contactPhone: { max: 80, min: 1 },
  contactEmail: { max: 200, min: 1 },
  contactAddress: { max: 400, min: 1 },
  socialInstagram: { max: 300 },
  socialFacebook: { max: 300 },
  socialLinkedIn: { max: 300 },
  interiorsTagline: { max: 500, min: 1 },
  constructionTagline: { max: 500, min: 1 },
  consultationCtaText: { max: 60, min: 1 },
  showConsultationCta: { max: 0 },
  portfolioEnabled: { max: 0 },
};

const SOCIAL_KEYS: (keyof SiteConfig)[] = ['socialInstagram', 'socialFacebook', 'socialLinkedIn'];

export function validateConfig(input: unknown): Checked<Partial<SiteConfig>> {
  if (!isPlainObject(input)) return fail('config must be an object');
  const out: Record<string, string | boolean> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!(CONFIG_KEYS as string[]).includes(key)) return fail(`config.${key} is not a setting`);
    const k = key as keyof SiteConfig;
    if (typeof defaultConfig[k] === 'boolean') {
      if (typeof value !== 'boolean') return fail(`config.${key} must be true or false`);
      out[key] = value;
      continue;
    }
    if (typeof value !== 'string') return fail(`config.${key} must be text`);
    const text = value.trim();
    const limit = CONFIG_LIMITS[k];
    if (text.length > limit.max) return fail(`config.${key} is too long (max ${limit.max})`);
    if (text.length < (limit.min ?? 0)) return fail(`config.${key} cannot be empty`);
    if (SOCIAL_KEYS.includes(k) && text !== '' && !isHttpsUrl(text, limit.max)) {
      return fail(`config.${key} must be a full https:// link`);
    }
    if (k === 'contactEmail' && !EMAIL.test(text)) return fail('config.contactEmail is not a valid email address');
    out[key] = text;
  }
  return { ok: true, value: out as Partial<SiteConfig> };
}

// ---------------------------------------------------------------- portfolio

export interface StoredPortfolio {
  interiors?: Project[];
  construction?: Project[];
  interiorsCategories?: string[];
  constructionCategories?: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description?: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  tags?: string[];
  highlights?: string[];
  location?: string;
  year?: string;
  budget?: string;
  duration?: string;
  size?: string;
  visible?: boolean;
}

const MAX_PROJECTS = 200;

const TEXT_FIELDS: Record<string, number> = {
  description: 2000,
  fullDescription: 10000,
  location: 100,
  year: 100,
  budget: 100,
  duration: 100,
  size: 100,
};

const PROJECT_KEYS = new Set(['id', 'title', 'category', 'image', 'gallery', 'tags', 'highlights', 'visible', ...Object.keys(TEXT_FIELDS)]);

function stringList(v: unknown, maxItems: number, maxLen: number, what: string): Checked<string[]> {
  if (!Array.isArray(v)) return fail(`${what} must be a list`);
  if (v.length > maxItems) return fail(`${what} has too many items (max ${maxItems})`);
  for (const item of v) {
    if (typeof item !== 'string' || item.length > maxLen) return fail(`${what} has an item that is not text or is too long`);
  }
  return { ok: true, value: v as string[] };
}

function validateProject(p: unknown, where: string): Checked<Project> {
  if (!isPlainObject(p)) return fail(`${where} must be an object`);
  for (const key of Object.keys(p)) {
    if (!PROJECT_KEYS.has(key)) return fail(`${where}.${key} is not a project field`);
  }
  if (typeof p.id !== 'number' || !Number.isSafeInteger(p.id)) return fail(`${where}.id must be a whole number`);
  if (typeof p.title !== 'string' || p.title.trim().length < 1 || p.title.length > 200) return fail(`${where}.title is required (max 200)`);
  if (typeof p.category !== 'string' || p.category.trim().length < 1 || p.category.length > 80) return fail(`${where}.category is required (max 80)`);
  if (typeof p.image !== 'string' || !isImageRef(p.image)) return fail(`${where}.image must be an https link or a path on the site`);
  for (const [field, max] of Object.entries(TEXT_FIELDS)) {
    const v = p[field];
    if (v !== undefined && (typeof v !== 'string' || v.length > max)) return fail(`${where}.${field} must be text (max ${max})`);
  }
  if (p.visible !== undefined && typeof p.visible !== 'boolean') return fail(`${where}.visible must be true or false`);
  if (p.gallery !== undefined) {
    const g = stringList(p.gallery, 60, 500, `${where}.gallery`);
    if (!g.ok) return g;
    if (!g.value.every(isImageRef)) return fail(`${where}.gallery has a link that is not https or a site path`);
  }
  if (p.tags !== undefined) {
    const t = stringList(p.tags, 30, 60, `${where}.tags`);
    if (!t.ok) return t;
  }
  if (p.highlights !== undefined) {
    const h = stringList(p.highlights, 30, 300, `${where}.highlights`);
    if (!h.ok) return h;
  }
  return { ok: true, value: p as unknown as Project };
}

export function validatePortfolio(input: unknown): Checked<StoredPortfolio> {
  if (!isPlainObject(input)) return fail('portfolio must be an object');
  const out: StoredPortfolio = {};
  for (const [key, value] of Object.entries(input)) {
    if (key === 'interiors' || key === 'construction') {
      if (!Array.isArray(value)) return fail(`portfolio.${key} must be a list`);
      if (value.length > MAX_PROJECTS) return fail(`portfolio.${key} has too many projects (max ${MAX_PROJECTS})`);
      const list: Project[] = [];
      for (let i = 0; i < value.length; i++) {
        const r = validateProject(value[i], `portfolio.${key}[${i}]`);
        if (!r.ok) return r;
        list.push(r.value);
      }
      out[key] = list;
    } else if (key === 'interiorsCategories' || key === 'constructionCategories') {
      const r = stringList(value, 30, 60, `portfolio.${key}`);
      if (!r.ok) return r;
      out[key] = r.value;
    } else {
      return fail(`portfolio.${key} is not allowed`);
    }
  }
  return { ok: true, value: out };
}

export interface ContentUpdate {
  config?: Partial<SiteConfig>;
  portfolio?: StoredPortfolio;
}

export function validateContentUpdate(input: unknown): Checked<ContentUpdate> {
  if (!isPlainObject(input)) return fail('The body must be an object.');
  const out: ContentUpdate = {};
  for (const key of Object.keys(input)) {
    if (key !== 'config' && key !== 'portfolio') return fail(`${key} is not allowed`);
  }
  if (input.config === undefined && input.portfolio === undefined) return fail('Nothing to save: send config and/or portfolio.');
  if (input.config !== undefined) {
    const r = validateConfig(input.config);
    if (!r.ok) return r;
    out.config = r.value;
  }
  if (input.portfolio !== undefined) {
    const r = validatePortfolio(input.portfolio);
    if (!r.ok) return r;
    out.portfolio = r.value;
  }
  return { ok: true, value: out };
}

// ---------------------------------------------------------------- enquiries

export const ENQUIRY_SOURCES = ['interiors-contact', 'construction-contact', 'consultation-dialog'] as const;
export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export interface Enquiry {
  source: EnquirySource;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceNeeded: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const ENQUIRY_LIMITS: Record<Exclude<keyof Enquiry, 'source'>, number> = {
  name: 120,
  email: 200,
  phone: 40,
  company: 200,
  serviceNeeded: 200,
  projectType: 200,
  budget: 200,
  timeline: 200,
  message: 5000,
};

export const HONEYPOT_FIELD = 'website';

/** Collapses anything that could break a mail header or a single-line field. */
const LINE_BREAKS = new RegExp('[\r\n\u2028\u2029\t]+', 'g');

export function oneLine(s: string): string {
  return s.replace(LINE_BREAKS, ' ').trim();
}

export function validateEnquiry(input: unknown): Checked<Enquiry> {
  if (!isPlainObject(input)) return fail('The body must be an object.');
  const allowed = new Set<string>(['source', HONEYPOT_FIELD, ...Object.keys(ENQUIRY_LIMITS)]);
  for (const key of Object.keys(input)) {
    if (!allowed.has(key)) return fail(`${key} is not allowed`);
  }
  if (typeof input.source !== 'string' || !(ENQUIRY_SOURCES as readonly string[]).includes(input.source)) {
    return fail('source is not recognised');
  }
  const out: Record<string, string> = { source: input.source };
  for (const [field, max] of Object.entries(ENQUIRY_LIMITS)) {
    const v = input[field];
    if (v === undefined || v === null) {
      out[field] = '';
      continue;
    }
    if (typeof v !== 'string') return fail(`${field} must be text`);
    if (v.length > max) return fail(`${field} is too long (max ${max})`);
    out[field] = field === 'message' ? v.trim() : oneLine(v);
  }
  if (out.name.length < 1) return fail('Please enter your name.');
  if (!EMAIL.test(out.email)) return fail('Please enter a valid email address.');
  return { ok: true, value: out as unknown as Enquiry };
}
