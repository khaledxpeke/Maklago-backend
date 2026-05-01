import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Router, type Request } from 'express';
import multer from 'multer';
import type { Category, Prisma, Product } from '../../../db/tenant-client';
import { z } from 'zod';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { resolveImageForClient, normalizeImageForStorage } from '../../../http/imageUrl';
import { requireRole } from '../../../middleware/requireRole';
import { requireStaff } from '../../../middleware/requireStaff';
import { expandProductCompositionForClient, extraAddonCents, loadComposedProductSteps, type LoadedExtra } from '../../../services/composition';
import { majorToCents, resolvePriceCents } from '../../../http/money';
import { attachCompositionCatalogRoutes } from './catalogComposition';

export const catalogRouter = Router();

catalogRouter.use(requireStaff);

const ALLOWED_IMAGE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      const tenant = req.tenant;
      if (!tenant) {
        cb(new Error('tenant_required'), '');
        return;
      }
      const dir = path.join(process.cwd(), 'uploads', tenant.id);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_IMAGE_MIME.has(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPEG, PNG, WebP, or GIF images are allowed'));
  },
});

function sortOrderFromBody(b: { sortOrder?: number; position?: number }): number {
  if (b.sortOrder !== undefined) return b.sortOrder;
  if (b.position !== undefined) return b.position;
  return 0;
}

function categoryToJson(
  req: Request,
  c: Category & { _count?: { products: number } },
): Record<string, unknown> {
  const productCount = c._count?.products ?? 0;
  return {
    id: c.id,
    name: c.name,
    sortOrder: c.sortOrder,
    position: c.sortOrder,
    productCount,
    image: resolveImageForClient(req, c.image),
    isActive: c.isActive,
  };
}

type ProductListRow = Product & {
  category: { id: string; name: string };
  compositions?: { compositionTypeId: string }[];
};

function productToJson(req: Request, p: ProductListRow): Record<string, unknown> {
  const comp = p.compositions ?? [];
  return {
    _id: p.id,
    id: p.id,
    categoryId: p.categoryId,
    categoryName: p.category.name,
    categories: [p.categoryId],
    name: p.name,
    description: p.description,
    kind: p.kind,
    type: comp.map((c) => c.compositionTypeId),
    compositionStepCount: comp.length,
    priceCents: p.price,
    price: p.price / 100,
    formulePriceCents: p.formulePrice,
    formulePrice: p.formulePrice / 100,
    taxRateBps: p.taxRateBps,
    tva: p.taxRateBps != null ? p.taxRateBps / 100 : null,
    modifiers: p.modifiers,
    discountValueCents: p.discountValue,
    discountValue: p.discountValue / 100,
    originalPriceCents: p.originalPrice,
    originalPrice: p.originalPrice != null ? p.originalPrice / 100 : null,
    discountStartDate: p.discountStartDate,
    discountEndDate: p.discountEndDate,
    sortOrder: p.sortOrder,
    position: p.sortOrder,
    isActive: p.isActive,
    visible: p.isActive,
    outOfStock: p.outOfStock,
    image: resolveImageForClient(req, p.image),
  };
}

async function replaceProductCompositions(
  tx: Prisma.TransactionClient,
  productId: string,
  compositionTypeIds: string[],
): Promise<void> {
  await tx.productComposition.deleteMany({ where: { productId } });
  let sortOrder = 0;
  for (const compositionTypeId of compositionTypeIds) {
    await tx.productComposition.create({
      data: { productId, compositionTypeId, sortOrder },
    });
    sortOrder += 1;
  }
}

function mobileMenuIngredient(
  req: Request,
  payment: boolean,
  row: { position: number; extra: LoadedExtra },
): Record<string, unknown> {
  const e = row.extra;
  const ec = extraAddonCents(payment, e);
  const effectiveMajor = ec / 100;
  const originalMajor = payment ? e.price / 100 : e.suppPrice / 100;
  return {
    _id: e.id,
    name: e.name,
    image: resolveImageForClient(req, e.image) ?? '',
    price: effectiveMajor,
    originalPrice: originalMajor,
    outOfStock: e.outOfStock,
  };
}

function mobileMenuTypes(
  req: Request,
  steps: Awaited<ReturnType<typeof loadComposedProductSteps>>,
): unknown[] {
  return steps.map((s) => {
    const t = s.type;
    const extras = t.rows
      .filter((r) => r.extra.visible)
      .sort((a, b) => a.position - b.position)
      .map((r) => mobileMenuIngredient(req, t.payment, r));
    return {
      _id: t.id,
      name: t.name,
      message: t.message ?? '',
      selection: t.selection,
      max: t.max,
      min: t.min,
      mode: t.mode,
      extras,
    };
  });
}

