import type { CompositionSlotMode, Prisma, PrismaClient } from '../db/tenant-client';
import { resolveImageForClient } from '../http/imageUrl';
import type { Request } from 'express';

export type CompositionStepInput = {
  compositionTypeId: string;
  extraIds: string[];
};

export class CompositionValidationError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'CompositionValidationError';
  }
}

export type LoadedExtra = {
  id: string;
  name: string;
  image: string | null;
  /** Paid price (cents), maps Mongo `price`. */
  price: number;
  /** Supplement price (cents), maps Mongo `suppPrice`. */
  suppPrice: number;
  outOfStock: boolean;
  visible: boolean;
};

export type LoadedCompositionStep = {
  sortOrder: number;
  type: {
    id: string;
    name: string;
    label: string;
    message: string | null;
    min: number;
    max: number;
    payment: boolean;
    selection: boolean;
    mode: CompositionSlotMode;
    rows: { position: number; extra: LoadedExtra }[];
  };
};

export function extraAddonCents(payment: boolean, row: LoadedExtra): number {
  return payment ? Math.max(0, row.price) : Math.max(0, row.suppPrice);
}

/** Ordered composition slots for a product (for validation / pricing). */
export async function loadComposedProductSteps(
  prisma: PrismaClient | Prisma.TransactionClient,
  productId: string,
): Promise<LoadedCompositionStep[]> {
  const rows = await prisma.productComposition.findMany({
    where: { productId },
    orderBy: { sortOrder: 'asc' },
    include: {
      compositionType: {
        include: {
          extras: {
            orderBy: { position: 'asc' },
            include: { extra: true },
          },
        },
      },
    },
  });
  return rows.map((r) => ({
    sortOrder: r.sortOrder,
    type: {
      id: r.compositionType.id,
      name: r.compositionType.name,
      label: r.compositionType.label,
      message: r.compositionType.message,
      min: r.compositionType.min,
      max: r.compositionType.max,
      payment: r.compositionType.payment,
      selection: r.compositionType.selection,
      mode: r.compositionType.mode,
      rows: r.compositionType.extras.map((j) => ({
        position: j.position,
        extra: {
          id: j.extra.id,
          name: j.extra.name,
          image: j.extra.image,
          price: j.extra.price,
          suppPrice: j.extra.suppPrice,
          outOfStock: j.extra.outOfStock,
          visible: j.extra.visible,
        },
      })),
    },
  }));
}

export function resolveCompositionSelection(
  steps: LoadedCompositionStep[],
  input: CompositionStepInput[],
): { extraCents: number; snapshot: { steps: unknown[] } } {
  if (input.length !== steps.length) {
    throw new CompositionValidationError(
      'composition_step_count',
      `This product requires ${steps.length} composition step(s); got ${input.length}.`,
    );
  }

  const snapshotSteps: unknown[] = [];
  let extraCents = 0;

  for (let i = 0; i < steps.length; i++) {
    const slot = steps[i].type;
    const stepIn = input[i];
    if (stepIn.compositionTypeId !== slot.id) {
      throw new CompositionValidationError(
        'composition_type_order',
        'Composition steps must be sent in the same order as on the product (check compositionTypeId per step).',
      );
    }
    if (slot.mode === 'products') {
      throw new CompositionValidationError('composition_mode', 'products composition slots are not supported yet.');
    }

    const selected = stepIn.extraIds;
    if (selected.length < slot.min || selected.length > slot.max) {
      throw new CompositionValidationError(
        'composition_bounds',
        `"${slot.label || slot.name}": pick between ${slot.min} and ${slot.max} extra(s).`,
      );
    }

    const allowed = new Map(slot.rows.map((row) => [row.extra.id, row.extra]));
    const seen = new Set<string>();
    const picked: { id: string; name: string; extraCents: number }[] = [];

    for (const id of selected) {
      if (seen.has(id)) {
        throw new CompositionValidationError('duplicate_extra', 'Duplicate extra in the same step.');
      }
      seen.add(id);
      const row = allowed.get(id);
      if (!row) {
        throw new CompositionValidationError('invalid_extra', `Extra is not part of "${slot.name}".`);
      }
      if (!row.visible || row.outOfStock) {
        throw new CompositionValidationError('extra_unavailable', `"${row.name}" is not available.`);
      }
      const add = extraAddonCents(slot.payment, row);
      extraCents += add;
      picked.push({ id: row.id, name: row.name, extraCents: add });
    }

    snapshotSteps.push({
      compositionTypeId: slot.id,
      compositionTypeName: slot.name,
      compositionTypeLabel: slot.label,
      extraIds: selected,
      extras: picked,
    });
  }

  return { extraCents, snapshot: { steps: snapshotSteps } };
}

/** Product composition shape for clients: each step lists selectable `extras`. */
export function expandProductCompositionForClient(req: Request, steps: LoadedCompositionStep[]): unknown[] {
  return steps.map((s) => {
    const t = s.type;
    const extras = t.rows
      .filter((r) => r.extra.visible && !r.extra.outOfStock)
      .map((r) => {
        const row = r.extra;
        const ec = extraAddonCents(t.payment, row);
        return {
          _id: row.id,
          id: row.id,
          name: row.name,
          image: resolveImageForClient(req, row.image),
          price: ec / 100,
          priceCents: ec,
          suppPrice: row.suppPrice / 100,
          suppPriceCents: row.suppPrice,
          position: r.position,
          outOfStock: row.outOfStock,
        };
      })
      .sort((a, b) => a.position - b.position);

    return {
      _id: t.id,
      id: t.id,
      name: t.name,
      label: t.label,
      message: t.message,
      payment: t.payment,
      selection: t.selection,
      max: t.max,
      min: t.min,
      mode: t.mode,
      extras,
    };
  });
}
