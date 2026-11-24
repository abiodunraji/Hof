/**
 * Small HTTP helpers: CORS, JSON replies, a capped body reader.
 */

const SITE_ORIGIN = 'https://houseoffaridah.com';
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?$/;

/** The only browsers allowed to talk to this API: the live site and local development. */
export function originAllowed(origin: string): boolean {
  return origin === SITE_ORIGIN || LOCAL_ORIGIN.test(origin);
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = { Vary: 'Origin' };
  if (origin && originAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

export function json(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    },
  });
}

export function errorResponse(status: number, message: string, extra: Record<string, string> = {}): Response {
  return json({ error: message }, status, extra);
}

export type BodyResult =
  | { ok: true; value: unknown }
  | { ok: false; response: Response };

/**
 * Reads a JSON body without ever holding more than `maxBytes` of it.
 * 413 when it is bigger, 400 when it is not valid JSON.
 */
export async function readJson(req: Request, maxBytes: number): Promise<BodyResult> {
  const declared = Number(req.headers.get('Content-Length'));
  if (Number.isFinite(declared) && declared > maxBytes) {
    return { ok: false, response: errorResponse(413, 'Request body is too large.') };
  }
  if (!req.body) return { ok: false, response: errorResponse(400, 'A JSON body is required.') };

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return { ok: false, response: errorResponse(413, 'Request body is too large.') };
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.byteLength;
  }
  try {
    return { ok: true, value: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, response: errorResponse(400, 'The body is not valid JSON.') };
  }
}
