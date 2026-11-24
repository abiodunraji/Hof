import { useState, useCallback, useEffect, useRef } from 'react';
import { apiFetch, type ApiOptions, type ApiResult } from '../lib/api';

/**
 * Owner sign-in. The username and password are checked by the Worker, never in the
 * browser: this file only holds the 30-minute session token the Worker hands back,
 * in sessionStorage (it disappears when the tab closes).
 */

const TOKEN_KEY = 'hofAdminToken';
const EXPIRES_KEY = 'hofAdminTokenExp';
const NOTICE_KEY = 'hofAdminNotice';

/** 30-minute idle timeout; warn at 28 minutes (matches the Worker's token life). */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const SESSION_WARN_MS = 28 * 60 * 1000;

/** Dispatched whenever the owner is signed out (timeout, manual, or the Worker said 401). */
const LOGOUT_EVENT = 'hofAdminLogout';

export function getToken(): string | null {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const exp = Number(sessionStorage.getItem(EXPIRES_KEY));
    if (!token || !Number.isFinite(exp) || exp <= Date.now()) return null;
    return token;
  } catch {
    return null;
  }
}

export function storeSession(token: string, expiresAt: number) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXPIRES_KEY, String(expiresAt));
  } catch {
    /* private mode: the owner just has to sign in again after a reload */
  }
}

function clearSession() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXPIRES_KEY);
  } catch {
    /* nothing to clear */
  }
}

/** A message to show once on the sign-in page (for example "Your session expired"). */
export function takeNotice(): string {
  try {
    const n = sessionStorage.getItem(NOTICE_KEY) ?? '';
    sessionStorage.removeItem(NOTICE_KEY);
    return n;
  } catch {
    return '';
  }
}

function endSession(reason?: string) {
  clearSession();
  try {
    if (reason) sessionStorage.setItem(NOTICE_KEY, reason);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(LOGOUT_EVENT));
}

/** Asks the Worker for a fresh 30 minute token. Called while the owner is active, so a long editing session is not cut off. */
export async function refreshSession(): Promise<void> {
  const token = getToken();
  if (!token) return;
  const res = await apiFetch<{ token: string; expiresAt: number }>('/api/refresh', { method: 'POST', token, fresh: true });
  if (res.ok) storeSession(res.data.token, res.data.expiresAt);
}

/**
 * A call to the Worker with the owner's token. If the Worker says the session is no longer
 * valid (401) the owner is signed out and sent back to the sign-in page.
 */
export async function adminFetch<T>(path: string, options: Omit<ApiOptions, 'token'> = {}): Promise<ApiResult<T>> {
  const token = getToken();
  if (!token) {
    endSession('Your session expired. Please sign in again.');
    return { ok: false, status: 401, error: 'Your session expired. Please sign in again.' };
  }
  const res = await apiFetch<T>(path, { ...options, token, fresh: true });
  if (!res.ok && res.status === 401) endSession('Your session expired. Please sign in again.');
  return res;
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getToken() !== null);
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
      const res = await apiFetch<{ token: string; expiresAt: number }>('/api/login', {
        method: 'POST',
        body: { username, password },
        fresh: true,
      });
      if (res.ok) {
        storeSession(res.data.token, res.data.expiresAt);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setError('Wrong username or password. Please try again.');
      } else {
        setError(res.error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, login, logout, error, loading };
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
  const warnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expireTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onWarnRef = useRef(onWarn);
  const onExpireRef = useRef(onExpire);

  useEffect(() => { onWarnRef.current = onWarn; }, [onWarn]);
  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);

  const resetTimer = useCallback(() => {
    if (warnTimer.current) clearTimeout(warnTimer.current);
    if (expireTimer.current) clearTimeout(expireTimer.current);
    if (!enabled) return;

    warnTimer.current = setTimeout(() => onWarnRef.current(), SESSION_WARN_MS);
    expireTimer.current = setTimeout(() => onExpireRef.current(), SESSION_TIMEOUT_MS);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const EVENTS = ['mousemove', 'keydown', 'pointerdown', 'scroll'] as const;
    EVENTS.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, resetTimer));
      if (warnTimer.current) clearTimeout(warnTimer.current);
      if (expireTimer.current) clearTimeout(expireTimer.current);
    };
  }, [enabled, resetTimer]);

  return { resetTimer };
}

export { LOGOUT_EVENT };