async function mobileMenuProduct(
  req: Request,
  prisma: Parameters<typeof loadComposedProductSteps>[0],
  p: ProductListRow,
): Promise<Record<string, unknown>> {
  const priceMajor = p.price / 100;
  const originalMajor = p.originalPrice != null ? p.originalPrice / 100 : priceMajor;
  let type: unknown[] = [];
  if (p.kind === 'composed') {
    const steps = await loadComposedProductSteps(prisma, p.id);
    type = mobileMenuTypes(req, steps);
  }
  return {
    _id: p.id,
    category: p.category.name,
    name: p.name,
    image: resolveImageForClient(req, p.image) ?? '',
    description: p.description ?? '',
    price: priceMajor,
    originalPrice: originalMajor,
    kind: p.kind,
    outOfStock: p.outOfStock,
    isActive: p.isActive,
    type,
  };
}

function mobileMenuCategory(
  req: Request,
  cat: Pick<Category, 'id' | 'name' | 'image'>,
  products: Record<string, unknown>[],
): Record<string, unknown> {
  return {
    _id: cat.id,
    name: cat.name,
    image: resolveImageForClient(req, cat.image) ?? '',
    products,
  };
}

catalogRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const rows = await req.tenant.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: true } } },
    });
    res.json({
      categories: rows.map((c) => categoryToJson(req, c)),
    });
  }),
);

catalogRouter.get(
  '/categories/menu',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const { prisma } = req.tenant;
    const rows = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        products: {
          where: { isActive: true },
          orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
          include: {
            category: { select: { id: true, name: true } },
            compositions: { select: { compositionTypeId: true }, orderBy: { sortOrder: 'asc' } },
          },
        },
      },
    });

    const categories = await Promise.all(
      rows.map(async (c) => {
        const { products: catProducts, ...catRest } = c;
        const productsPayload = await Promise.all(
          catProducts.map((p) => mobileMenuProduct(req, prisma, p)),
        );
        return mobileMenuCategory(req, catRest, productsPayload);
      }),
    );

    res.json({
      categories,
    });
  }),
);

catalogRouter.get(
  '/products',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const categoryId = typeof req.query.categoryId === 'string' ? req.query.categoryId : undefined;
    const rows = await req.tenant.prisma.product.findMany({
      where: {
        isActive: true,
        ...(categoryId ? { categoryId } : {}),
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        category: { select: { id: true, name: true } },
        compositions: { select: { compositionTypeId: true }, orderBy: { sortOrder: 'asc' } },
      },
    });
    res.json({
      products: rows.map((p) => productToJson(req, p)),
    });
  }),
);

catalogRouter.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing product id');
      return;
    }
    const p = await req.tenant.prisma.product.findFirst({
      where: { id, isActive: true },
      include: {
        category: { select: { id: true, name: true } },
        compositions: { select: { compositionTypeId: true }, orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!p) {
      sendError(res, 404, 'not_found', 'Product not found');
      return;
    }
    const steps = await loadComposedProductSteps(req.tenant.prisma, p.id);
    const types = p.kind === 'composed' ? expandProductCompositionForClient(req, steps) : [];
    res.json({
      product: productToJson(req, p),
      types,
    });
  }),
);

const admin = requireRole('owner', 'manager');

const imageField = z.union([z.string().max(2048), z.null()]).optional();

const categoryCreate = z.object({
  name: z.string().min(1).max(200),
  sortOrder: z.number().int().optional(),
  position: z.number().int().optional(),
  image: imageField,
});

const categoryPatch = z.object({
  name: z.string().min(1).max(200).optional(),
  sortOrder: z.number().int().optional(),
  position: z.number().int().optional(),
  image: imageField,
  isActive: z.boolean().optional(),
});

catalogRouter.post(
  '/upload',
  admin,
  (req, res, next) => {
    upload.single('file')(req, res, (err: unknown) => {
      if (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed';
        sendError(res, 400, 'upload_error', msg);
        return;
      }
      next();
    });
  },
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const file = req.file;
    if (!file?.filename) {
      sendError(res, 400, 'validation_error', 'Expected multipart field `file`');
      return;
    }
    const rel = `/uploads/${req.tenant.id}/${file.filename}`;
    res.status(201).json({
      url: resolveImageForClient(req, rel),
      path: rel,
    });
  }),
);

