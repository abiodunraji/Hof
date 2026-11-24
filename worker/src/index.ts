import type { Env } from './types';

export default {
  async fetch(_req: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
    return new Response('not found', { status: 404 });
  },
};
