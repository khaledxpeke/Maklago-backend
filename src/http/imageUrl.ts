import type { Request } from 'express';
import { env } from '../config/env';

/**
 * Prefer PUBLIC_BASE_URL when set; otherwise derive from the incoming request
 * so mobile clients get an absolute URL when calling the API host directly.
 */
export function absolutePublicUrl(req: Request, pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const configured = env.publicBaseUrl?.replace(/\/$/, '');
  if (configured) return `${configured}${path}`;
  const xfProto = req.headers['x-forwarded-proto'];
  const proto = typeof xfProto === 'string' ? xfProto.split(',')[0]?.trim() : undefined;
  const scheme = proto || req.protocol || 'http';
  const host = req.get('host');
  if (host) return `${scheme}://${host}${path}`;
  return path;
}

/** Stored paths under uploads (`uploads/<tenantId>/…`). Leading slash optional in DB; normalized without slash. */
function uploadsRelativeFromPath(pathnameOrHaystack: string): string | undefined {
  const i = pathnameOrHaystack.indexOf('uploads/');
  if (i < 0) return undefined;
  return pathnameOrHaystack.slice(i);
}

/**
 * Stored value: external `https://…` or portable `uploads/{tenantId}/{file}` (no host, no leading slash).
 */
export function resolveImageForClient(req: Request, stored: string | null): string | null {
  if (!stored) return null;
  if (stored.startsWith('http://') || stored.startsWith('https://')) return stored;
  const pathname = stored.startsWith('/') ? stored : `/${stored}`;
  return absolutePublicUrl(req, pathname);
}

/**
 * Persist only `uploads/…` paths for tenant files. Strips `http://localhost`, `127.0.0.1`, or `PUBLIC_BASE_URL`
 * when the URL points at `/uploads/…`. Leaves real external CDN URLs unchanged.
 */
export function normalizeImageForStorage(raw: string | null | undefined): string | null | undefined {
  if (raw === undefined) return undefined;
  if (raw === null) return null;
  let s = raw.trim();
  if (!s) return null;

  const configured = env.publicBaseUrl?.replace(/\/$/, '');
  if (configured && (s.startsWith(`${configured}/`) || s === configured)) {
    s = s.slice(configured.length).replace(/^\//, '') || s;
  }

  if (s.startsWith('http://') || s.startsWith('https://')) {
    try {
      const u = new URL(s);
      const pathPart = u.pathname + u.search + u.hash;
      const extracted = uploadsRelativeFromPath(pathPart);
      if (extracted) return extracted;
      return s;
    } catch {
      return s;
    }
  }

  const extracted = uploadsRelativeFromPath(s.startsWith('/') ? s : `/${s}`);
  if (extracted) return extracted;

  return s;
}
