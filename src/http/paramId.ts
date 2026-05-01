import type { Request } from 'express';

/** Express 5 may type `req.params.id` as `string | string[]`. */
export function paramId(req: Request, key = 'id'): string | undefined {
  const v = req.params[key];
  if (typeof v === 'string') return v;
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0];
  return undefined;
}
