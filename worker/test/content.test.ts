import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultConfig } from '../../src/data/siteConfig';
import { constructionCategories, constructionProjects, interiorsCategories, interiorsProjects } from '../../src/data/portfolioData';
import { GOOD_PROJECT, call, loginToken, makeEnv } from './helpers';

afterEach(() => vi.useRealTimers());

describe('GET /api/content (public)', () => {
  it('returns the defaults when nothing has been saved', async () => {
    const env = makeEnv();
    const res = await call(env, 'GET', '/api/content');
    expect(res.status).toBe(200);
    const body = (await res.json()) as { config: unknown; portfolio: unknown; updatedAt: unknown };
    expect(body.config).toEqual(defaultConfig);
    expect(body.portfolio).toBeNull();
    expect(body.updatedAt).toBeNull();
    expect(res.headers.get('Cache-Control')).toMatch(/max-age=30/);
    // the owner's existing Interiors form is the default; there is no Construction form yet
    expect((body.config as Record<string, unknown>).tallyInteriorsFormId).toBe('vGPYv8');
    expect((body.config as Record<string, unknown>).tallyConstructionFormId).toBe('');
  });
});

describe('the built-in wording (what the Worker serves until the owner changes it)', () => {
  it('makes no claim the owner has not confirmed', () => {
    const CLAIM = /since\s+\d{4}|\d+\s*\+|\byears?\b|licen[sc]ed|certified|insured|award|guarantee|warrant|track record/i;
    for (const [key, value] of Object.entries(defaultConfig)) {
      if (typeof value === 'string') expect({ key, claim: CLAIM.test(value) }).toEqual({ key, claim: false });
    }
  });

  it('links only to a social page that exists: the real Instagram, and nothing for the pages that do not', () => {
    // 1 Nov 2026: instagram.com/houseoffaridah, facebook.com/houseoffaridah and the LinkedIn company page were not found;
    // the owner's real Instagram is hofinteriorconcept. An empty link hides its icon on the site.
    expect(defaultConfig.socialInstagram).toBe('https://instagram.com/hofinteriorconcept');
    expect(defaultConfig.socialFacebook).toBe('');
    expect(defaultConfig.socialLinkedIn).toBe('');
  });
});

describe('the Tally form ids (the only way the site takes enquiries)', () => {
  const save = async (config: Record<string, unknown>) => {
    const env = makeEnv();
    const token = await loginToken(env);
    const res = await call(env, 'PUT', '/api/content', { token, body: { config } });
    return { res, env };
  };

  it.each([
    ['a 4 character id', 'abcd'],
    ['a 6 character id like the owner\'s', 'vGPYv8'],
    ['a 20 character id', 'A1b2C3d4E5f6G7h8I9j0'],
  ])('accepts %s for either form', async (_label, id) => {
    const { res, env } = await save({ tallyInteriorsFormId: id, tallyConstructionFormId: id });
    expect(res.status).toBe(200);
    const body = (await (await call(env, 'GET', '/api/content')).json()) as any;
    expect(body.config.tallyInteriorsFormId).toBe(id);
    expect(body.config.tallyConstructionFormId).toBe(id);
  });

  it('accepts an empty id (no form: the page shows the phone and email instead)', async () => {
    const { res, env } = await save({ tallyInteriorsFormId: '', tallyConstructionFormId: '' });
    expect(res.status).toBe(200);
    const body = (await (await call(env, 'GET', '/api/content')).json()) as any;
    expect(body.config.tallyInteriorsFormId).toBe('');
  });

  it.each([
    ['3 characters', 'abc'],
    ['21 characters', 'a'.repeat(21)],
    ['a space inside', 'ab cd'],
    ['a dash', 'ab-cd'],
    ['a symbol', 'ab!d'],
    ['a pasted link (the panel turns links into ids before saving)', 'https://tally.so/r/abcd'],
    ['a script tag', '<script>x</script>'],
  ])('refuses an id with %s (400)', async (_label, id) => {
    for (const key of ['tallyInteriorsFormId', 'tallyConstructionFormId']) {
      const { res, env } = await save({ [key]: id });
      expect(res.status).toBe(400);
      expect(((await (await call(env, 'GET', '/api/content')).json()) as any).updatedAt).toBeNull();
    }
  });

  it('refuses an id that is not text (400)', async () => {
    expect((await save({ tallyInteriorsFormId: 123456 })).res.status).toBe(400);
    expect((await save({ tallyConstructionFormId: null })).res.status).toBe(400);
  });
});

