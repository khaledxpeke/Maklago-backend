import type { NextFunction, Request, Response } from 'express';
import { env, type TenantSource } from '../config/env';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';
import { sendError } from '../http/errorResponse';

function tenantIdFromHeader(req: Request): string | null {
  const raw = req.headers[env.tenantHeader];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === undefined || String(value).trim() === '') return null;
  return String(value).trim().toLowerCase();
}

function tenantIdFromSubdomain(host: string): string | null {
  if (!env.baseDomain) return null;
  const hostNoPort = host.split(':')[0]?.toLowerCase() ?? '';
  const suffix = `.${env.baseDomain}`;
  if (!hostNoPort.endsWith(suffix)) return null;
  const sub = hostNoPort.slice(0, -suffix.length);
  if (sub === '' || sub.includes('.')) return null;
  return sub.toLowerCase();
}

function resolveTenantKey(req: Request, source: TenantSource): string | null {
  if (source === 'subdomain') {
    const host = req.get('host') ?? '';
    return tenantIdFromSubdomain(host);
  }
  return tenantIdFromHeader(req);
}

/**
 * Resolves tenant from header/subdomain, validates against registry DB, attaches `req.tenant`.
 */
export function tenantResolve(options?: { optional?: boolean }) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const keyRaw = resolveTenantKey(req, env.tenantSource);
    const key = keyRaw ? keyRaw.toLowerCase() : null;

    if (!key) {
      if (options?.optional) {
        next();
        return;
      }
      sendError(res, 400, 'tenant_required', 'Tenant could not be resolved', {
        hint:
          env.tenantSource === 'subdomain'
            ? `Use a host like {tenant}.${env.baseDomain || 'your-base-domain'}`
            : `Send header ${env.tenantHeader} (tenant slug or id).`,
      });
      return;
    }

    if (!env.registryDatabaseUrl) {
      sendError(res, 503, 'registry_unconfigured', 'REGISTRY_DATABASE_URL is not set');
      return;
    }

    try {
      const registry = getRegistryClient();
      const row = await registry.tenant.findFirst({
        where: {
          isActive: true,
          OR: [{ slug: key }, { id: key }],
        },
      });

      if (!row) {
        sendError(res, 404, 'tenant_not_found', 'Unknown or inactive tenant');
        return;
      }

      const prisma = getTenantPrisma(row.id, row.databaseUrl);
      req.tenant = { id: row.id, slug: row.slug, prisma };
      next();
    } catch (e) {
      next(e);
    }
  };
}
