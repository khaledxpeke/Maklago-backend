import type { NextFunction, Request, Response } from 'express';
import { verifyStaffToken } from '../auth/jwt';
import { env } from '../config/env';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';

/**
 * When no `x-tenant-id` / subdomain tenant was resolved, attach `req.tenant` from a valid staff JWT
 * so authenticated routes work without sending the tenant slug on every request.
 */
export function attachTenantFromStaffJwt() {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (req.tenant) {
      next();
      return;
    }

    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      next();
      return;
    }
    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      next();
      return;
    }

    try {
      const payload = verifyStaffToken(token);
      if (!env.registryDatabaseUrl) {
        next();
        return;
      }

      const registry = getRegistryClient();
      const row = await registry.tenant.findFirst({
        where: { id: payload.tenantId, isActive: true },
      });
      if (!row) {
        next();
        return;
      }

      const prisma = getTenantPrisma(row.id, row.databaseUrl);
      req.tenant = { id: row.id, slug: row.slug, prisma };
      next();
    } catch {
      next();
    }
  };
}
