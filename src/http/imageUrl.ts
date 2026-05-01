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

/** Stored value is either an external URL or a path starting with `/uploads/`. */
export function resolveImageForClient(req: Request, stored: string | null): string | null {
  if (!stored) return null;
  if (stored.startsWith('http://') || stored.startsWith('https://')) return stored;
  return absolutePublicUrl(req, stored);
}

/** Keep only the portable `/uploads/...` segment when the client sends a full URL to this server. */
export function normalizeImageForStorage(raw: string | null | undefined): string | null | undefined {
  if (raw === undefined) return undefined;
  if (raw === null) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const idx = trimmed.indexOf('/uploads/');
  if (idx >= 0) return trimmed.slice(idx);
  if (trimmed.startsWith('/uploads/')) return trimmed;
  return trimmed;
}
