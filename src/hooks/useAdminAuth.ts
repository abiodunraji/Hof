import { useState, useCallback, useEffect, useRef } from 'react';

const SESSION_KEY         = 'hofAdminAuth';
const SESSION_TS_KEY      = 'hofAdminAuthAt';
const PW_OVERRIDE_KEY     = 'hofAdminPwHash';   // localStorage override for password
const USERNAME_OVERRIDE_KEY = 'hofAdminUsername'; // localStorage override for username

/** 30-minute idle timeout; warn at 28 minutes. */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const SESSION_WARN_MS    = 28 * 60 * 1000;

/** Dispatched whenever admin is signed out (timeout or manual). */
const LOGOUT_EVENT = 'hofAdminLogout';

/**
 * Admin credentials — configure via .env.local (gitignored).
 * localStorage overrides (set via the Settings tab) take precedence over env vars.
 *
 * USERNAME  → VITE_ADMIN_USERNAME   (plaintext, case-insensitive)
 * PASSWORD  → VITE_ADMIN_PASSWORD_HASH  (SHA-256 hex)
 */
const ENV_USERNAME: string =
  (import.meta.env.VITE_ADMIN_USERNAME as string | undefined) ?? 'admin';

const ENV_PASSWORD_HASH: string =
  (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined) ??
  'eaee66ec5977653082e5193a25f9dfcbd46d14a56cd0563ae8b78fa4de3ae935';

export async function sha256hex(message: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(message),
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Returns the active expected username (localStorage override > env var). */
function getExpectedUsername(): string {
  return localStorage.getItem(USERNAME_OVERRIDE_KEY) ?? ENV_USERNAME;
}

/** Returns the active expected password hash (localStorage override > env var). */
function getExpectedPasswordHash(): string {
  return localStorage.getItem(PW_OVERRIDE_KEY) ?? ENV_PASSWORD_HASH;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_TS_KEY);
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === 'true',
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const logout = useCallback((reason?: string) => {
    clearSession();
    setIsAuthenticated(false);
    setError(reason ?? '');
    window.dispatchEvent(new CustomEvent(LOGOUT_EVENT));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const usernameMatch =
        username.trim().toLowerCase() === getExpectedUsername().trim().toLowerCase();
      const passwordHash = await sha256hex(password);
      const passwordMatch = passwordHash === getExpectedPasswordHash();

      if (usernameMatch && passwordMatch) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(SESSION_TS_KEY, Date.now().toString());
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, login, logout, error, loading };
}

/**
 * Verifies the current password and saves new credentials to localStorage.
 * Returns an error string on failure, or null on success.
 */
export async function changeCredentials({
  currentPassword,
  newUsername,
  newPassword,
}: {
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
}): Promise<string | null> {
  const currentHash = await sha256hex(currentPassword);
  if (currentHash !== getExpectedPasswordHash()) {
    return 'Current password is incorrect.';
  }

  if (newUsername) {
    const trimmed = newUsername.trim();
    if (trimmed.length < 3) return 'Username must be at least 3 characters.';
    localStorage.setItem(USERNAME_OVERRIDE_KEY, trimmed);
  }

  if (newPassword) {
    if (newPassword.length < 8) return 'New password must be at least 8 characters.';
    const newHash = await sha256hex(newPassword);
    localStorage.setItem(PW_OVERRIDE_KEY, newHash);
  }

  return null;
}

/** Returns the currently active username (what the admin logs in with). */
export function getActiveUsername(): string {
  return getExpectedUsername();
}

/**
 * Idle session timeout hook — call once inside the authenticated dashboard.
 */
export function useSessionTimeout({
  enabled,
  onWarn,
  onExpire,
}: {
  enabled: boolean;
  onWarn: () => void;
  onExpire: () => void;
}) {
  const warnTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expireTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onWarnRef   = useRef(onWarn);
  const onExpireRef = useRef(onExpire);

  useEffect(() => { onWarnRef.current   = onWarn;   }, [onWarn]);
  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);

  const resetTimer = useCallback(() => {
    if (warnTimer.current)   clearTimeout(warnTimer.current);
    if (expireTimer.current) clearTimeout(expireTimer.current);
    if (!enabled) return;

    warnTimer.current   = setTimeout(() => onWarnRef.current(),   SESSION_WARN_MS);
    expireTimer.current = setTimeout(() => onExpireRef.current(), SESSION_TIMEOUT_MS);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const EVENTS = ['mousemove', 'keydown', 'pointerdown', 'scroll'] as const;
    EVENTS.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, resetTimer));
      if (warnTimer.current)   clearTimeout(warnTimer.current);
      if (expireTimer.current) clearTimeout(expireTimer.current);
    };
  }, [enabled, resetTimer]);

  return { resetTimer };
}

export { LOGOUT_EVENT };
