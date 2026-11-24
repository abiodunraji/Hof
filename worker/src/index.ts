/**
 * House of Faridah content Worker.
 *
 *   GET    /api/content     public  the saved settings and portfolio (cached 30 s)
 *   PUT    /api/content     owner   save settings and/or portfolio
 *   DELETE /api/content     owner   reset to the site's built-in defaults
 *   POST   /api/login       public  username + password -> 30 minute session token
 *   POST   /api/refresh     owner   a fresh 30 minute token (the panel calls it while the owner is active)
 *   POST   /api/password    owner   change the password (ends older sessions)
 *   POST   /api/enquiry     public  a contact / consultation form; stored, then emailed
 *   GET    /api/enquiries   owner   the stored enquiries, newest first
 *
 * Everything lives in one KV namespace (binding CONTENT):
 *   content:v1            saved settings + portfolio
 *   auth:password         a password hash set from the panel (beats the secret)
 *   enquiry:<n>-<rand>    one enquiry (n counts down so a plain list is newest first)
 *   rl:login:*, rl:enq:*  per-IP counters that expire on their own
 */
import {
  authConfigured,
  bumpCount,
  clientKey,
  effectiveHash,
  hashPassword,
  issueToken,
  PASSWORD_KEY,
  readCount,
  requireSession,
  usernameMatches,
  verifyPassword,
} from './auth';
import { sendEnquiryEmail } from './email';
import { corsHeaders, errorResponse, json, originAllowed, readJson } from './http';
import type { Env } from './types';
import { defaultConfig } from '../../src/data/siteConfig';
import { HONEYPOT_FIELD, validateContentUpdate, validateEnquiry, type StoredPortfolio } from './validate';
import type { SiteConfig } from '../../src/data/siteConfig';

const CONTENT_KEY = 'content:v1';
const MAX_CONTENT_BYTES = 512 * 1024;
const MAX_ENQUIRY_BYTES = 20 * 1024;
const MAX_LOGIN_BYTES = 4 * 1024;

const LOGIN_MAX_FAILURES = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60;
const ENQUIRY_MAX_PER_WINDOW = 5;
const ENQUIRY_WINDOW_SECONDS = 10 * 60;

