import { Router } from 'express';
import { getRegistryClient } from '../../db/registry';
import { asyncHandler } from '../../http/asyncHandler';
import { platformAuth } from '../../middleware/platformAuth';

export const platformOwnersRouter = Router();

/** Registry `owners` rows (created when provisioning a tenant with ownerEmail). Not tenant DB passwords. */
platformOwnersRouter.get(
  '/',
  platformAuth,
  asyncHandler(async (_req, res) => {
    const registry = getRegistryClient();
    const rows = await registry.owner.findMany({
      orderBy: { createdAt: 'desc' },
      include: { tenant: { select: { id: true, slug: true, name: true, isActive: true } } },
    });
    res.json({
      owners: rows.map((o) => ({
        id: o.id,
        tenantId: o.tenantId,
        tenantSlug: o.tenant.slug,
        tenantName: o.tenant.name,
        tenantActive: o.tenant.isActive,
        email: o.email,
        fullName: o.fullName,
        createdAt: o.createdAt.toISOString(),
      })),
    });
  }),
);
