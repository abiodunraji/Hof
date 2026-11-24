/**
 * Sends a contact / consultation form to the Worker, which stores it and emails it.
 * A success message may only be shown when this returns { ok: true }.
 */
import { apiFetch } from './api';
import type { SiteConfig } from '../data/siteConfig';

export type EnquirySource = 'interiors-contact' | 'construction-contact' | 'consultation-dialog';

export interface EnquiryPayload {
  source: EnquirySource;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceNeeded?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  /** The hidden honeypot field. Real visitors leave it empty. */
  website?: string;
}

export type EnquiryResult = { ok: true } | { ok: false; error: string };

/** Where the form's text goes wrong, in words the visitor can use. */
export function failureMessage(config: SiteConfig, serverError?: string, status?: number): string {
  if (status === 400 && serverError) return serverError;
  if (status === 429 && serverError) return serverError;
  return `We couldn't send your message. Please call ${config.contactPhone} or email ${config.contactEmail}.`;
}

export async function submitEnquiry(payload: EnquiryPayload, config: SiteConfig): Promise<EnquiryResult> {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string' && value !== '') clean[key] = value;
  }
  const res = await apiFetch<{ ok: boolean }>('/api/enquiry', { method: 'POST', body: clean, timeoutMs: 15000 });
  if (res.ok) return { ok: true };
  return { ok: false, error: failureMessage(config, res.error, res.status) };
}

/** Turns a form dropdown's stored value into the words the owner should read in the email. */
export function labelFor(labels: Record<string, string>, value: string): string {
  return labels[value] ?? value;
}

export const DIALOG_BUDGET_LABELS: Record<string, string> = {
  'under-1m': 'Under ₦1,000,000',
  '1m-3m': '₦1,000,000 - ₦3,000,000',
  '3m-5m': '₦3,000,000 - ₦5,000,000',
  '5m-10m': '₦5,000,000 - ₦10,000,000',
  'over-10m': 'Over ₦10,000,000',
};

export const DIALOG_TIMELINE_LABELS: Record<string, string> = {
  asap: 'As soon as possible',
  '1-3months': '1-3 months',
  '3-6months': '3-6 months',
  '6months+': '6+ months',
  planning: 'Just planning',
};

export const INTERIORS_PROJECT_TYPE_LABELS: Record<string, string> = {
  'full-home': 'Full Home Design',
  'room-makeover': 'Room Makeover',
  consultation: 'Design Consultation',
  'e-design': 'E-Design Services',
  styling: 'Styling & Staging',
  other: 'Other',
};

export const INTERIORS_TIMELINE_LABELS: Record<string, string> = {
  asap: 'As soon as possible',
  '1-3months': '1-3 months',
  '3-6months': '3-6 months',
  '6months-plus': '6+ months',
  flexible: 'Flexible',
};

/**
 * The Interiors contact form's budget dropdown uses the same naira bands as the pop-up. If the
 * options change, add the new values to DIALOG_BUDGET_LABELS; an unknown value is still sent as
 * it is, so nothing is lost.
 */
export const INTERIORS_BUDGET_LABELS = DIALOG_BUDGET_LABELS;
