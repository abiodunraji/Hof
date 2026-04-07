import { useState, useCallback, useEffect, useRef } from 'react';

const SESSION_KEY       = 'hofAdminAuth';
const SESSION_TS_KEY    = 'hofAdminAuthAt';

/** 30-minute idle timeout; warn at 28 minutes. */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const SESSION_WARN_MS    = 28 * 60 * 1000;

/** Dispatched whenever admin is signed out (timeout or manual). */
const LOGOUT_EVENT = 'hofAdminLogout';

/**
 * Admin credentials — configure via .env.local (gitignored).
 *
 * USERNAME
 *   VITE_ADMIN_USERNAME   (plaintext, case-insensitive)
 *   Default: "admin"
 *
 * PASSWORD
 *   VITE_ADMIN_PASSWORD_HASH  (SHA-256 hex of your chosen password)
 *   Default password: "hofadmin2024"
 *   Default hash:      eaee66ec5977653082e5193a25f9dfcbd46d14a56cd0563ae8b78fa4de3ae935
 *
 * To generate a hash for a new password, paste this in your browser console:
 *   const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword'));
 *   console.log([...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join(''));
 */
const EXPECTED_USERNAME: string =
  (import.meta.env.VITE_ADMIN_USERNAME as string | undefined) ?? 'admin';

const EXPECTED_PASSWORD_HASH: string =
  (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined) ??
  'eaee66ec5977653082e5193a25f9dfcbd46d14a56cd0563ae8b78fa4de3ae935';

async function sha256hex(message: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(message),
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
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
    // Broadcast to all hook instances in this tab so ProtectedRoute navigates away
    window.dispatchEvent(new CustomEvent(LOGOUT_EVENT));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const usernameMatch =
        username.trim().toLowerCase() === EXPECTED_USERNAME.trim().toLowerCase();
      const passwordHash = await sha256hex(password);
      const passwordMatch = passwordHash === EXPECTED_PASSWORD_HASH;

      if (usernameMatch && passwordMatch) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(SESSION_TS_KEY, Date.now().toString());
        setIsAuthenticated(true);
      } else {
        // Deliberate: don't reveal which field was wrong
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
 * Idle session timeout — call once inside the authenticated dashboard.
 *
 * Resets idle timer on any user interaction. Fires `onWarn` at SESSION_WARN_MS
 * and `onExpire` at SESSION_TIMEOUT_MS.
 *
 * Returns `resetTimer` so the caller can defer expiry manually (e.g., on "Stay signed in").
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

  // Keep refs current so timers don't close over stale callbacks
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
    resetTimer(); // start immediately

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, resetTimer));
      if (warnTimer.current)   clearTimeout(warnTimer.current);
      if (expireTimer.current) clearTimeout(expireTimer.current);
    };
  }, [enabled, resetTimer]);

  return { resetTimer };
}

/** Name of the logout broadcast event — used by ProtectedRoute. */
export { LOGOUT_EVENT };
