import { useCallback, useEffect, useState } from 'react';
import { Separator } from '../../components/ui/separator';
import { adminFetch } from '../../hooks/useAdminAuth';

interface EnquiryRecord {
  id: string;
  receivedAt: string;
  source: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceNeeded?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  emailed?: boolean;
  emailError?: string;
}

const SOURCE_LABEL: Record<string, string> = {
  'interiors-contact': 'Interiors contact form',
  'construction-contact': 'Construction contact form',
  'consultation-dialog': 'Consultation request',
};

function when(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

/** Read-only list of every message the site's forms have received, newest first. */
export function EnquiriesTab() {
  const [items, setItems] = useState<EnquiryRecord[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (after: string | null) => {
    setLoading(true);
    setError('');
    const query = new URLSearchParams({ limit: '50' });
    if (after) query.set('cursor', after);
    const res = await adminFetch<{ items: EnquiryRecord[]; cursor: string | null }>(`/api/enquiries?${query}`);
    setLoading(false);
    if (!res.ok) {
      if (res.status !== 401) setError(res.error);
      return;
    }
    setItems((prev) => (after ? [...prev, ...res.data.items] : res.data.items));
    setCursor(res.data.cursor);
  }, []);

  useEffect(() => {
    void load(null);
  }, [load]);

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2 className="admin-panel__title">Enquiries</h2>
        <p className="admin-panel__subtitle">
          Every message sent through the site's forms, newest first. Each one is kept here even if its email did not arrive.
        </p>
      </div>
      <Separator />
      <div className="admin-panel-body">
        {error && <p className="admin-settings__error">Could not load the enquiries: {error}</p>}
        {!error && !loading && items.length === 0 && (
          <div className="admin-empty-state">No enquiries yet. Messages from the contact forms will appear here.</div>
        )}
        <div className="admin-enquiry-list">
          {items.map((e) => (
            <article key={e.id} className="admin-enquiry">
              <header className="admin-enquiry__head">
                <div>
                  <p className="admin-enquiry__name">{e.name}</p>
                  <p className="admin-enquiry__meta">
                    {when(e.receivedAt)} · {SOURCE_LABEL[e.source] ?? e.source}
                  </p>
                </div>
                <span
                  className={`admin-enquiry__badge${e.emailed ? '' : ' admin-enquiry__badge--warn'}`}
                  title={e.emailed ? 'Also sent to the owner by email' : e.emailError ?? 'Not emailed'}
                >
                  {e.emailed ? 'Emailed' : 'Not emailed'}
                </span>
              </header>
              <p className="admin-enquiry__contact">
                <a href={`mailto:${e.email}`}>{e.email}</a>
                {e.phone ? <> · <a href={`tel:${e.phone.replace(/\s+/g, '')}`}>{e.phone}</a></> : null}
              </p>
              {[e.company, e.serviceNeeded, e.projectType, e.budget, e.timeline].some(Boolean) && (
                <p className="admin-enquiry__details">
                  {[e.company, e.serviceNeeded, e.projectType, e.budget, e.timeline].filter(Boolean).join(' · ')}
                </p>
              )}
              {e.message && <p className="admin-enquiry__message">{e.message}</p>}
            </article>
          ))}
        </div>
        {loading && <p className="admin-panel__subtitle">Loading…</p>}
        {cursor && !loading && (
          <div style={{ marginTop: '1rem' }}>
            <button type="button" className="admin-btn-ghost" onClick={() => void load(cursor)}>
              Load older enquiries
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