interface StoredContent {
  config?: Partial<SiteConfig>;
  portfolio?: StoredPortfolio;
  updatedAt?: string;
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

async function loadContent(env: Env): Promise<StoredContent | null> {
  return (await env.CONTENT.get(CONTENT_KEY, 'json')) as StoredContent | null;
}

// ---------------------------------------------------------------- handlers

async function getContent(env: Env): Promise<Response> {
  const stored = await loadContent(env);
  return json(
    {
      config: { ...defaultConfig, ...(stored?.config ?? {}) },
      portfolio: stored?.portfolio ?? null,
      updatedAt: stored?.updatedAt ?? null,
    },
    200,
    { 'Cache-Control': 'public, max-age=30' },
  );
}

async function putContent(req: Request, env: Env): Promise<Response> {
  const denied = await requireSession(req, env);
  if (denied) return denied;
  const body = await readJson(req, MAX_CONTENT_BYTES);
  if (!body.ok) return body.response;
  const update = validateContentUpdate(body.value);
  if (!update.ok) return errorResponse(400, update.error);

  const stored = (await loadContent(env)) ?? {};
  const next: StoredContent = {
    config: { ...(stored.config ?? {}), ...(update.value.config ?? {}) },
    portfolio: update.value.portfolio ? { ...(stored.portfolio ?? {}), ...update.value.portfolio } : stored.portfolio,
    updatedAt: new Date().toISOString(),
  };
  if (!next.portfolio) delete next.portfolio;
  await env.CONTENT.put(CONTENT_KEY, JSON.stringify(next));
  return json({ ok: true, updatedAt: next.updatedAt });
}

async function deleteContent(req: Request, env: Env): Promise<Response> {
  const denied = await requireSession(req, env);
  if (denied) return denied;
  await env.CONTENT.delete(CONTENT_KEY);
  return json({ ok: true });
}

async function login(req: Request, env: Env): Promise<Response> {
  if (!(await authConfigured(env))) return errorResponse(503, 'Sign-in is not set up on the server yet.');
  const limitKey = `rl:login:${await clientKey(env, req)}`;
  if ((await readCount(env, limitKey)) >= LOGIN_MAX_FAILURES) {
    return errorResponse(429, 'Too many wrong attempts. Try again in 15 minutes.', { 'Retry-After': String(LOGIN_WINDOW_SECONDS) });
  }
  const body = await readJson(req, MAX_LOGIN_BYTES);
  if (!body.ok) return body.response;
  const { username, password } = isObject(body.value) ? body.value : ({} as Record<string, unknown>);
  if (typeof username !== 'string' || typeof password !== 'string' || username.length > 200 || password.length > 500) {
    return errorResponse(400, 'Send a username and a password.');
  }
  // Always do the expensive hash work, so a wrong username is not faster than a wrong password.
  const passwordOk = await verifyPassword(password, (await effectiveHash(env)) ?? '');
  const userOk = usernameMatches(username, env.ADMIN_USERNAME ?? '');
  if (!(passwordOk && userOk)) {
    await bumpCount(env, limitKey, LOGIN_WINDOW_SECONDS);
    return errorResponse(401, 'Wrong username or password.');
  }
  await env.CONTENT.delete(limitKey);
  return json(await issueToken(env));
}

async function refresh(req: Request, env: Env): Promise<Response> {
  const denied = await requireSession(req, env);
  if (denied) return denied;
  return json(await issueToken(env));
}

async function changePassword(req: Request, env: Env): Promise<Response> {
  const denied = await requireSession(req, env);
  if (denied) return denied;
  const limitKey = `rl:login:${await clientKey(env, req)}`;
  if ((await readCount(env, limitKey)) >= LOGIN_MAX_FAILURES) {
    return errorResponse(429, 'Too many wrong attempts. Try again in 15 minutes.', { 'Retry-After': String(LOGIN_WINDOW_SECONDS) });
  }
  const body = await readJson(req, MAX_LOGIN_BYTES);
  if (!body.ok) return body.response;
  const { currentPassword, newPassword } = isObject(body.value) ? body.value : ({} as Record<string, unknown>);
  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
    return errorResponse(400, 'Send the current password and the new one.');
  }
  if (newPassword.length < 10 || newPassword.length > 200) {
    return errorResponse(400, 'The new password must be 10 to 200 characters.');
  }
  if (!(await verifyPassword(currentPassword, (await effectiveHash(env)) ?? ''))) {
    await bumpCount(env, limitKey, LOGIN_WINDOW_SECONDS);
    return errorResponse(403, 'The current password is not right.');
  }
  await env.CONTENT.put(PASSWORD_KEY, await hashPassword(newPassword));
  await env.CONTENT.delete(limitKey);
  return json({ ok: true, ...(await issueToken(env)) });
}

