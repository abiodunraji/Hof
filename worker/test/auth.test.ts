import { afterEach, describe, expect, it, vi } from 'vitest';
import { TEST_PASSWORD, TEST_USER, call, hashPassword, loginToken, makeEnv } from './helpers';

afterEach(() => vi.useRealTimers());

const login = (env: ReturnType<typeof makeEnv>, username: string, password: string, ip = '10.0.0.1') =>
  call(env, 'POST', '/api/login', { body: { username, password }, ip });

describe('POST /api/login', () => {
  it('accepts the right login and returns a 30 minute token', async () => {
    const env = makeEnv();
    const res = await login(env, TEST_USER, TEST_PASSWORD);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { token: string; expiresAt: number };
    expect(body.token).toMatch(/^[\w-]+\.[\w-]+$/);
    const minutes = (body.expiresAt - Date.now()) / 60000;
    expect(minutes).toBeGreaterThan(29);
    expect(minutes).toBeLessThanOrEqual(30);
  });

  it('is case-insensitive on the username (as the old panel was)', async () => {
    expect((await login(makeEnv(), TEST_USER.toUpperCase(), TEST_PASSWORD)).status).toBe(200);
  });

  it('refuses a wrong password and a wrong username with the same 401 message', async () => {
    const env = makeEnv();
    const a = await login(env, TEST_USER, 'wrong-password');
    const b = await login(env, 'someone-else', TEST_PASSWORD);
    expect(a.status).toBe(401);
    expect(b.status).toBe(401);
    expect(await a.text()).toBe(await b.text());
  });

  it('rate-limits repeated wrong logins per IP, even for the right password afterwards', async () => {
    const env = makeEnv();
    for (let i = 0; i < 5; i++) expect((await login(env, TEST_USER, `bad-${i}`, '10.1.1.1')).status).toBe(401);
    const blocked = await login(env, TEST_USER, TEST_PASSWORD, '10.1.1.1');
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get('Retry-After'))).toBeGreaterThan(0);
    // another IP is not affected
    expect((await login(env, TEST_USER, TEST_PASSWORD, '10.2.2.2')).status).toBe(200);
  });

  it('a successful login clears that IP\'s failures', async () => {
    const env = makeEnv();
    for (let i = 0; i < 4; i++) await login(env, TEST_USER, `bad-${i}`, '10.3.3.3');
    expect((await login(env, TEST_USER, TEST_PASSWORD, '10.3.3.3')).status).toBe(200);
    for (let i = 0; i < 4; i++) expect((await login(env, TEST_USER, `bad-${i}`, '10.3.3.3')).status).toBe(401);
  });

  it('refuses to run when the secrets are not set (503), never with a default login', async () => {
    const env = makeEnv({ ADMIN_PASSWORD_HASH: undefined, SESSION_SECRET: undefined });
    expect((await login(env, 'admin', 'admin')).status).toBe(503);
    expect((await login(env, TEST_USER, TEST_PASSWORD)).status).toBe(503);
  });

  it('rejects a malformed body with 400', async () => {
    const env = makeEnv();
    expect((await call(env, 'POST', '/api/login', { rawBody: 'nope', headers: { 'Content-Type': 'application/json' } })).status).toBe(400);
    expect((await call(env, 'POST', '/api/login', { body: { username: 5 } })).status).toBe(400);
  });
});

describe('sessions', () => {
  it('a token signed with another secret is refused', async () => {
    const other = makeEnv({ SESSION_SECRET: 'a-completely-different-secret-value-0123456789' });
    const token = await loginToken(other);
    const res = await call(makeEnv(), 'PUT', '/api/content', { token, body: { config: { contactPhone: '1' } } });
    expect(res.status).toBe(401);
  });
});

