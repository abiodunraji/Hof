/**
 * Emails an enquiry to the owner.
 *
 * Provider-agnostic on purpose: `sendEnquiryEmail` is the only function the
 * rest of the Worker calls. Today it talks to Resend's REST API; to change
 * provider, change this file only. When the settings are missing it reports
 * `not configured` and the enquiry is still kept in KV.
 */
import type { Env } from './types';
import { oneLine, type Enquiry } from './validate';

export interface EmailResult {
  sent: boolean;
  error?: string;
}

const SOURCE_LABEL: Record<Enquiry['source'], string> = {
  'interiors-contact': 'Interiors contact form',
  'construction-contact': 'Construction contact form',
  'consultation-dialog': 'Consultation request',
};

function recipients(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function emailConfigured(env: Env): boolean {
  return !!env.RESEND_API_KEY && recipients(env.ENQUIRY_TO).length > 0 && !!env.ENQUIRY_FROM;
}

export function formatEnquiryText(e: Enquiry, receivedAt: string): string {
  const rows: [string, string][] = [
    ['Name', e.name],
    ['Email', e.email],
    ['Phone', e.phone],
    ['Company', e.company],
    ['Service', e.serviceNeeded],
    ['Project type', e.projectType],
    ['Budget', e.budget],
    ['Timeline', e.timeline],
  ];
  const lines = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  return [
    `New enquiry from the House of Faridah website (${SOURCE_LABEL[e.source]}).`,
    '',
    ...lines,
    '',
    'Message:',
    e.message || '(no message)',
    '',
    `Received: ${receivedAt}`,
    'Reply to this email to answer the sender directly.',
  ].join('\n');
}

export async function sendEnquiryEmail(env: Env, enquiry: Enquiry, receivedAt: string): Promise<EmailResult> {
  if (!emailConfigured(env)) return { sent: false, error: 'Email is not configured on the Worker.' };
  const base = (env.RESEND_API_BASE || 'https://api.resend.com').replace(/\/+$/, '');
  try {
    const res = await fetch(`${base}/emails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.ENQUIRY_FROM,
        to: recipients(env.ENQUIRY_TO),
        reply_to: enquiry.email,
        subject: oneLine(`New enquiry: ${enquiry.name} (${SOURCE_LABEL[enquiry.source]})`).slice(0, 200),
        text: formatEnquiryText(enquiry, receivedAt),
      }),
    });
    if (!res.ok) return { sent: false, error: `The email provider answered ${res.status}.` };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: `The email provider could not be reached: ${err instanceof Error ? err.message : 'unknown error'}` };
  }
}
