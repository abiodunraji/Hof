import { useState } from 'react';
import { Separator } from '../../components/ui/separator';
import { changeCredentials, getActiveUsername } from '../../hooks/useAdminAuth';
import { loadConfig, saveConfig } from '../../hooks/useSiteConfig';
import { loadPortfolioStore, savePortfolioStore } from '../../hooks/usePortfolioData';

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

// ── Change credentials form ───────────────────────────────────────────────────

function ChangeCredentialsForm({ onSaved }: { onSaved: () => void }) {
  const [currentPw, setCurrentPw]   = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPw, setNewPw]           = useState('');
  const [confirmPw, setConfirmPw]   = useState('');
  const [loading, setLoading]       = useState(false);
  const [status, setStatus]         = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const activeUsername = getActiveUsername();

  const handleSubmit = async () => {
    setStatus(null);

    if (!currentPw) { setStatus({ type: 'error', text: 'Current password is required.' }); return; }
    if (!newUsername && !newPw) { setStatus({ type: 'error', text: 'Enter a new username, a new password, or both.' }); return; }
    if (newPw && newPw !== confirmPw) { setStatus({ type: 'error', text: 'New passwords do not match.' }); return; }

    setLoading(true);
    const err = await changeCredentials({
      currentPassword: currentPw,
      newUsername: newUsername || undefined,
      newPassword: newPw || undefined,
    });
    setLoading(false);

    if (err) {
      setStatus({ type: 'error', text: err });
    } else {
      setStatus({ type: 'success', text: 'Credentials updated. Changes take effect on next login.' });
      setCurrentPw(''); setNewUsername(''); setNewPw(''); setConfirmPw('');
      onSaved();
    }
  };

  return (
    <div className="admin-field-stack">
      {/* Current state */}
      <div className="admin-settings__current">
        <span className="admin-settings__current-label">Current username</span>
        <span className="admin-settings__current-value">{activeUsername}</span>
      </div>

      <Separator />

      {/* Current password — always required to authorise a change */}
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

      <Separator />

      {/* New username (optional) */}
      <div className="admin-field">
        <label htmlFor="cred-new-username">New username <span className="admin-settings__optional">(leave blank to keep current)</span></label>
        <input
          id="cred-new-username"
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder={activeUsername}
          autoComplete="username"
        />
      </div>

      {/* New password (optional) */}
      <div className="admin-field-grid-2">
        <div className="admin-field">
          <label htmlFor="cred-new-pw">New password <span className="admin-settings__optional">(leave blank to keep current)</span></label>
          <input
            id="cred-new-pw"
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="Min. 8 characters"
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
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="admin-btn-primary"
        >
          {loading ? 'Saving…' : 'Update credentials'}
        </button>
      </div>
    </div>
  );
}

// ── Export / Import ───────────────────────────────────────────────────────────

function ExportImport({ onSaved }: { onSaved: () => void }) {
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      siteConfig: loadConfig(),
      portfolio: loadPortfolioStore(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `hof-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.siteConfig) saveConfig(data.siteConfig);
        if (data.portfolio)  savePortfolioStore(data.portfolio);
        setImportStatus({ type: 'success', text: 'Backup restored successfully.' });
        onSaved();
      } catch {
        setImportStatus({ type: 'error', text: 'Invalid backup file. Please use a file exported from this panel.' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-settings__export-row">
      <div className="admin-settings__export-item">
        <p className="admin-settings__export-title">Export backup</p>
        <p className="admin-settings__export-desc">Download all settings and portfolio data as a JSON file.</p>
        <button type="button" onClick={handleExport} className="admin-btn-ghost admin-settings__export-btn">
          Download backup
        </button>
      </div>

      <div className="admin-settings__export-item">
        <p className="admin-settings__export-title">Import backup</p>
        <p className="admin-settings__export-desc">Restore settings from a previously exported backup file.</p>
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

function DangerZone({ onSaved }: { onSaved: () => void }) {
  const [confirm, setConfirm] = useState<'credentials' | 'allData' | null>(null);

  const resetCredentials = () => {
    localStorage.removeItem('hofAdminPwHash');
    localStorage.removeItem('hofAdminUsername');
    setConfirm(null);
    onSaved();
  };

  const clearAllData = () => {
    localStorage.removeItem('hofAdminConfig');
    localStorage.removeItem('hofAdminPortfolio');
    localStorage.removeItem('hofAdminPwHash');
    localStorage.removeItem('hofAdminUsername');
    setConfirm(null);
    onSaved();
  };

  return (
    <div className="admin-settings__danger-stack">

      {/* Reset credential overrides */}
      <div className="admin-settings__danger-row">
        <div>
          <p className="admin-settings__danger-title">Reset credentials to defaults</p>
          <p className="admin-settings__danger-desc">
            Removes any username / password changes made in this panel.
            The credentials set in your environment variables will apply again.
          </p>
        </div>
        {confirm === 'credentials' ? (
          <div className="admin-reset-confirm">
            <span className="admin-reset-confirm__prompt">Are you sure?</span>
            <button type="button" onClick={resetCredentials} className="admin-text-btn admin-text-btn--danger">Yes, reset</button>
            <button type="button" onClick={() => setConfirm(null)} className="admin-text-btn admin-text-btn--cancel">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirm('credentials')} className="admin-text-btn admin-text-btn--danger">
            Reset credentials
          </button>
        )}
      </div>

      <Separator />

      {/* Clear all data */}
      <div className="admin-settings__danger-row">
        <div>
          <p className="admin-settings__danger-title">Clear all admin data</p>
          <p className="admin-settings__danger-desc">
            Wipes all settings, portfolio edits, and credential overrides from this browser.
            The site will revert to its built-in defaults. This cannot be undone.
          </p>
        </div>
        {confirm === 'allData' ? (
          <div className="admin-reset-confirm">
            <span className="admin-reset-confirm__prompt">This will wipe everything. Sure?</span>
            <button type="button" onClick={clearAllData} className="admin-text-btn admin-text-btn--danger">Yes, clear all</button>
            <button type="button" onClick={() => setConfirm(null)} className="admin-text-btn admin-text-btn--cancel">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirm('allData')} className="admin-text-btn admin-text-btn--danger">
            Clear all data
          </button>
        )}
      </div>

    </div>
  );
}

// ── Main exported tab ─────────────────────────────────────────────────────────

export function SettingsTab({ onSaved }: { onSaved: () => void }) {
  return (
    <div className="admin-field-stack">

      <Section
        title="Login Credentials"
        subtitle="Change the username or password used to access this admin panel."
      >
        <ChangeCredentialsForm onSaved={onSaved} />
      </Section>

      <Section
        title="Backup & Restore"
        subtitle="Export all settings and portfolio data, or restore from a previous backup."
      >
        <ExportImport onSaved={onSaved} />
      </Section>

      <Section
        title="Danger Zone"
        subtitle="Irreversible actions — proceed with caution."
      >
        <DangerZone onSaved={onSaved} />
      </Section>

    </div>
  );
}
