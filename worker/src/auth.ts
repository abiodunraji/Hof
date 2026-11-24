/**
 * Login, sessions and the small per-IP counters.
 *
 *  - The password is only ever stored as a salted PBKDF2-SHA256 hash:
 *      pbkdf2-sha256$<iterations>$<salt b64url>$<hash b64url>
 *    The first one lives in the Worker secret ADMIN_PASSWORD_HASH. A password
 *    change made in the panel is stored the same way in KV (auth:password) and
 *    wins over the secret.
 *  - A session is an HMAC-signed token (payload.signature) valid for 30
 *    minutes. It carries a fingerprint of the password hash, so changing the
 *    password ends every older session.
 */
import { errorResponse } from './http';
import type { Env } from './types';

const enc = new TextEncoder();

export const TOKEN_TTL_MS = 30 * 60 * 1000;
export const MAX_PBKDF2_ITERATIONS = 100000; // the most Workers allow
export const PASSWORD_KEY = 'auth:password';

// ---------------------------------------------------------------- encoding

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = '';
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array | null {
  try {
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4);
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function sha256(text: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(text)));
}

// ---------------------------------------------------------------- passwords

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

interface ParsedHash {
  iterations: number;
  salt: Uint8Array;
  hash: Uint8Array;
}

export function parseHash(stored: string): ParsedHash | null {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2-sha256') return null;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations < 1 || iterations > MAX_PBKDF2_ITERATIONS) return null;
  const salt = fromBase64Url(parts[2]);
  const hash = fromBase64Url(parts[3]);
  if (!salt || !hash || salt.length < 8 || hash.length !== 32) return null;
  return { iterations, salt, hash };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, MAX_PBKDF2_ITERATIONS);
  return `pbkdf2-sha256$${MAX_PBKDF2_ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parsed = parseHash(stored);
  if (!parsed) return false;
  const candidate = await derive(password, parsed.salt, parsed.iterations);
  return timingSafeEqual(candidate, parsed.hash);
}

/** The password hash in force: a change made in the panel beats the secret. */
export async function effectiveHash(env: Env): Promise<string | null> {
  const override = (await env.CONTENT.get(PASSWORD_KEY)) as string | null;
  return override ?? env.ADMIN_PASSWORD_HASH ?? null;
}

/** True only when the secrets needed to log in are present and the hash is readable. */
export async function authConfigured(env: Env): Promise<boolean> {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32 || !env.ADMIN_USERNAME) return false;
  const hash = await effectiveHash(env);
  return !!hash && parseHash(hash) !== null;
}

export function usernameMatches(given: string, expected: string): boolean {
  const a = enc.encode(given.trim().toLowerCase());
  const b = enc.encode(expected.trim().toLowerCase());
  // equal-length compare so a wrong length does not return faster
  const len = Math.max(a.length, b.length);
  const pa = new Uint8Array(len);
  const pb = new Uint8Array(len);
  pa.set(a);
  pb.set(b);
  return timingSafeEqual(pa, pb) && a.length === b.length;
}

// ---------------------------------------------------------------- sessions

interface Session {
  sub: 'admin';
  iat: number;
  exp: number;
  pv: string;
}

async function passwordVersion(hash: string): Promise<string> {
  return toBase64Url((await sha256(hash)).slice(0, 12));
}

async function hmacKey(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

export async function issueToken(env: Env, now = Date.now()): Promise<{ token: string; expiresAt: number }> {
  const hash = (await effectiveHash(env)) ?? '';
  const session: Session = { sub: 'admin', iat: now, exp: now + TOKEN_TTL_MS, pv: await passwordVersion(hash) };
  const payload = toBase64Url(enc.encode(JSON.stringify(session)));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(env.SESSION_SECRET!, 'sign'), enc.encode(payload));
  return { token: `${payload}.${toBase64Url(sig)}`, expiresAt: session.exp };
}

async function readToken(env: Env, token: string, now: number): Promise<Session | null> {
  const parts = token.split('.');
  if (parts.length !== 2 || !env.SESSION_SECRET) return null;
  const sig = fromBase64Url(parts[1]);
  if (!sig) return null;
  const valid = await crypto.subtle.verify('HMAC', await hmacKey(env.SESSION_SECRET, 'verify'), sig, enc.encode(parts[0]));
  if (!valid) return null;
  const raw = fromBase64Url(parts[0]);
  if (!raw) return null;
  try {
    const s = JSON.parse(new TextDecoder().decode(raw)) as Session;
    if (s.sub !== 'admin' || typeof s.exp !== 'number' || typeof s.pv !== 'string' || s.exp <= now) return null;
    return s;
  } catch {
    return null;
  }
}

/** Returns null when the request carries a valid session, else the error response to send. */
export async function requireSession(req: Request, env: Env): Promise<Response | null> {
  if (!(await authConfigured(env))) return errorResponse(503, 'Sign-in is not set up on the server yet.');
  const header = req.headers.get('Authorization') ?? '';
  const match = /^Bearer\s+(\S+)$/.exec(header);
  const session = match ? await readToken(env, match[1], Date.now()) : null;
  const hash = (await effectiveHash(env)) ?? '';
  if (!session || session.pv !== (await passwordVersion(hash))) {
    return errorResponse(401, 'Sign in again.');
  }
  return null;
}

// ---------------------------------------------------------------- per-IP counters

export async function clientKey(env: Env, req: Request): Promise<string> {
  const ip = req.headers.get('CF-Connecting-IP') ?? 'local';
  return toBase64Url((await sha256(`${ip}|${env.SESSION_SECRET ?? ''}`)).slice(0, 12));
}

export async function readCount(env: Env, key: string): Promise<number> {
  const raw = (await env.CONTENT.get(key)) as string | null;
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

/** Adds one to a counter that disappears `ttlSeconds` after its last increase (KV minimum is 60). */
export async function bumpCount(env: Env, key: string, ttlSeconds: number): Promise<number> {
  const next = (await readCount(env, key)) + 1;
  await env.CONTENT.put(key, String(next), { expirationTtl: Math.max(60, ttlSeconds) });
  return next;
}
