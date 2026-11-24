import { useState } from 'react';
import { Separator } from '../../components/ui/separator';
import { adminFetch, storeSession } from '../../hooks/useAdminAuth';
import { CONFIG_KEYS } from '../../data/siteConfig';
import type { PortfolioStore, SiteContent } from '../../lib/content';
import type { ContentUpdate, SaveResult } from './types';

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2 className="admin-panel__title">{title}</h2>
        {subtitle && <p className="admin-panel__subtitle">{subtitle}</p>}
      </div>
      <Separator />
      <div className="admin-panel-body">
        {children}
      </div>
    </div>
  );
}

// ── Inline status message ─────────────────────────────────────────────────────

function StatusMsg({ type, text }: { type: 'success' | 'error'; text: string }) {
  return (
    <p className={type === 'success' ? 'admin-settings__success' : 'admin-settings__error'}>
      {text}
    </p>
  );
}

// ── Change password form ──────────────────────────────────────────────────────

function ChangePasswordForm() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async () => {
    setStatus(null);
    if (!currentPw) { setStatus({ type: 'error', text: 'Enter your current password.' }); return; }
    if (newPw.length < 10) { setStatus({ type: 'error', text: 'The new password must be at least 10 characters.' }); return; }
    if (newPw !== confirmPw) { setStatus({ type: 'error', text: 'The new passwords do not match.' }); return; }

    setLoading(true);
    const res = await adminFetch<{ ok: boolean; token: string; expiresAt: number }>('/api/password', {
      method: 'POST',
      body: { currentPassword: currentPw, newPassword: newPw },
    });
    setLoading(false);

    if (!res.ok) {
      setStatus({ type: 'error', text: res.error });
      return;
    }
    // Changing the password ends every older session; the Worker sends a fresh one so this tab stays signed in.
    storeSession(res.data.token, res.data.expiresAt);
    setStatus({ type: 'success', text: 'Password changed. Use the new one the next time you sign in.' });
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
  };

  return (
    <div className="admin-field-stack">
      <div className="admin-field">
        <label htmlFor="cred-current-pw">Current password <span className="admin-uploader__required">*</span></label>
        <input
          id="cred-current-pw"
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
          placeholder="Enter your current password"
          autoComplete="current-password"
        />
      </div>

      <div className="admin-field-grid-2">
        <div className="admin-field">
          <label htmlFor="cred-new-pw">New password</label>
          <input
            id="cred-new-pw"
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="At least 10 characters"
            autoComplete="new-password"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="cred-confirm-pw">Confirm new password</label>
          <input
            id="cred-confirm-pw"
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="Repeat new password"
            autoComplete="new-password"
          />
        </div>
      </div>

      {status && <StatusMsg type={status.type} text={status.text} />}

      <div>
        <button type="button" onClick={handleSubmit} disabled={loading} className="admin-btn-primary">
          {loading ? 'Saving…' : 'Change password'}
        </button>
      </div>
    </div>
  );
}

// ── Export / Import ───────────────────────────────────────────────────────────

const PORTFOLIO_KEYS: (keyof PortfolioStore)[] = ['interiors', 'construction', 'interiorsCategories', 'constructionCategories'];

/** Keeps only the parts of a backup file the Worker accepts (old backups carry settings that no longer exist). */
function readBackup(data: unknown): ContentUpdate | null {
  if (typeof data !== 'object' || data === null) return null;
  const raw = data as Record<string, unknown>;
  const update: ContentUpdate = {};

  const rawConfig = (raw.config ?? raw.siteConfig) as Record<string, unknown> | undefined;
  if (rawConfig && typeof rawConfig === 'object') {
    const config: Record<string, unknown> = {};
    for (const key of CONFIG_KEYS) if (key in rawConfig) config[key] = rawConfig[key];
    update.config = config as ContentUpdate['config'];
  }
  const rawPortfolio = raw.portfolio as Record<string, unknown> | undefined;
  if (rawPortfolio && typeof rawPortfolio === 'object') {
    const portfolio: Record<string, unknown> = {};
    for (const key of PORTFOLIO_KEYS) if (Array.isArray(rawPortfolio[key])) portfolio[key] = rawPortfolio[key];
    update.portfolio = portfolio as ContentUpdate['portfolio'];
  }
  return update.config || update.portfolio ? update : null;
}

