import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getRegistryClient } from '../../db/registry';
import { StaffRole } from '../../db/tenant-client';
import { getTenantPrisma, removeTenantFromPool } from '../../db/tenantPool';
import { asyncHandler } from '../../http/asyncHandler';
import { sendError } from '../../http/errorResponse';
import { paramId } from '../../http/paramId';
import { platformAuth } from '../../middleware/platformAuth';
import { env } from '../../config/env';
import { upsertStaffLoginDirectory } from '../../services/staffLoginDirectory';

const bodySchema = z
  .object({
    slug: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/),
    name: z.string().min(1).max(200),
    databaseUrl: z.string().min(1),
    ownerEmail: z.string().email().optional(),
    ownerPassword: z.string().min(8).optional(),
    ownerFullName: z.string().min(1).max(200).optional(),
  })
  .refine(
    (d) => {
      const hasAny = !!(d.ownerEmail || d.ownerPassword || d.ownerFullName);
      if (!hasAny) return true;
      return !!(d.ownerEmail && d.ownerPassword && d.ownerFullName);
    },
    { message: 'ownerEmail, ownerPassword, and ownerFullName must be set together' },
  );

export const platformTenantsRouter = Router();

const patchSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  isActive: z.boolean().optional(),
  databaseUrl: z.string().min(1).optional(),
});

platformTenantsRouter.get(
  '/',
  platformAuth,
  asyncHandler(async (_req, res) => {
    const registry = getRegistryClient();
    const rows = await registry.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json({ tenants: rows });
  }),
);

platformTenantsRouter.get(
  '/:id',
  platformAuth,
  asyncHandler(async (req, res) => {
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const row = await registry.tenant.findFirst({
      where: {
        OR: [{ id: key }, { slug: key }],
      },
    });
    if (!row) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    res.json({
      tenant: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        databaseUrl: row.databaseUrl,
        isActive: row.isActive,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    });
  }),
);

platformTenantsRouter.patch(
  '/:id',
  platformAuth,
  asyncHandler(async (req, res) => {
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const existing = await registry.tenant.findFirst({
      where: { OR: [{ id: key }, { slug: key }] },
    });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    const row = await registry.tenant.update({
      where: { id: existing.id },
      data: {
        ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
        ...('isActive' in parsed.data ? { isActive: parsed.data.isActive } : {}),
        ...('databaseUrl' in parsed.data && parsed.data.databaseUrl !== undefined
          ? { databaseUrl: parsed.data.databaseUrl }
          : {}),
      },
    });
    res.json({
      tenant: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        databaseUrl: row.databaseUrl,
        isActive: row.isActive,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    });
  }),
);

platformTenantsRouter.delete(
  '/:id',
  platformAuth,
  asyncHandler(async (req, res) => {
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const existing = await registry.tenant.findFirst({
      where: { OR: [{ id: key }, { slug: key }] },
    });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    removeTenantFromPool(existing.id);
    await registry.tenant.delete({ where: { id: existing.id } });
    res.status(204).end();
  }),
);

platformTenantsRouter.post(
  '/',
  platformAuth,
  asyncHandler(async (req, res) => {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    const { slug, name, databaseUrl, ownerEmail, ownerPassword, ownerFullName } = parsed.data;

    const registry = getRegistryClient();
    const existing = await registry.tenant.findUnique({ where: { slug } });
    if (existing) {
      sendError(res, 409, 'slug_taken', 'Tenant slug already exists');
      return;
    }

    const hasOwner =
      !!(ownerEmail && ownerPassword && ownerFullName);
    const ownerPasswordHash = hasOwner
      ? await bcrypt.hash(ownerPassword!, env.bcryptRounds)
      : null;

    const tenant = await registry.tenant.create({
      data: {
        slug,
        name,
        databaseUrl,
        ...(hasOwner && ownerPasswordHash
          ? {
              owners: {
                create: {
                  email: ownerEmail!.trim().toLowerCase(),
                  passwordHash: ownerPasswordHash,
                  fullName: ownerFullName!,
                },
              },
            }
          : {}),
      },
    });

    if (hasOwner && ownerPasswordHash) {
      try {
        const prisma = getTenantPrisma(tenant.id, databaseUrl);
        const createdStaff = await prisma.staff.create({
          data: {
            email: ownerEmail!.trim().toLowerCase(),
            passwordHash: ownerPasswordHash,
            fullName: ownerFullName!,
            role: StaffRole.owner,
          },
        });
        await upsertStaffLoginDirectory(getRegistryClient(), tenant.id, createdStaff.id, createdStaff.email);
      } catch (e) {
        sendError(
          res,
          500,
          'staff_bootstrap_failed',
          'Tenant was registered, but creating the owner in the tenant database failed. Ensure tenant migrations were applied to that database URL, then add a staff user manually or fix the DB and retry.',
          e instanceof Error ? { message: e.message } : String(e),
        );
        return;
      }
    }

    res.status(201).json({
      tenant: {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
      },
    });
  }),
);
