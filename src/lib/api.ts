/**
 * Talks to the content Worker (see worker/).
 *
 * `apiFetch` never throws: every outcome is a plain `{ ok, status, data | error }`
 * so a down or unconfigured server can never break a page render.
 */

/** Set at build time (GitHub variable VITE_API_BASE). Empty = the site is not connected to a Worker. */
export const API_BASE: string = ((import.meta.env.VITE_API_BASE as string | undefined) ?? '').trim().replace(/\/+$/, '');

export const apiConfigured = API_BASE !== '';

export type ApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: string };

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  /** Owner session token (sent as a Bearer header). */
  token?: string | null;
  timeoutMs?: number;
  /** Skip the browser cache (the admin panel always wants the latest). */
  fresh?: boolean;
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<ApiResult<T>> {
  if (!apiConfigured) {
    return { ok: false, status: 0, error: 'The site is not connected to its server yet.' };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 10000);
  try {
    const headers: Record<string, string> = {};
    if (options.body !== undefined) headers['Content-Type'] = 'application/json';
    if (options.token) headers.Authorization = `Bearer ${options.token}`;
    const res = await fetch(`${API_BASE}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: options.fresh ? 'no-store' : 'default',
      signal: controller.signal,
    });
    let payload: unknown = null;
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }
    if (!res.ok) {
      const message =
        payload && typeof payload === 'object' && 'error' in payload && typeof (payload as { error: unknown }).error === 'string'
          ? (payload as { error: string }).error
          : `The server answered ${res.status}.`;
      return { ok: false, status: res.status, error: message };
    }
    return { ok: true, status: res.status, data: payload as T };
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === 'AbortError';
    return {
      ok: false,
      status: 0,
      error: timedOut ? 'The server took too long to answer.' : 'Could not reach the server. Check the internet connection.',
    };
  } finally {
    clearTimeout(timer);
  }
}