function ExportImport({ content, onImport }: {
  content: SiteContent;
  onImport: (body: ContentUpdate) => Promise<SaveResult>;
}) {
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      config: content.config,
      portfolio: content.portfolio,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hof-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = async (ev) => {
      let update: ContentUpdate | null = null;
      try {
        update = readBackup(JSON.parse(ev.target?.result as string));
      } catch {
        update = null;
      }
      if (!update) {
        setImportStatus({ type: 'error', text: 'That is not a backup file from this panel.' });
        return;
      }
      const result = await onImport(update);
      setImportStatus(
        result.ok
          ? { type: 'success', text: 'Backup restored and saved to the site.' }
          : { type: 'error', text: `The backup was not saved: ${result.error}` },
      );
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-settings__export-row">
      <div className="admin-settings__export-item">
        <p className="admin-settings__export-title">Export backup</p>
        <p className="admin-settings__export-desc">Download the site's current settings and portfolio as a JSON file.</p>
        <button type="button" onClick={handleExport} className="admin-btn-ghost admin-settings__export-btn">
          Download backup
        </button>
      </div>

      <div className="admin-settings__export-item">
        <p className="admin-settings__export-title">Import backup</p>
        <p className="admin-settings__export-desc">Put the contents of a backup file back on the site. This replaces what is there now.</p>
        <label className="admin-btn-ghost admin-settings__export-btn admin-settings__import-label">
          Choose file
          <input type="file" accept=".json" className="admin-uploader__input" onChange={handleImport} />
        </label>
      </div>

      {importStatus && <StatusMsg type={importStatus.type} text={importStatus.text} />}
    </div>
  );
}

// ── Danger zone ───────────────────────────────────────────────────────────────

function DangerZone({ onResetAll }: { onResetAll: () => Promise<void> }) {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="admin-settings__danger-stack">
      <div className="admin-settings__danger-row">
        <div>
          <p className="admin-settings__danger-title">Reset all content to the built-in defaults</p>
          <p className="admin-settings__danger-desc">
            Removes every change saved on the site's server (contact details, links, texts and all edited
            projects). The site goes back to exactly what it was built with. Your password is kept.
          </p>
        </div>
        {confirm ? (
          <div className="admin-reset-confirm">
            <span className="admin-reset-confirm__prompt">This changes the live site. Sure?</span>
            <button
              type="button"
              onClick={() => { setConfirm(false); void onResetAll(); }}
              className="admin-text-btn admin-text-btn--danger"
            >
              Yes, reset
            </button>
            <button type="button" onClick={() => setConfirm(false)} className="admin-text-btn admin-text-btn--cancel">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirm(true)} className="admin-text-btn admin-text-btn--danger">
            Reset all content
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main exported tab ─────────────────────────────────────────────────────────

export function SettingsTab({ content, onImport, onResetAll }: {
  content: SiteContent;
  onImport: (body: ContentUpdate) => Promise<SaveResult>;
  onResetAll: () => Promise<void>;
}) {
  return (
    <div className="admin-field-stack">

      <Section
        title="Password"
        subtitle="Change the password used to sign in to this panel. It is checked on the server and is never stored in the site."
      >
        <ChangePasswordForm />
      </Section>

      <Section
        title="Backup & Restore"
        subtitle="Download what is on the site now, or put a previous backup back."
      >
        <ExportImport content={content} onImport={onImport} />
      </Section>

      <Section
        title="Danger Zone"
        subtitle="Irreversible actions — proceed with caution."
      >
        <DangerZone onResetAll={onResetAll} />
      </Section>

    </div>
  );
}