catalogRouter.post(
  '/categories',
  admin,
  asyncHandler(async (req, res) => {
    const parsed = categoryCreate.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const img = normalizeImageForStorage(parsed.data.image);
    const c = await req.tenant.prisma.category.create({
      data: {
        name: parsed.data.name,
        sortOrder: sortOrderFromBody(parsed.data),
        ...(img !== undefined ? { image: img } : {}),
      },
    });
    res.status(201).json({ category: categoryToJson(req, { ...c, _count: { products: 0 } }) });
  }),
);

catalogRouter.patch(
  '/categories/:id',
  admin,
  asyncHandler(async (req, res) => {
    const parsed = categoryPatch.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing category id');
      return;
    }
    const sort =
      'sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
        ? parsed.data.sortOrder
        : 'position' in parsed.data && parsed.data.position !== undefined
          ? parsed.data.position
          : undefined;
    const img = normalizeImageForStorage(parsed.data.image);
    try {
      const c = await req.tenant.prisma.category.update({
        where: { id },
        data: {
          ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
          ...(sort !== undefined ? { sortOrder: sort } : {}),
          ...('isActive' in parsed.data ? { isActive: parsed.data.isActive } : {}),
          ...(img !== undefined ? { image: img } : {}),
        },
        include: { _count: { select: { products: true } } },
      });
      res.json({ category: categoryToJson(req, c) });
    } catch {
      sendError(res, 404, 'not_found', 'Category not found');
    }
  }),
);

catalogRouter.delete(
  '/categories/:id',
  admin,
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing category id');
      return;
    }
    try {
      await req.tenant.prisma.$transaction(async (tx) => {
        await tx.product.updateMany({ where: { categoryId: id }, data: { isActive: false } });
        await tx.category.update({ where: { id }, data: { isActive: false } });
      });
      res.status(204).send();
    } catch {
      sendError(res, 404, 'not_found', 'Category not found');
    }
  }),
);

/** Resolve catalog kind on create: explicit `kind`, or infer composed when `compositionTypeIds` is non-empty. */
function resolveProductKindOnCreate(
  kind: 'simple' | 'composed' | undefined,
  compositionTypeIds: string[] | undefined,
): 'simple' | 'composed' {
  if (kind !== undefined) return kind;
  if (compositionTypeIds && compositionTypeIds.length > 0) return 'composed';
  return 'simple';
}

const productCreate = z
  .object({
    categoryId: z.string().uuid(),
    name: z.string().min(1).max(300),
    description: z.string().max(5000).nullable().optional(),
    /** Main currency units (Mongo-style); alternative to `priceCents`. */
    price: z.number().nonnegative().optional(),
    priceCents: z.number().int().min(0).optional(),
    formulePrice: z.number().nonnegative().optional(),
    formulePriceCents: z.number().int().min(0).optional(),
    discountValue: z.number().nonnegative().optional(),
    discountValueCents: z.number().int().min(0).optional(),
    originalPrice: z.number().nonnegative().nullable().optional(),
    originalPriceCents: z.number().int().min(0).nullable().optional(),
    discountStartDate: z.coerce.date().nullable().optional(),
    discountEndDate: z.coerce.date().nullable().optional(),
    taxRateBps: z.number().int().min(0).max(100_000).nullable().optional(),
    modifiers: z.unknown().optional(),
    sortOrder: z.number().int().optional(),
    position: z.number().int().optional(),
    image: imageField,
    outOfStock: z.boolean().optional(),
    kind: z.enum(['simple', 'composed']).optional(),
    compositionTypeIds: z.array(z.string().uuid()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.price === undefined && data.priceCents === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: 'Provide `price` (main currency) or `priceCents`.',
        path: ['price'],
      });
    }
  });

const productPatch = z.object({
  categoryId: z.string().uuid().optional(),
  name: z.string().min(1).max(300).optional(),
  description: z.string().max(5000).nullable().optional(),
  price: z.number().nonnegative().optional(),
  priceCents: z.number().int().min(0).optional(),
  formulePrice: z.number().nonnegative().optional(),
  formulePriceCents: z.number().int().min(0).optional(),
  discountValue: z.number().nonnegative().optional(),
  discountValueCents: z.number().int().min(0).optional(),
  originalPrice: z.number().nonnegative().nullable().optional(),
  originalPriceCents: z.number().int().min(0).nullable().optional(),
  discountStartDate: z.coerce.date().nullable().optional(),
  discountEndDate: z.coerce.date().nullable().optional(),
  taxRateBps: z.number().int().min(0).max(100_000).nullable().optional(),
  modifiers: z.unknown().optional(),
  sortOrder: z.number().int().optional(),
  position: z.number().int().optional(),
  image: imageField,
  isActive: z.boolean().optional(),
  outOfStock: z.boolean().optional(),
  kind: z.enum(['simple', 'composed']).optional(),
  compositionTypeIds: z.array(z.string().uuid()).optional(),
});

