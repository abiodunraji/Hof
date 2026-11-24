import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { call, loginToken, makeEnv } from './helpers';

const ENQ = {
  source: 'interiors-contact',
  name: 'Ada Obi',
  email: 'ada@example.com',
  phone: '08031234567',
  projectType: 'Living Rooms',
  budget: 'Under ₦1,000,000',
  timeline: '1-3 months',
  message: 'I would like a quote for my living room.',
};

const emailEnv = () =>
  makeEnv({ RESEND_API_KEY: 'test-key', ENQUIRY_TO: 'owner@example.test', ENQUIRY_FROM: 'Enquiries <enquiries@example.test>' });

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  fetchMock = vi.fn(async () => new Response(JSON.stringify({ id: 'email-1' }), { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('POST /api/enquiry', () => {
  it('stores the enquiry first, then emails it with the right payload', async () => {
    const env = emailEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body: ENQ, ip: '10.0.0.1', origin: 'https://houseoffaridah.com' });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, emailed: true });

    const keys = env.CONTENT.keysWithPrefix('enquiry:');
    expect(keys).toHaveLength(1);
    const stored = JSON.parse(env.CONTENT.store.get(keys[0])!.value);
    expect(stored).toMatchObject({ name: 'Ada Obi', email: 'ada@example.com', source: 'interiors-contact', message: ENQ.message, emailed: true });
    expect(typeof stored.receivedAt).toBe('string');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.method).toBe('POST');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-key');
    const sent = JSON.parse(init.body as string);
    expect(sent.from).toBe('Enquiries <enquiries@example.test>');
    expect(sent.to).toEqual(['owner@example.test']);
    expect(sent.reply_to).toBe('ada@example.com');
    expect(sent.subject).toContain('Ada Obi');
    for (const part of ['Ada Obi', 'ada@example.com', '08031234567', 'Living Rooms', 'Under ₦1,000,000', ENQ.message]) {
      expect(sent.text).toContain(part);
    }
  });

  it('supports several recipients', async () => {
    const env = makeEnv({ RESEND_API_KEY: 'k', ENQUIRY_TO: 'a@example.test, b@example.test', ENQUIRY_FROM: 'x@example.test' });
    await call(env, 'POST', '/api/enquiry', { body: ENQ });
    const sent = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.to).toEqual(['a@example.test', 'b@example.test']);
  });

  it('with no email settings it still stores the enquiry and says emailed:false', async () => {
    const env = makeEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body: ENQ });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, emailed: false });
    expect(fetchMock).not.toHaveBeenCalled();
    const stored = JSON.parse(env.CONTENT.store.get(env.CONTENT.keysWithPrefix('enquiry:')[0])!.value);
    expect(stored.emailed).toBe(false);
    expect(stored.emailError).toMatch(/not configured/i);
  });

  it('when the email provider fails the enquiry is still kept (200) and marked', async () => {
    fetchMock.mockResolvedValueOnce(new Response('upstream error', { status: 500 }));
    const env = emailEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body: ENQ });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, emailed: false });
    const stored = JSON.parse(env.CONTENT.store.get(env.CONTENT.keysWithPrefix('enquiry:')[0])!.value);
    expect(stored).toMatchObject({ emailed: false, name: 'Ada Obi' });
    expect(stored.emailError).toMatch(/500/);
  });

  it('when the email provider throws the enquiry is still kept', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network down'));
    const env = emailEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body: ENQ });
    expect(res.status).toBe(200);
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(1);
  });

  it('a filled honeypot looks like success but stores and sends nothing', async () => {
    const env = emailEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body: { ...ENQ, website: 'http://spam.example' } });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true });
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['no name', { ...ENQ, name: '' }],
    ['no email', { ...ENQ, email: undefined }],
    ['a bad email', { ...ENQ, email: 'ada@' }],
    ['an unknown source', { ...ENQ, source: 'somewhere-else' }],
    ['a message over 5000 characters', { ...ENQ, message: 'm'.repeat(5001) }],
    ['a name over 120 characters', { ...ENQ, name: 'n'.repeat(121) }],
    ['a non-string field', { ...ENQ, phone: 123 }],
    ['an unknown field', { ...ENQ, bcc: 'x@y.z' }],
  ])('rejects %s with 400 and stores nothing', async (_label, body) => {
    const env = emailEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body });
    expect(res.status).toBe(400);
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a body that is not JSON (400) and an oversize body (413)', async () => {
    const env = emailEnv();
    expect((await call(env, 'POST', '/api/enquiry', { rawBody: 'nope', headers: { 'Content-Type': 'application/json' } })).status).toBe(400);
    const big = JSON.stringify({ ...ENQ, message: 'm'.repeat(30_000) });
    expect((await call(env, 'POST', '/api/enquiry', { rawBody: big, headers: { 'Content-Type': 'application/json' } })).status).toBe(413);
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(0);
  });

  it('cannot be used to inject mail headers through the name', async () => {
    const env = emailEnv();
    await call(env, 'POST', '/api/enquiry', { body: { ...ENQ, name: 'Eve\r\nBcc: victim@example.com' } });
    const sent = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.subject).not.toMatch(/[\r\n]/);
    expect(sent.bcc).toBeUndefined();
  });

  it('rate-limits one IP after 5 enquiries but not another IP', async () => {
    const env = emailEnv();
    for (let i = 0; i < 5; i++) expect((await call(env, 'POST', '/api/enquiry', { body: ENQ, ip: '10.5.5.5' })).status).toBe(200);
    const blocked = await call(env, 'POST', '/api/enquiry', { body: ENQ, ip: '10.5.5.5' });
    expect(blocked.status).toBe(429);
    expect((await call(env, 'POST', '/api/enquiry', { body: ENQ, ip: '10.6.6.6' })).status).toBe(200);
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(6);
  });

  it('refuses a browser from another website (403) and stores nothing', async () => {
    const env = emailEnv();
    const res = await call(env, 'POST', '/api/enquiry', { body: ENQ, origin: 'https://evil.example' });
    expect(res.status).toBe(403);
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(0);
  });
});

describe('GET /api/enquiries (owner only)', () => {
  it('needs a session', async () => {
    expect((await call(makeEnv(), 'GET', '/api/enquiries')).status).toBe(401);
    expect((await call(makeEnv(), 'GET', '/api/enquiries', { token: 'nope' })).status).toBe(401);
  });

  it('lists newest first and pages with a cursor', async () => {
    const env = emailEnv();
    vi.useFakeTimers({ toFake: ['Date'] });
    const base = new Date('2026-11-24T10:00:00Z').getTime();
    for (let i = 0; i < 3; i++) {
      vi.setSystemTime(base + i * 60_000);
      await call(env, 'POST', '/api/enquiry', { body: { ...ENQ, name: `Person ${i}` }, ip: `10.7.7.${i}` });
    }
    vi.setSystemTime(base + 10 * 60_000);
    const token = await loginToken(env, '10.8.8.8');

    const first = (await (await call(env, 'GET', '/api/enquiries?limit=2', { token })).json()) as any;
    expect(first.items.map((e: any) => e.name)).toEqual(['Person 2', 'Person 1']);
    expect(first.cursor).toBeTruthy();
    const second = (await (await call(env, 'GET', `/api/enquiries?limit=2&cursor=${encodeURIComponent(first.cursor)}`, { token })).json()) as any;
    expect(second.items.map((e: any) => e.name)).toEqual(['Person 0']);
    expect(second.cursor).toBeNull();
    expect(first.items[0]).toMatchObject({ email: 'ada@example.com', source: 'interiors-contact', emailed: true });
  });
});