describe('the enquiry endpoints are gone (enquiries go to the owner\'s Tally form, not to the Worker)', () => {
  it.each([
    ['POST', '/api/enquiry'],
    ['GET', '/api/enquiries'],
    ['POST', '/api/enquiries'],
  ])('%s %s is 404', async (method, path) => {
    const env = makeEnv();
    const token = await loginToken(env);
    const res = await call(env, method, path, {
      token,
      body: method === 'POST' ? { source: 'interiors-contact', name: 'A', email: 'a@example.com' } : undefined,
    });
    expect(res.status).toBe(404);
    expect(env.CONTENT.keysWithPrefix('enquiry:')).toHaveLength(0);
  });
});

describe('PUT /api/content needs a valid session', () => {
  it('rejects no token, a garbage token, a tampered token and an expired token', async () => {
    const env = makeEnv();
    const put = (token?: string) => call(env, 'PUT', '/api/content', { body: { config: { contactPhone: '0800' } }, token });
    expect((await put()).status).toBe(401);
    expect((await put('not-a-token')).status).toBe(401);

    const token = await loginToken(env);
    const [payload, sig] = token.split('.');
    const flipped = sig.slice(0, -2) + (sig.endsWith('AA') ? 'BB' : 'AA');
    expect((await put(`${payload}.${flipped}`)).status).toBe(401);
    // a different payload with the old signature
    const forged = Buffer.from(JSON.stringify({ sub: 'admin', iat: 1, exp: 9999999999, pv: 'x' })).toString('base64url');
    expect((await put(`${forged}.${sig}`)).status).toBe(401);

    expect((await put(token)).status).toBe(200);

    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(Date.now() + 31 * 60 * 1000);
    expect((await put(token)).status).toBe(401);

    // nothing was ever written by the rejected calls
    vi.useRealTimers();
    const body = (await (await call(env, 'GET', '/api/content')).json()) as { config: { contactPhone: string } };
    expect(body.config.contactPhone).toBe('0800');
  });
});

describe('saving and reading', () => {
  it('an edit made with a session is what the next visitor gets', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    const res = await call(env, 'PUT', '/api/content', {
      token,
      body: {
        config: { contactPhone: '08000000000', showConsultationCta: false },
        portfolio: { interiors: [GOOD_PROJECT], interiorsCategories: ['All', 'Living Rooms'] },
      },
    });
    expect(res.status).toBe(200);

    // a different visitor: no token, no cookies
    const body = (await (await call(env, 'GET', '/api/content', { ip: '10.9.9.9' })).json()) as any;
    expect(body.config.contactPhone).toBe('08000000000');
    expect(body.config.showConsultationCta).toBe(false);
    expect(body.config.contactEmail).toBe(defaultConfig.contactEmail); // untouched keys keep the default
    expect(body.portfolio.interiors).toEqual([GOOD_PROJECT]);
    expect(body.portfolio.construction).toBeUndefined(); // not saved, so the site keeps its own default
    expect(typeof body.updatedAt).toBe('string');
  });

  it('a second save of one section does not erase the other', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    await call(env, 'PUT', '/api/content', { token, body: { portfolio: { interiors: [GOOD_PROJECT] } } });
    await call(env, 'PUT', '/api/content', { token, body: { portfolio: { construction: [{ ...GOOD_PROJECT, id: 2, title: 'Build' }] } } });
    const body = (await (await call(env, 'GET', '/api/content')).json()) as any;
    expect(body.portfolio.interiors).toHaveLength(1);
    expect(body.portfolio.construction[0].title).toBe('Build');
  });

  it('DELETE resets to the defaults and needs a session', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    await call(env, 'PUT', '/api/content', { token, body: { config: { contactPhone: '0800' } } });
    expect((await call(env, 'DELETE', '/api/content')).status).toBe(401);
    expect((await call(env, 'DELETE', '/api/content', { token })).status).toBe(200);
    const body = (await (await call(env, 'GET', '/api/content')).json()) as any;
    expect(body.config).toEqual(defaultConfig);
    expect(body.portfolio).toBeNull();
  });
});

describe('what the site ships with passes the strict validation', () => {
  it('the built-in settings and every built-in project can be saved unchanged (the panel sends them all on the first save)', async () => {
    const env = makeEnv();
    const token = await loginToken(env);
    const res = await call(env, 'PUT', '/api/content', {
      token,
      body: {
        config: defaultConfig,
        portfolio: { interiors: interiorsProjects, construction: constructionProjects, interiorsCategories, constructionCategories },
      },
    });
    expect(await res.clone().text()).toContain('ok');
    expect(res.status).toBe(200);
    const body = (await (await call(env, 'GET', '/api/content')).json()) as any;
    expect(body.portfolio.interiors).toHaveLength(interiorsProjects.length);
    expect(body.portfolio.construction).toHaveLength(constructionProjects.length);
    expect(body.config).toEqual(defaultConfig);
  });
});

