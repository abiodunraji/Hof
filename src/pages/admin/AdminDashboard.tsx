import { useState, useEffect, useCallback } from 'react';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { useAdminAuth, useSessionTimeout } from '../../hooks/useAdminAuth';
import { loadConfig, saveConfig, resetConfig } from '../../hooks/useSiteConfig';
import { defaultConfig, type SiteConfig } from '../../data/siteConfig';
import { ProjectsTab } from './ProjectsTab';

// ── Field components ──────────────────────────────────────────────────────────

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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

// ── Save banner ───────────────────────────────────────────────────────────────

function SaveBanner({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  if (!visible) return null;
  return (
    <div className="admin-save-banner">
      <span>Changes saved to browser storage.</span>
      <button type="button" onClick={onDismiss} className="admin-save-banner__dismiss">
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
  const [config, setConfig] = useState<SiteConfig>(() => loadConfig());
  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  useEffect(() => {
    const handler = () => setConfig(loadConfig());
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

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
  }, [resetTimer]);

  const update = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => { saveConfig(config); setSaved(true); };
  const handleReset = () => {
    resetConfig();
    setConfig(defaultConfig);
    setShowResetConfirm(false);
    setSaved(true);
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
            <button type="button" onClick={handleSave} className="admin-btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={() => logout()} className="admin-btn-ghost">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="admin-main">
        <Tabs defaultValue="contact">

          <TabsList>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* ── Contact ── */}
          <TabsContent value="contact">
            <div className="admin-panel">
              <div className="admin-panel__header">
                <h2 className="admin-panel__title">Contact Information</h2>
                <p className="admin-panel__subtitle">Displayed on the contact page and footer.</p>
              </div>
              <Separator />
              <div className="admin-field-grid-2 admin-panel-body">
                <Field label="Phone number" id="contactPhone" value={config.contactPhone}
                  onChange={(v) => update('contactPhone', v)} placeholder="+234 800 000 0000" type="tel" />
                <Field label="Email address" id="contactEmail" value={config.contactEmail}
                  onChange={(v) => update('contactEmail', v)} placeholder="hello@houseoffaridah.com" type="email" />
                <Field label="WhatsApp number" id="contactWhatsApp" value={config.contactWhatsApp}
                  onChange={(v) => update('contactWhatsApp', v)} placeholder="+234 800 000 0000" type="tel" />
                <Field label="Office address" id="contactAddress" value={config.contactAddress}
                  onChange={(v) => update('contactAddress', v)} placeholder="Lagos, Nigeria" />
              </div>
            </div>
          </TabsContent>

          {/* ── Social ── */}
          <TabsContent value="social">
            <div className="admin-panel">
              <div className="admin-panel__header">
                <h2 className="admin-panel__title">Social Media Links</h2>
                <p className="admin-panel__subtitle">Enter full URLs (e.g. https://instagram.com/yourhandle).</p>
              </div>
              <Separator />
              <div className="admin-field-grid-2 admin-panel-body">
                <Field label="Instagram" id="socialInstagram" value={config.socialInstagram}
                  onChange={(v) => update('socialInstagram', v)} placeholder="https://instagram.com/houseoffaridah" />
                <Field label="Facebook" id="socialFacebook" value={config.socialFacebook}
                  onChange={(v) => update('socialFacebook', v)} placeholder="https://facebook.com/houseoffaridah" />
                <Field label="LinkedIn" id="socialLinkedIn" value={config.socialLinkedIn}
                  onChange={(v) => update('socialLinkedIn', v)} placeholder="https://linkedin.com/company/houseoffaridah" />
                <Field label="Pinterest" id="socialPinterest" value={config.socialPinterest}
                  onChange={(v) => update('socialPinterest', v)} placeholder="https://pinterest.com/houseoffaridah" />
              </div>
            </div>
          </TabsContent>

          {/* ── Business ── */}
          <TabsContent value="business">
            <div className="admin-panel">
              <div className="admin-panel__header">
                <h2 className="admin-panel__title">Business Copy</h2>
                <p className="admin-panel__subtitle">Short texts used across the site.</p>
              </div>
              <Separator />
              <div className="admin-field-stack">
                <Field label="Interiors tagline" id="interiorsTagline" value={config.interiorsTagline}
                  onChange={(v) => update('interiorsTagline', v)} placeholder="Luxury interior design tailored to your lifestyle." />
                <Field label="Construction tagline" id="constructionTagline" value={config.constructionTagline}
                  onChange={(v) => update('constructionTagline', v)} placeholder="Building excellence, crafted with precision." />
                <Field label="Consultation CTA button text" id="consultationCtaText" value={config.consultationCtaText}
                  onChange={(v) => update('consultationCtaText', v)} placeholder="Book a Free Consultation" />
              </div>
            </div>
          </TabsContent>

          {/* ── Features ── */}
          <TabsContent value="features">
            <div className="admin-panel">
              <div className="admin-panel__header">
                <h2 className="admin-panel__title">Feature Toggles</h2>
                <p className="admin-panel__subtitle">Enable or disable site-wide features.</p>
              </div>
              <Separator />
              <div className="admin-toggle-stack">
                <ToggleField
                  label="Consultation CTA button"
                  description="Show the 'Book a Consultation' button in navigation."
                  checked={config.showConsultationCta}
                  onCheckedChange={(v) => update('showConsultationCta', v)}
                />
                <Separator />
                <ToggleField
                  label="WhatsApp floating button"
                  description="Show a floating WhatsApp chat button on all pages."
                  checked={config.showWhatsAppButton}
                  onCheckedChange={(v) => update('showWhatsAppButton', v)}
                />
                <Separator />
                <ToggleField
                  label="Portfolio section"
                  description="Show the portfolio / gallery section on the site."
                  checked={config.portfolioEnabled}
                  onCheckedChange={(v) => update('portfolioEnabled', v)}
                />
              </div>
            </div>
          </TabsContent>

          {/* ── Projects ── */}
          <TabsContent value="projects">
            <ProjectsTab onSaved={() => setSaved(true)} />
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
                <span className="admin-reset-confirm__prompt">Reset all settings to defaults?</span>
                <button type="button" onClick={handleReset} className="admin-text-btn admin-text-btn--danger">
                  Yes, reset
                </button>
                <button type="button" onClick={() => setShowResetConfirm(false)} className="admin-text-btn admin-text-btn--cancel">
                  Cancel
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={handleSave} className="admin-btn-primary">
            Save Changes
          </button>
        </div>

      </main>

      <SaveBanner visible={saved} onDismiss={() => setSaved(false)} />

      <SessionWarningBanner
        visible={showSessionWarning}
        onStay={handleStay}
        onSignOut={() => logout()}
      />
    </div>
  );
}
