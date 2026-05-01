import { Router } from 'express';
import { z } from 'zod';
import type { Extra } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { majorToCents } from '../../../http/money';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireRole } from '../../../middleware/requireRole';

const admin = requireRole('owner', 'manager');

/** Mongo-like extra JSON: `price` / `suppPrice` in main currency units; `_id` alias. */
export function extraToMongoShape(i: Extra): Record<string, unknown> {
  return {
    _id: i.id,
    id: i.id,
    name: i.name,
    image: i.image,
    price: i.price / 100,
    suppPrice: i.suppPrice / 100,
    priceCents: i.price,
    suppPriceCents: i.suppPrice,
    outOfStock: i.outOfStock,
    visible: i.visible,
    sortOrder: i.sortOrder,
    position: i.sortOrder,
    createdAt: i.createdAt,
  };
}

function extraPricesFromBody(body: {
  price?: number;
  priceCents?: number;
  suppPrice?: number;
  suppPriceCents?: number;
}): { price: number; suppPrice: number } {
  const price =
    body.priceCents !== undefined
      ? Math.round(body.priceCents)
      : body.price !== undefined
        ? majorToCents(body.price)
        : 0;
  const suppPrice =
    body.suppPriceCents !== undefined
      ? Math.round(body.suppPriceCents)
      : body.suppPrice !== undefined
        ? majorToCents(body.suppPrice)
        : 0;
  return { price, suppPrice };
}

const extraCreate = z.object({
  name: z.string().min(1).max(200),
  image: z.union([z.string().max(2048), z.null()]).optional(),
  /** Main currency units (Mongo-style). */
  price: z.number().nonnegative().optional(),
  priceCents: z.number().int().min(0).optional(),
  suppPrice: z.number().nonnegative().optional(),
  suppPriceCents: z.number().int().min(0).optional(),
  outOfStock: z.boolean().optional(),
  visible: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  position: z.number().int().optional(),
});

const extraPatch = extraCreate.partial();

const compositionTypeCreate = z.object({
  name: z.string().min(1).max(200),
  label: z.string().min(1).max(200),
  message: z.string().max(500).nullable().optional(),
  min: z.number().int().min(0).optional(),
  max: z.number().int().min(0).optional(),
  payment: z.boolean().optional(),
  selection: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  position: z.number().int().optional(),
});

const compositionTypePatch = compositionTypeCreate.partial().extend({
  isActive: z.boolean().optional(),
});

const replaceTypeExtras = z.object({
  extraIds: z.array(z.string().uuid()),
});

function sortFromBody(b: { sortOrder?: number; position?: number }): number {
  if (b.sortOrder !== undefined) return b.sortOrder;
  if (b.position !== undefined) return b.position;
  return 0;
}

/**
 * Composition + extra admin/list routes (Tacos-style types & extras).
 * Attach to the same `/catalog` router after `requireStaff` is applied.
 */
