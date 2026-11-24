import { useState, useEffect, useCallback, useRef } from 'react';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { useAdminAuth, useSessionTimeout, adminFetch, refreshSession } from '../../hooks/useAdminAuth';
import { defaultConfig, type SiteConfig } from '../../data/siteConfig';
import { mergeContent, setContent, type ContentResponse, type SiteContent } from '../../lib/content';
import { ProjectsTab } from './ProjectsTab';
import { SettingsTab } from './SettingsTab';
import { EnquiriesTab } from './EnquiriesTab';
import type { ContentUpdate, Notify, SaveResult } from './types';

// ── Field components ──────────────────────────────────────────────────────────

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}) {
  return (
    <div className="admin-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {hint && <p className="admin-field__hint">{hint}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  id,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <div className="admin-field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} rows={rows} onChange={(e) => onChange(e.target.value)} />
      {hint && <p className="admin-field__hint">{hint}</p>}
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="admin-toggle">
      <div className="admin-toggle__copy">
        <p className="admin-toggle__label">{label}</p>
        {description && <p className="admin-toggle__desc">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

// ── Result banner ─────────────────────────────────────────────────────────────

interface Banner {
  kind: 'success' | 'error';
  text: string;
}

function ResultBanner({ banner, onDismiss }: { banner: Banner | null; onDismiss: () => void }) {
  if (!banner) return null;
  return (
    <div
      className={`admin-save-banner${banner.kind === 'error' ? ' admin-save-banner--error' : ''}`}
      role={banner.kind === 'error' ? 'alert' : 'status'}
    >
      <span>{banner.text}</span>
      <button type="button" onClick={onDismiss} className="admin-save-banner__dismiss" aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

// ── Session timeout warning ───────────────────────────────────────────────────

function SessionWarningBanner({
  visible,
  onStay,
  onSignOut,
}: {
  visible: boolean;
  onStay: () => void;
  onSignOut: () => void;
}) {
  if (!visible) return null;
  return (
    <div className="admin-session-warning">
      <span className="admin-session-warning__text">
        Your session will expire in 2 minutes due to inactivity.
      </span>
      <div className="admin-session-warning__actions">
        <button type="button" onClick={onStay} className="admin-session-warning__stay">
          Stay signed in
        </button>
        <button type="button" onClick={onSignOut} className="admin-session-warning__out">
          Sign out now
        </button>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const { logout } = useAdminAuth();
  // What the Worker holds right now. Null until it has been read: the panel never edits
  // a guess (saving the built-in defaults over real content would be worse than waiting).
  const [content, setContentState] = useState<SiteContent | null>(null);
  const contentRef = useRef<SiteContent | null>(null);
  contentRef.current = content;
  const [loadError, setLoadError] = useState('');
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [saving, setSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  const notify: Notify = useCallback((kind, text) => setBanner({ kind, text }), []);

  const loadFromServer = useCallback(async () => {
    setLoadError('');
    const res = await adminFetch<ContentResponse>('/api/content');
    if (res.ok) {
      const merged = mergeContent(res.data);
      setContentState(merged);
      setConfig(merged.config);
    } else if (res.status !== 401) {
      setLoadError(res.error);
    }
  }, []);

  useEffect(() => {
    void loadFromServer();
  }, [loadFromServer]);

  const handleExpire = useCallback(() => {
    setShowSessionWarning(false);
    logout('Your session expired due to inactivity.');
  }, [logout]);

  const handleWarn = useCallback(() => {
    setShowSessionWarning(true);
  }, []);

  const { resetTimer } = useSessionTimeout({
    enabled: true,
    onWarn: handleWarn,
    onExpire: handleExpire,
  });

  const handleStay = useCallback(() => {
    setShowSessionWarning(false);
    resetTimer();
    void refreshSession();
  }, [resetTimer]);

  // While the owner is working (clicking or typing), renew the 30 minute server session every 5 minutes.
  useEffect(() => {
    let lastActive = Date.now();
    let lastRefresh = Date.now();
    const mark = () => { lastActive = Date.now(); };
    window.addEventListener('pointerdown', mark, { passive: true });
    window.addEventListener('keydown', mark, { passive: true });
    const timer = setInterval(() => {
      if (lastActive > lastRefresh) {
        lastRefresh = Date.now();
        void refreshSession();
      }
    }, 5 * 60 * 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('pointerdown', mark);
      window.removeEventListener('keydown', mark);
    };
  }, []);

  const update = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  /** The one way anything is saved: PUT /api/content, then show the real result. */
  const saveToServer = useCallback(
    async (body: ContentUpdate): Promise<SaveResult> => {
      const res = await adminFetch<{ ok: boolean; updatedAt: string }>('/api/content', { method: 'PUT', body });
      if (!res.ok) {
        notify('error', `Not saved: ${res.error}`);
        return { ok: false, error: res.error };
      }
      // Keep the panel (and any open site tab) in step with what the Worker now holds.
      const prev = contentRef.current;
      if (prev) {
        const next: SiteContent = {
          config: { ...prev.config, ...(body.config ?? {}) },
          portfolio: { ...prev.portfolio, ...(body.portfolio ?? {}) },
        };
        contentRef.current = next;
        setContentState(next);
        setContent(next);
      }
      notify('success', 'Saved. Visitors will see this within about 30 seconds.');
      return { ok: true };
    },
    [notify],
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveToServer({ config });
    } finally {
      setSaving(false);
    }
  };

  const resetAll = async () => {
    setShowResetConfirm(false);
    const res = await adminFetch<{ ok: boolean }>('/api/content', { method: 'DELETE' });
    if (!res.ok) {
      notify('error', `Not reset: ${res.error}`);
      return;
    }
    const merged = mergeContent(null);
    setContentState(merged);
    setConfig(merged.config);
    setContent(null);
    notify('success', 'Everything is back to the built-in content.');
  };

  const importBackup = async (body: ContentUpdate): Promise<SaveResult> => {
    const result = await saveToServer(body);
    if (result.ok) await loadFromServer();
    return result;
  };

  return (
    <div className="admin-layout">

      {/* ── Header ── */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-header__brand">
            <p className="admin-header__eyebrow">House of Faridah</p>
            <h1 className="admin-header__title">Admin Panel</h1>
          </div>
          <div className="admin-header__actions">
            <button type="button" onClick={handleSave} disabled={!content || saving} className="admin-btn-primary">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => logout()} className="admin-btn-ghost">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="admin-main">
        {!content ? (
          <div className="admin-panel">
            <div className="admin-panel-body">
              {loadError ? (
                <>
                  <p className="admin-settings__error">
                    The panel could not read the site's saved content: {loadError} Nothing has been changed.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <button type="button" onClick={() => void loadFromServer()} className="admin-btn-primary">
                      Try again
                    </button>
                  </div>
                </>
              ) : (
                <p className="admin-panel__subtitle">Loading the site's saved content…</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="contact">

              <TabsList>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* ── Contact ── */}
              <TabsContent value="contact">
                <div className="admin-panel">
                  <div className="admin-panel__header">
                    <h2 className="admin-panel__title">Contact Information</h2>
                    <p className="admin-panel__subtitle">
                      Shown on both contact pages and in the HOF Construction footer.
                    </p>
                  </div>
                  <Separator />
                  <div className="admin-field-grid-2 admin-panel-body">
                    <Field label="Phone number" id="contactPhone" value={config.contactPhone}
                      onChange={(v) => update('contactPhone', v)} placeholder="09039330335 / 07040654539" type="tel"
                      hint="For two numbers, write them with a slash between: 0903… / 0704…" />
                    <Field label="Email address" id="contactEmail" value={config.contactEmail}
                      onChange={(v) => update('contactEmail', v)} placeholder="name@example.com" type="email" />
                    <TextAreaField label="Office address" id="contactAddress" value={config.contactAddress}
                      onChange={(v) => update('contactAddress', v)}
                      hint="One line per row, exactly as it should read." />
                  </div>
                </div>
              </TabsContent>

              {/* ── Social ── */}
              <TabsContent value="social">
                <div className="admin-panel">
                  <div className="admin-panel__header">
                    <h2 className="admin-panel__title">Social Media Links</h2>
                    <p className="admin-panel__subtitle">
                      Full links that start with https:// . Leave one empty to hide its icon.
                    </p>
                  </div>
                  <Separator />
                  <div className="admin-field-grid-2 admin-panel-body">
                    <Field label="Instagram" id="socialInstagram" value={config.socialInstagram}
                      onChange={(v) => update('socialInstagram', v)} placeholder="https://instagram.com/yourhandle" />
                    <Field label="Facebook" id="socialFacebook" value={config.socialFacebook}
                      onChange={(v) => update('socialFacebook', v)} placeholder="https://facebook.com/yourpage" />
                    <Field label="LinkedIn" id="socialLinkedIn" value={config.socialLinkedIn}
                      onChange={(v) => update('socialLinkedIn', v)} placeholder="https://linkedin.com/company/yourpage" />
                  </div>
                </div>
              </TabsContent>

              {/* ── Business ── */}
              <TabsContent value="business">
                <div className="admin-panel">
                  <div className="admin-panel__header">
                    <h2 className="admin-panel__title">Business Copy</h2>
                    <p className="admin-panel__subtitle">Short texts shown in the footers and on the contact page.</p>
                  </div>
                  <Separator />
                  <div className="admin-field-stack">
                    <TextAreaField label="Interiors footer text" id="interiorsTagline" value={config.interiorsTagline}
                      onChange={(v) => update('interiorsTagline', v)}
                      hint="The paragraph under “House of Faridah” in the Interiors footer." />
                    <TextAreaField label="Construction footer text" id="constructionTagline" value={config.constructionTagline}
                      onChange={(v) => update('constructionTagline', v)}
                      hint="The paragraph under “HOF Construction” in the Construction footer." />
                    <Field label="Consultation button text" id="consultationCtaText" value={config.consultationCtaText}
                      onChange={(v) => update('consultationCtaText', v)} placeholder="Book Consultation"
                      hint="The button on the Interiors contact page that opens the consultation form." />
                  </div>
                </div>
              </TabsContent>

              {/* ── Features ── */}
              <TabsContent value="features">
                <div className="admin-panel">
                  <div className="admin-panel__header">
                    <h2 className="admin-panel__title">Feature Toggles</h2>
                    <p className="admin-panel__subtitle">Switch parts of the site on or off.</p>
                  </div>
                  <Separator />
                  <div className="admin-toggle-stack">
                    <ToggleField
                      label="Complimentary consultation card"
                      description="The pink “Complimentary Consultation” card with its booking button on the Interiors contact page."
                      checked={config.showConsultationCta}
                      onCheckedChange={(v) => update('showConsultationCta', v)}
                    />
                    <Separator />
                    <ToggleField
                      label="Portfolio links"
                      description="The Portfolio link in both menus and in the Interiors footer. The pages stay reachable by their address."
                      checked={config.portfolioEnabled}
                      onCheckedChange={(v) => update('portfolioEnabled', v)}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* ── Projects ── */}
              <TabsContent value="projects">
                <ProjectsTab portfolio={content.portfolio} onSavePortfolio={(portfolio) => saveToServer({ portfolio })} />
              </TabsContent>

              {/* ── Enquiries ── */}
              <TabsContent value="enquiries">
                <EnquiriesTab />
              </TabsContent>

              {/* ── Settings ── */}
              <TabsContent value="settings">
                <SettingsTab content={content} onImport={importBackup} onResetAll={resetAll} />
              </TabsContent>

            </Tabs>

            {/* Save + reset row */}
            <div className="admin-footer-actions">
              <div>
                {!showResetConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="admin-text-btn admin-text-btn--faint"
                  >
                    Reset all to defaults
                  </button>
                ) : (
                  <div className="admin-reset-confirm">
                    <span className="admin-reset-confirm__prompt">Reset all content to the built-in defaults?</span>
                    <button type="button" onClick={() => void resetAll()} className="admin-text-btn admin-text-btn--danger">
                      Yes, reset
                    </button>
                    <button type="button" onClick={() => setShowResetConfirm(false)} className="admin-text-btn admin-text-btn--cancel">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </>
        )}
      </main>

      <ResultBanner banner={banner} onDismiss={() => setBanner(null)} />

      <SessionWarningBanner
        visible={showSessionWarning}
        onStay={handleStay}
        onSignOut={() => logout()}
      />
    </div>
  );
}