catalogRouter.post(
  '/products',
  admin,
  asyncHandler(async (req, res) => {
    const parsed = productCreate.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const cat = await req.tenant.prisma.category.findFirst({
      where: { id: parsed.data.categoryId },
    });
    if (!cat) {
      sendError(res, 400, 'category_not_found', 'Category not found');
      return;
    }
    const img = normalizeImageForStorage(parsed.data.image);
    const kind = resolveProductKindOnCreate(parsed.data.kind, parsed.data.compositionTypeIds);
    const compIds = parsed.data.compositionTypeIds;
    if (kind === 'composed' && (!compIds || compIds.length === 0)) {
      sendError(res, 400, 'validation_error', 'composed products require compositionTypeIds (ordered steps).');
      return;
    }
    if (kind === 'simple' && compIds && compIds.length > 0) {
      sendError(res, 400, 'validation_error', 'simple products cannot have compositionTypeIds.');
      return;
    }
    if (kind === 'composed' && compIds) {
      const types = await req.tenant.prisma.compositionType.findMany({
        where: { id: { in: compIds }, isActive: true },
      });
      if (types.length !== compIds.length) {
        sendError(res, 400, 'validation_error', 'One or more compositionTypeIds are invalid or inactive.');
        return;
      }
    }

    const priceMain = resolvePriceCents(parsed.data);
    if (priceMain === null) {
      sendError(res, 400, 'validation_error', 'Missing price');
      return;
    }
    const formule =
      parsed.data.formulePriceCents ??
      (parsed.data.formulePrice !== undefined ? majorToCents(parsed.data.formulePrice) : 0);
    const disc =
      parsed.data.discountValueCents ??
      (parsed.data.discountValue !== undefined ? majorToCents(parsed.data.discountValue) : 0);
    const orig =
      parsed.data.originalPriceCents !== undefined
        ? parsed.data.originalPriceCents
        : parsed.data.originalPrice != null
          ? majorToCents(parsed.data.originalPrice)
          : null;

    const p = await req.tenant.prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          categoryId: parsed.data.categoryId,
          name: parsed.data.name,
          description: parsed.data.description ?? null,
          kind,
          price: priceMain,
          formulePrice: formule,
          discountValue: disc,
          originalPrice: orig,
          discountStartDate: parsed.data.discountStartDate ?? undefined,
          discountEndDate: parsed.data.discountEndDate ?? undefined,
          taxRateBps: parsed.data.taxRateBps ?? null,
          modifiers: parsed.data.modifiers ?? undefined,
          sortOrder: sortOrderFromBody(parsed.data),
          ...(parsed.data.outOfStock !== undefined ? { outOfStock: parsed.data.outOfStock } : {}),
          ...(img !== undefined ? { image: img } : {}),
        },
      });
      if (kind === 'composed' && compIds?.length) {
        await replaceProductCompositions(tx, created.id, compIds);
      }
      return tx.product.findFirstOrThrow({
        where: { id: created.id },
        include: {
          category: { select: { id: true, name: true } },
          compositions: { select: { compositionTypeId: true }, orderBy: { sortOrder: 'asc' } },
        },
      });
    });

    res.status(201).json({ product: productToJson(req, p) });
  }),
);