async function postEnquiry(req: Request, env: Env): Promise<Response> {
  const body = await readJson(req, MAX_ENQUIRY_BYTES);
  if (!body.ok) return body.response;

  // Bots fill the hidden field; people never see it. Look like success, keep nothing.
  if (isObject(body.value) && typeof body.value[HONEYPOT_FIELD] === 'string' && body.value[HONEYPOT_FIELD].trim() !== '') {
    return json({ ok: true });
  }

  const enquiry = validateEnquiry(body.value);
  if (!enquiry.ok) return errorResponse(400, enquiry.error);

  const limitKey = `rl:enq:${await clientKey(env, req)}`;
  if ((await readCount(env, limitKey)) >= ENQUIRY_MAX_PER_WINDOW) {
    return errorResponse(429, 'Too many messages from this connection. Please call us instead.', {
      'Retry-After': String(ENQUIRY_WINDOW_SECONDS),
    });
  }
  await bumpCount(env, limitKey, ENQUIRY_WINDOW_SECONDS);

  const now = Date.now();
  const receivedAt = new Date(now).toISOString();
  const rand = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
  // The number counts down, so listing keys in order gives the newest enquiry first.
  const id = `${String(9999999999999 - now).padStart(13, '0')}-${rand}`;
  const key = `enquiry:${id}`;
  const record: Record<string, unknown> = { id, receivedAt, ...enquiry.value, emailed: false };

  // Store BEFORE emailing: whatever happens next, the enquiry is not lost.
  await env.CONTENT.put(key, JSON.stringify(record));

  const mail = await sendEnquiryEmail(env, enquiry.value, receivedAt);
  record.emailed = mail.sent;
  if (!mail.sent) record.emailError = mail.error ?? 'unknown error';
  try {
    await env.CONTENT.put(key, JSON.stringify(record));
  } catch {
    // the enquiry itself is already stored; only its "emailed" flag is stale
  }
  return json({ ok: true, id, emailed: mail.sent });
}

async function listEnquiries(req: Request, env: Env, url: URL): Promise<Response> {
  const denied = await requireSession(req, env);
  if (denied) return denied;
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit')) || 50));
  const cursor = url.searchParams.get('cursor') || undefined;
  const page = await env.CONTENT.list({ prefix: 'enquiry:', limit, cursor });
  const items = await Promise.all(page.keys.map((k) => env.CONTENT.get(k.name, 'json')));
  return json({
    items: items.filter((i) => i !== null),
    cursor: page.list_complete ? null : (page as { cursor?: string }).cursor ?? null,
  });
}

// ---------------------------------------------------------------- router

async function route(req: Request, env: Env, url: URL): Promise<Response> {
  const method = req.method;
  if (method === 'OPTIONS') return new Response(null, { status: 204 });

  switch (url.pathname) {
    case '/api/content':
      if (method === 'GET') return getContent(env);
      if (method === 'PUT') return putContent(req, env);
      if (method === 'DELETE') return deleteContent(req, env);
      return errorResponse(405, 'Method not allowed.', { Allow: 'GET, PUT, DELETE, OPTIONS' });
    case '/api/login':
      return method === 'POST' ? login(req, env) : errorResponse(405, 'Method not allowed.', { Allow: 'POST, OPTIONS' });
    case '/api/refresh':
      return method === 'POST' ? refresh(req, env) : errorResponse(405, 'Method not allowed.', { Allow: 'POST, OPTIONS' });
    case '/api/password':
      return method === 'POST' ? changePassword(req, env) : errorResponse(405, 'Method not allowed.', { Allow: 'POST, OPTIONS' });
    case '/api/enquiry':
      return method === 'POST' ? postEnquiry(req, env) : errorResponse(405, 'Method not allowed.', { Allow: 'POST, OPTIONS' });
    case '/api/enquiries':
      return method === 'GET' ? listEnquiries(req, env, url) : errorResponse(405, 'Method not allowed.', { Allow: 'GET, OPTIONS' });
    default:
      return errorResponse(404, 'Not found.');
  }
}

export default {
  async fetch(req: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const origin = req.headers.get('Origin');
    // A browser on any other website is refused outright.
    if (origin !== null && !originAllowed(origin)) {
      return errorResponse(403, 'This website is not allowed to use this service.');
    }
    let res: Response;
    try {
      res = await route(req, env, new URL(req.url));
    } catch (err) {
      console.error('unhandled error', err instanceof Error ? err.message : err);
      res = errorResponse(500, 'Something went wrong on the server.');
    }
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(corsHeaders(origin))) headers.set(k, v);
    return new Response(res.body, { status: res.status, headers });
  },
};
