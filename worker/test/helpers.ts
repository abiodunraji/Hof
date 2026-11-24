import { pbkdf2Sync, randomBytes } from 'node:crypto';
import worker from '../src/index';
import type { Env } from '../src/types';

/** Minimal in-memory KV with the parts of the API the Worker uses. */
export class FakeKV {
  store = new Map<string, { value: string; expiresAt?: number }>();

  private live(key: string) {
    const e = this.store.get(key);
    if (!e) return undefined;
    if (e.expiresAt !== undefined && e.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return e;
  }

  async get(key: string, type?: 'text' | 'json' | { type: string }): Promise<unknown> {
    const e = this.live(key);
    if (!e) return null;
    const t = typeof type === 'string' ? type : type?.type;
    return t === 'json' ? JSON.parse(e.value) : e.value;
  }

  async put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void> {
    if (opts?.expirationTtl !== undefined && opts.expirationTtl < 60) {
      throw new Error('KV: expirationTtl must be at least 60 seconds');
    }
    this.store.set(key, {
      value,
      expiresAt: opts?.expirationTtl ? Date.now() + opts.expirationTtl * 1000 : undefined,
    });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async list(opts: { prefix?: string; limit?: number; cursor?: string } = {}) {
    const names = [...this.store.keys()]
      .filter((k) => this.live(k) && k.startsWith(opts.prefix ?? ''))
      .sort();
    const start = opts.cursor ? names.findIndex((n) => n > opts.cursor!) : 0;
    const from = start === -1 ? names.length : start;
    const limit = opts.limit ?? 1000;
    const page = names.slice(from, from + limit);
    const complete = from + limit >= names.length;
    return {
      keys: page.map((name) => ({ name })),
      list_complete: complete,
      cursor: complete ? undefined : page[page.length - 1],
    };
  }

  keysWithPrefix(prefix: string): string[] {
    return [...this.store.keys()].filter((k) => k.startsWith(prefix)).sort();
  }
}

export const TEST_USER = 'testadmin';
export const TEST_PASSWORD = 'Throwaway-Pass-2026';

export function hashPassword(password: string, iterations = 100000): string {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  return `pbkdf2-sha256$${iterations}$${salt.toString('base64url')}$${hash.toString('base64url')}`;
}

// One hash for the whole run: PBKDF2 at 100000 iterations is slow on purpose.
const SHARED_HASH = hashPassword(TEST_PASSWORD);

export function makeEnv(overrides: Partial<Env> = {}): Env & { CONTENT: FakeKV } {
  return {
    CONTENT: new FakeKV() as unknown as KVNamespace,
    ADMIN_USERNAME: TEST_USER,
    ADMIN_PASSWORD_HASH: SHARED_HASH,
    SESSION_SECRET: 'test-session-secret-0123456789abcdef0123456789abcdef',
    ...overrides,
  } as Env & { CONTENT: FakeKV };
}

export interface CallOpts {
  body?: unknown;
  rawBody?: string;
  token?: string;
  origin?: string;
  ip?: string;
  headers?: Record<string, string>;
}

export async function call(env: Env, method: string, path: string, opts: CallOpts = {}): Promise<Response> {
  const headers: Record<string, string> = { ...(opts.headers ?? {}) };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.origin) headers.Origin = opts.origin;
  if (opts.ip) headers['CF-Connecting-IP'] = opts.ip;
  let body: string | undefined = opts.rawBody;
  if (body === undefined && opts.body !== undefined) {
    body = JSON.stringify(opts.body);
    headers['Content-Type'] = 'application/json';
  }
  const req = new Request(`https://api.test${path}`, { method, headers, body });
  const ctx = { waitUntil() {}, passThroughOnException() {} } as unknown as ExecutionContext;
  return worker.fetch(req, env, ctx);
}

export async function loginToken(env: Env, ip = '10.0.0.1'): Promise<string> {
  const res = await call(env, 'POST', '/api/login', { body: { username: TEST_USER, password: TEST_PASSWORD }, ip });
  if (res.status !== 200) throw new Error(`login failed in test helper: ${res.status}`);
  return ((await res.json()) as { token: string }).token;
}

export const GOOD_PROJECT = {
  id: 1,
  title: 'Test project',
  category: 'Living Rooms',
  description: 'Short text',
  fullDescription: 'Longer text',
  image: 'https://res.cloudinary.com/demo/image/upload/hero.jpg',
  gallery: ['https://res.cloudinary.com/demo/image/upload/a.jpg', '/portfolio/interiors/x/b.jpg'],
  tags: ['Modern'],
  highlights: ['One', 'Two'],
  location: 'Abuja',
  year: '2026',
  budget: '₦5,000,000',
  duration: '8 weeks',
  size: '120 sqm',
  visible: true,
};