export function attachCompositionCatalogRoutes(router: Router): void {
  router.get(
    '/extras',
    asyncHandler(async (req, res) => {
      if (!req.tenant) return;
      const rows = await req.tenant.prisma.extra.findMany({
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      });
      res.json({ extras: rows.map((r) => extraToMongoShape(r)) });
    }),
  );

  router.post(
    '/extras',
    admin,
    asyncHandler(async (req, res) => {
      const parsed = extraCreate.safeParse(req.body);
      if (!parsed.success) {
        sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
        return;
      }
      if (!req.tenant) return;
      const cents = extraPricesFromBody(parsed.data);
      const row = await req.tenant.prisma.extra.create({
        data: {
          name: parsed.data.name,
          image: parsed.data.image ?? null,
          price: cents.price,
          suppPrice: cents.suppPrice,
          sortOrder: sortFromBody(parsed.data),
          ...(parsed.data.outOfStock !== undefined ? { outOfStock: parsed.data.outOfStock } : {}),
          ...(parsed.data.visible !== undefined ? { visible: parsed.data.visible } : {}),
        },
      });
      res.status(201).json({ extra: extraToMongoShape(row) });
    }),
  );

  router.patch(
    '/extras/:id',
    admin,
    asyncHandler(async (req, res) => {
      const parsed = extraPatch.safeParse(req.body);
      if (!parsed.success) {
        sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
        return;
      }
      if (!req.tenant) return;
      const id = paramId(req);
      if (!id) {
        sendError(res, 400, 'validation_error', 'Missing extra id');
        return;
      }
      const existing = await req.tenant.prisma.extra.findUnique({ where: { id } });
      if (!existing) {
        sendError(res, 404, 'not_found', 'Extra not found');
        return;
      }
      const sort =
        'sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
          ? parsed.data.sortOrder
          : 'position' in parsed.data && parsed.data.position !== undefined
            ? parsed.data.position
            : undefined;
      try {
        let price = existing.price;
        let suppPrice = existing.suppPrice;
        if ('priceCents' in parsed.data && parsed.data.priceCents !== undefined) {
          price = Math.round(parsed.data.priceCents);
        } else if ('price' in parsed.data && parsed.data.price !== undefined) {
          price = majorToCents(parsed.data.price);
        }
        if ('suppPriceCents' in parsed.data && parsed.data.suppPriceCents !== undefined) {
          suppPrice = Math.round(parsed.data.suppPriceCents);
        } else if ('suppPrice' in parsed.data && parsed.data.suppPrice !== undefined) {
          suppPrice = majorToCents(parsed.data.suppPrice);
        }

        const row = await req.tenant.prisma.extra.update({
          where: { id },
          data: {
            ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
            ...('image' in parsed.data ? { image: parsed.data.image ?? null } : {}),
            price,
            suppPrice,
            ...('outOfStock' in parsed.data ? { outOfStock: parsed.data.outOfStock } : {}),
            ...('visible' in parsed.data ? { visible: parsed.data.visible } : {}),
            ...(sort !== undefined ? { sortOrder: sort } : {}),
          },
        });
        res.json({ extra: extraToMongoShape(row) });
      } catch {
        sendError(res, 404, 'not_found', 'Extra not found');
      }
    }),
  );

  router.get(
    '/composition-types',
    asyncHandler(async (req, res) => {
      if (!req.tenant) return;
      const includeInactive =
        req.query.includeInactive === 'true' || req.query.includeInactive === '1';
      const rows = await req.tenant.prisma.compositionType.findMany({
        where: includeInactive ? {} : { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        include: {
          extras: {
            orderBy: { position: 'asc' },
            include: { extra: true },
          },
        },
      });
      const mapType = (t: (typeof rows)[number]) => ({
        _id: t.id,
        id: t.id,
        name: t.name,
        label: t.label,
        message: t.message,
        min: t.min,
        max: t.max,
        payment: t.payment,
        selection: t.selection,
        mode: t.mode,
        sortOrder: t.sortOrder,
        position: t.sortOrder,
        isActive: t.isActive,
        extraIds: t.extras.map((x) => x.extraId),
        extras: t.extras.map((x) => ({
          ...extraToMongoShape(x.extra),
          position: x.position,
        })),
      });
      const mapped = rows.map(mapType);
      res.json({
        compositionTypes: mapped,
        types: mapped,
      });
    }),
  );

  router.post(
    '/composition-types',
    admin,
    asyncHandler(async (req, res) => {
      const parsed = compositionTypeCreate.safeParse(req.body);
      if (!parsed.success) {
        sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
        return;
      }
      if (!req.tenant) return;
      const row = await req.tenant.prisma.compositionType.create({
        data: {
          name: parsed.data.name,
          label: parsed.data.label,
          message: parsed.data.message ?? null,
          min: parsed.data.min ?? 0,
          max: parsed.data.max ?? 1,
          payment: parsed.data.payment ?? false,
          selection: parsed.data.selection ?? false,
          sortOrder: sortFromBody(parsed.data),
        },
      });
      res.status(201).json({ compositionType: row });
    }),
  );

  router.patch(
    '/composition-types/:id',
    admin,
    asyncHandler(async (req, res) => {
      const parsed = compositionTypePatch.safeParse(req.body);
      if (!parsed.success) {
        sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
        return;
      }
      if (!req.tenant) return;
      const id = paramId(req);
      if (!id) {
        sendError(res, 400, 'validation_error', 'Missing composition type id');
        return;
      }
      const sort =
        'sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
          ? parsed.data.sortOrder
          : 'position' in parsed.data && parsed.data.position !== undefined
            ? parsed.data.position
            : undefined;
      try {
        const row = await req.tenant.prisma.compositionType.update({
          where: { id },
          data: {
            ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
            ...('label' in parsed.data && parsed.data.label !== undefined ? { label: parsed.data.label } : {}),
            ...('message' in parsed.data ? { message: parsed.data.message } : {}),
            ...('min' in parsed.data && parsed.data.min !== undefined ? { min: parsed.data.min } : {}),
            ...('max' in parsed.data && parsed.data.max !== undefined ? { max: parsed.data.max } : {}),
            ...('payment' in parsed.data ? { payment: parsed.data.payment } : {}),
            ...('selection' in parsed.data ? { selection: parsed.data.selection } : {}),
            ...(sort !== undefined ? { sortOrder: sort } : {}),
            ...('isActive' in parsed.data ? { isActive: parsed.data.isActive } : {}),
          },
        });
        res.json({ compositionType: row });
      } catch {
        sendError(res, 404, 'not_found', 'Composition type not found');
      }
    }),
  );

  router.delete(
    '/extras/:id',
    admin,
    asyncHandler(async (req, res) => {
      if (!req.tenant) return;
      const id = paramId(req);
      if (!id) {
        sendError(res, 400, 'validation_error', 'Missing extra id');
        return;
      }
      try {
        await req.tenant.prisma.extra.delete({ where: { id } });
        res.status(204).send();
      } catch {
        sendError(res, 404, 'not_found', 'Extra not found');
      }
    }),
  );

  router.delete(
    '/composition-types/:id',
    admin,
    asyncHandler(async (req, res) => {
      if (!req.tenant) return;
      const id = paramId(req);
      if (!id) {
        sendError(res, 400, 'validation_error', 'Missing composition type id');
        return;
      }
      const used = await req.tenant.prisma.productComposition.count({ where: { compositionTypeId: id } });
      if (used > 0) {
        sendError(res, 409, 'composition_type_in_use', 'Remove this type from all products before deleting it.', {
          productLinkCount: used,
        });
        return;
      }
      try {
        await req.tenant.prisma.compositionType.delete({ where: { id } });
        res.status(204).send();
      } catch {
        sendError(res, 404, 'not_found', 'Composition type not found');
      }
    }),
  );

  router.put(
    '/composition-types/:id/extras',
    admin,
    asyncHandler(async (req, res) => {
      const parsed = replaceTypeExtras.safeParse(req.body);
      if (!parsed.success) {
        sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
        return;
      }
      if (!req.tenant) return;
      const id = paramId(req);
      if (!id) {
        sendError(res, 400, 'validation_error', 'Missing composition type id');
        return;
      }
      const type = await req.tenant.prisma.compositionType.findFirst({ where: { id } });
      if (!type) {
        sendError(res, 404, 'not_found', 'Composition type not found');
        return;
      }
      const ids = parsed.data.extraIds;
      const found = await req.tenant.prisma.extra.findMany({ where: { id: { in: ids } } });
      if (found.length !== ids.length) {
        sendError(res, 400, 'validation_error', 'One or more extra ids are invalid');
        return;
      }
      await req.tenant.prisma.$transaction(async (tx) => {
        await tx.compositionTypeExtra.deleteMany({ where: { compositionTypeId: id } });
        let pos = 0;
        for (const extraId of ids) {
          await tx.compositionTypeExtra.create({
            data: { compositionTypeId: id, extraId, position: pos },
          });
          pos += 1;
        }
      });
      const updated = await req.tenant.prisma.compositionType.findFirst({
        where: { id },
        include: {
          extras: { orderBy: { position: 'asc' }, include: { extra: true } },
        },
      });
      if (!updated) {
        sendError(res, 404, 'not_found', 'Composition type not found');
        return;
      }
      res.json({
        compositionType: {
          ...updated,
          extras: updated.extras.map((x) => ({
            ...extraToMongoShape(x.extra),
            position: x.position,
          })),
        },
      });
    }),
  );
}