catalogRouter.patch(
  '/products/:id',
  admin,
  asyncHandler(async (req, res) => {
    const parsed = productPatch.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing product id');
      return;
    }
    if (parsed.data.categoryId) {
      const cat = await req.tenant.prisma.category.findFirst({
        where: { id: parsed.data.categoryId },
      });
      if (!cat) {
        sendError(res, 400, 'category_not_found', 'Category not found');
        return;
      }
    }
    const sort =
      'sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
        ? parsed.data.sortOrder
        : 'position' in parsed.data && parsed.data.position !== undefined
          ? parsed.data.position
          : undefined;
    const img = normalizeImageForStorage(parsed.data.image);
    const kindExplicit = 'kind' in parsed.data && parsed.data.kind !== undefined ? parsed.data.kind : undefined;
    const compIds = 'compositionTypeIds' in parsed.data ? parsed.data.compositionTypeIds : undefined;

    try {
      const p = await req.tenant.prisma.$transaction(async (tx) => {
        const existing = await tx.product.findFirst({ where: { id } });
        if (!existing) return null;

        let nextKind = kindExplicit !== undefined ? kindExplicit : existing.kind;

        if (nextKind === 'composed' && compIds !== undefined && compIds.length === 0) {
          throw new Error('composed_needs_steps');
        }
        if (nextKind === 'simple' && compIds !== undefined && compIds.length > 0) {
          throw new Error('simple_no_composition');
        }
        if (nextKind === 'composed' && existing.kind === 'simple' && (compIds === undefined || compIds.length === 0)) {
          throw new Error('composed_needs_steps');
        }

        if (compIds && compIds.length > 0) {
          const types = await tx.compositionType.findMany({
            where: { id: { in: compIds }, isActive: true },
          });
          if (types.length !== compIds.length) {
            throw new Error('invalid_composition_types');
          }
        }

        const pricePatch = resolvePriceCents(parsed.data);
        const formulePatch =
          parsed.data.formulePriceCents !== undefined ||
          parsed.data.formulePrice !== undefined
            ? parsed.data.formulePriceCents ??
              (parsed.data.formulePrice !== undefined ? majorToCents(parsed.data.formulePrice) : 0)
            : undefined;
        const discountPatch =
          parsed.data.discountValueCents !== undefined ||
          parsed.data.discountValue !== undefined
            ? parsed.data.discountValueCents ??
              (parsed.data.discountValue !== undefined ? majorToCents(parsed.data.discountValue) : 0)
            : undefined;
        const originalPatch =
          parsed.data.originalPriceCents !== undefined
            ? parsed.data.originalPriceCents
            : parsed.data.originalPrice !== undefined
              ? parsed.data.originalPrice === null
                ? null
                : majorToCents(parsed.data.originalPrice)
              : undefined;

        const updated = await tx.product.update({
          where: { id },
          data: {
            ...('categoryId' in parsed.data && parsed.data.categoryId !== undefined
              ? { categoryId: parsed.data.categoryId }
              : {}),
            ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
            ...('description' in parsed.data ? { description: parsed.data.description } : {}),
            ...(kindExplicit !== undefined ? { kind: nextKind } : {}),
            ...(pricePatch !== null ? { price: pricePatch } : {}),
            ...(formulePatch !== undefined ? { formulePrice: formulePatch } : {}),
            ...(discountPatch !== undefined ? { discountValue: discountPatch } : {}),
            ...(originalPatch !== undefined ? { originalPrice: originalPatch } : {}),
            ...('discountStartDate' in parsed.data ? { discountStartDate: parsed.data.discountStartDate } : {}),
            ...('discountEndDate' in parsed.data ? { discountEndDate: parsed.data.discountEndDate } : {}),
            ...('taxRateBps' in parsed.data ? { taxRateBps: parsed.data.taxRateBps } : {}),
            ...('modifiers' in parsed.data ? { modifiers: parsed.data.modifiers ?? undefined } : {}),
            ...(sort !== undefined ? { sortOrder: sort } : {}),
            ...('isActive' in parsed.data ? { isActive: parsed.data.isActive } : {}),
            ...('outOfStock' in parsed.data ? { outOfStock: parsed.data.outOfStock } : {}),
            ...(img !== undefined ? { image: img } : {}),
          },
        });

        const finalKind = updated.kind;
        if (compIds !== undefined) {
          if (finalKind === 'composed') {
            await replaceProductCompositions(tx, id, compIds);
          } else {
            await tx.productComposition.deleteMany({ where: { productId: id } });
          }
        } else if (finalKind === 'simple') {
          await tx.productComposition.deleteMany({ where: { productId: id } });
        }

        return tx.product.findFirstOrThrow({
          where: { id },
          include: {
            category: { select: { id: true, name: true } },
            compositions: { select: { compositionTypeId: true }, orderBy: { sortOrder: 'asc' } },
          },
        });
      });

      if (!p) {
        sendError(res, 404, 'not_found', 'Product not found');
        return;
      }
      res.json({ product: productToJson(req, p) });
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      if (msg === 'composed_needs_steps') {
        sendError(res, 400, 'validation_error', 'composed products need at least one compositionTypeId.');
        return;
      }
      if (msg === 'simple_no_composition') {
        sendError(res, 400, 'validation_error', 'simple products cannot have composition steps.');
        return;
      }
      if (msg === 'invalid_composition_types') {
        sendError(res, 400, 'validation_error', 'One or more compositionTypeIds are invalid or inactive.');
        return;
      }
      sendError(res, 404, 'not_found', 'Product not found');
    }
  }),
);

attachCompositionCatalogRoutes(catalogRouter);

catalogRouter.delete(
  '/products/:id',
  admin,
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing product id');
      return;
    }
    try {
      await req.tenant.prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
      res.status(204).send();
    } catch {
      sendError(res, 404, 'not_found', 'Product not found');
    }
  }),
);