describe('POST /api/refresh', () => {
  it('needs a session', async () => {
    const env = makeEnv();
    expect((await call(env, 'POST', '/api/refresh')).status).toBe(401);
    expect((await call(env, 'POST', '/api/refresh', { token: 'nope' })).status).toBe(401);
  });

  it('gives a new token that outlives the old one, so an active owner is not signed out', async () => {
    const env = makeEnv();
    const first = await login(env, TEST_USER, TEST_PASSWORD);
    const { token, expiresAt } = (await first.json()) as { token: string; expiresAt: number };

    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(Date.now() + 20 * 60 * 1000);
    const res = await call(env, 'POST', '/api/refresh', { token });
    expect(res.status).toBe(200);
    const fresh = (await res.json()) as { token: string; expiresAt: number };
    expect(fresh.expiresAt).toBeGreaterThan(expiresAt);

    // 35 minutes after the first login the old token is dead and the refreshed one still works
    vi.setSystemTime(Date.now() + 15 * 60 * 1000);
    const put = (t: string) => call(env, 'PUT', '/api/content', { token: t, body: { config: { contactPhone: '0800' } } });
    expect((await put(token)).status).toBe(401);
    expect((await put(fresh.token)).status).toBe(200);
  });

  it('refuses an expired token', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(Date.now() + 31 * 60 * 1000);
    expect((await call(env, 'POST', '/api/refresh', { token })).status).toBe(401);
  });
});

describe('POST /api/password', () => {
  it('needs a session, the current password and a long enough new one', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    const body = { currentPassword: TEST_PASSWORD, newPassword: 'A-brand-new-pass-1' };
    expect((await call(env, 'POST', '/api/password', { body })).status).toBe(401);
    expect((await call(env, 'POST', '/api/password', { token, body: { ...body, currentPassword: 'wrong' } })).status).toBe(403);
    expect((await call(env, 'POST', '/api/password', { token, body: { ...body, newPassword: 'short' } })).status).toBe(400);
  });

  it('changes the password, the old one stops working and old sessions end', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    const res = await call(env, 'POST', '/api/password', { token, body: { currentPassword: TEST_PASSWORD, newPassword: 'A-brand-new-pass-1' } });
    expect(res.status).toBe(200);
    expect((await login(env, TEST_USER, TEST_PASSWORD, '10.4.4.4')).status).toBe(401);
    expect((await login(env, TEST_USER, 'A-brand-new-pass-1', '10.4.4.4')).status).toBe(200);
    // the session from before the change no longer works
    expect((await call(env, 'PUT', '/api/content', { token, body: { config: { contactPhone: '1' } } })).status).toBe(401);
  });

  it('the stored value is a salted hash, never the password', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    await call(env, 'POST', '/api/password', { token, body: { currentPassword: TEST_PASSWORD, newPassword: 'A-brand-new-pass-1' } });
    const dump = JSON.stringify([...env.CONTENT.store.entries()]);
    expect(dump).not.toContain('A-brand-new-pass-1');
    expect(dump).toMatch(/pbkdf2-sha256\$100000\$/);
  });
});

describe('hash format', () => {
  it('the helper script format round-trips through login', async () => {
    const env = makeEnv({ ADMIN_PASSWORD_HASH: hashPassword('another-Pass-77') });
    expect((await login(env, TEST_USER, 'another-Pass-77')).status).toBe(200);
  });
});

describe('scripts/hash-password.mjs', () => {
  it('prints a value the Worker accepts at login, with a different salt each time', async () => {
    const { execFileSync } = await import('node:child_process');
    const run = () =>
      execFileSync(process.execPath, ['scripts/hash-password.mjs'], { input: 'Pass-From-Script-9\n', encoding: 'utf8' }).trim();
    const a = run();
    const b = run();
    expect(a).toMatch(/^pbkdf2-sha256\$100000\$[\w-]+\$[\w-]+$/);
    expect(a).not.toBe(b);
    expect(a).not.toContain('Pass-From-Script-9');
    const env = makeEnv({ ADMIN_PASSWORD_HASH: a });
    expect((await login(env, TEST_USER, 'Pass-From-Script-9')).status).toBe(200);
    expect((await login(env, TEST_USER, 'not-it', '10.9.9.1')).status).toBe(401);
    const secret = execFileSync(process.execPath, ['scripts/hash-password.mjs', '--secret'], { encoding: 'utf8' }).trim();
    expect(secret.length).toBeGreaterThanOrEqual(48);
  });
});