describe('PUT validation: strict shape, sizes and URL schemes', () => {
  async function put(body: unknown, raw?: string) {
    const env = makeEnv();
    const token = await loginToken(env);
    const res = await call(env, 'PUT', '/api/content', raw === undefined ? { token, body } : { token, rawBody: raw, headers: { 'Content-Type': 'application/json' } });
    return { res, env };
  }

  it.each([
    ['an empty object', {}],
    ['a body that is an array', [1, 2]],
    ['an unknown config key', { config: { contactWhatsApp: '123' } }],
    ['a non-boolean toggle', { config: { showConsultationCta: 'yes' } }],
    ['a config string that is too long', { config: { interiorsTagline: 'x'.repeat(2000) } }],
    ['a javascript: social link', { config: { socialInstagram: 'javascript:alert(1)' } }],
    ['an http (not https) social link', { config: { socialFacebook: 'http://facebook.com/x' } }],
    ['an invalid email', { config: { contactEmail: 'not an email' } }],
    ['an unknown top-level key', { config: {}, extra: 1 }],
    ['a data: image', { portfolio: { interiors: [{ ...GOOD_PROJECT, image: 'data:image/png;base64,AAAA' }] } }],
    ['a protocol-relative image', { portfolio: { interiors: [{ ...GOOD_PROJECT, image: '//evil.example/x.jpg' }] } }],
    ['an ftp gallery url', { portfolio: { interiors: [{ ...GOOD_PROJECT, gallery: ['ftp://x/y.jpg'] }] } }],
    ['a project with no title', { portfolio: { interiors: [{ ...GOOD_PROJECT, title: '' }] } }],
    ['a title that is too long', { portfolio: { interiors: [{ ...GOOD_PROJECT, title: 'T'.repeat(500) }] } }],
    ['a project with an unknown field', { portfolio: { interiors: [{ ...GOOD_PROJECT, script: '<x>' }] } }],
    ['too many projects', { portfolio: { interiors: Array.from({ length: 201 }, (_, i) => ({ ...GOOD_PROJECT, id: i })) } }],
    ['a project list that is not an array', { portfolio: { interiors: 'nope' } }],
  ])('rejects %s with 400', async (_label, body) => {
    const { res, env } = await put(body);
    expect(res.status).toBe(400);
    const stored = (await (await call(env, 'GET', '/api/content')).json()) as any;
    expect(stored.updatedAt).toBeNull(); // nothing was written
  });

  it('rejects a body that is not JSON with 400', async () => {
    expect((await put(null, '{not json')).res.status).toBe(400);
  });

  it('rejects an oversize body with 413', async () => {
    const huge = JSON.stringify({ config: { contactPhone: 'x'.repeat(600_000) } });
    expect((await put(null, huge)).res.status).toBe(413);
  });
});

describe('CORS', () => {
  it.each([
    ['https://houseoffaridah.com'],
    ['http://localhost:5173'],
    ['http://127.0.0.1:5199'],
  ])('allows %s', async (origin) => {
    const res = await call(makeEnv(), 'GET', '/api/content', { origin });
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(origin);
    expect(res.headers.get('Vary')).toMatch(/Origin/);
  });

  it.each([
    ['https://evil.example'],
    ['https://houseoffaridah.com.evil.example'],
    ['http://houseoffaridah.com'],
    ['https://www.houseoffaridah.com'],
    ['http://localhost.evil.example'],
  ])('refuses %s (403, no CORS header)', async (origin) => {
    const res = await call(makeEnv(), 'GET', '/api/content', { origin });
    expect(res.status).toBe(403);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });

  it('answers the preflight for an allowed origin and refuses it for another', async () => {
    const ok = await call(makeEnv(), 'OPTIONS', '/api/content', {
      origin: 'https://houseoffaridah.com',
      headers: { 'Access-Control-Request-Method': 'PUT', 'Access-Control-Request-Headers': 'authorization,content-type' },
    });
    expect(ok.status).toBe(204);
    expect(ok.headers.get('Access-Control-Allow-Methods')).toMatch(/PUT/);
    expect(ok.headers.get('Access-Control-Allow-Headers')?.toLowerCase()).toMatch(/authorization/);
    const bad = await call(makeEnv(), 'OPTIONS', '/api/content', { origin: 'https://evil.example' });
    expect(bad.status).toBe(403);
  });

  it('unknown routes are 404 and wrong methods 405', async () => {
    expect((await call(makeEnv(), 'GET', '/api/nope')).status).toBe(404);
    expect((await call(makeEnv(), 'POST', '/api/content')).status).toBe(405);
  });
});
