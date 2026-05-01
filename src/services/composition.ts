import type { CompositionSlotMode, Prisma, PrismaClient } from '../db/tenant-client';
import { resolveImageForClient } from '../http/imageUrl';
import type { Request } from 'express';

export type CompositionStepInput = {
  compositionTypeId: string;
  ingredientIds: string[];
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

export type LoadedIngredient = {
  id: string;
  name: string;
  image: string | null;
  /** Ingredient paid price (cents), maps Mongo `price`. */
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
    rows: { position: number; ingredient: LoadedIngredient }[];
  };
};

export function ingredientLineExtraCents(payment: boolean, ing: LoadedIngredient): number {
  return payment ? Math.max(0, ing.price) : Math.max(0, ing.suppPrice);
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
          ingredients: {
            orderBy: { position: 'asc' },
            include: { ingredient: true },
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
      rows: r.compositionType.ingredients.map((j) => ({
        position: j.position,
        ingredient: {
          id: j.ingredient.id,
          name: j.ingredient.name,
          image: j.ingredient.image,
          price: j.ingredient.price,
          suppPrice: j.ingredient.suppPrice,
          outOfStock: j.ingredient.outOfStock,
          visible: j.ingredient.visible,
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
    if (slot.mode === 'PRODUCTS') {
      throw new CompositionValidationError('composition_mode', 'PRODUCTS composition slots are not supported yet.');
    }

    const selected = stepIn.ingredientIds;
    if (selected.length < slot.min || selected.length > slot.max) {
      throw new CompositionValidationError(
        'composition_bounds',
        `"${slot.label || slot.name}": pick between ${slot.min} and ${slot.max} ingredient(s).`,
      );
    }

    const allowed = new Map(slot.rows.map((row) => [row.ingredient.id, row.ingredient]));
    const seen = new Set<string>();
    const picked: { id: string; name: string; extraCents: number }[] = [];

    for (const id of selected) {
      if (seen.has(id)) {
        throw new CompositionValidationError('duplicate_ingredient', 'Duplicate ingredient in the same step.');
      }
      seen.add(id);
      const ing = allowed.get(id);
      if (!ing) {
        throw new CompositionValidationError('invalid_ingredient', `Ingredient is not part of "${slot.name}".`);
      }
      if (!ing.visible || ing.outOfStock) {
        throw new CompositionValidationError('ingredient_unavailable', `"${ing.name}" is not available.`);
      }
      const add = ingredientLineExtraCents(slot.payment, ing);
      extraCents += add;
      picked.push({ id: ing.id, name: ing.name, extraCents: add });
    }

    snapshotSteps.push({
      compositionTypeId: slot.id,
      compositionTypeName: slot.name,
      compositionTypeLabel: slot.label,
      ingredientIds: selected,
      ingredients: picked,
    });
  }

  return { extraCents, snapshot: { steps: snapshotSteps } };
}

/** Tacos-like `getProductData` shape for mobile: `types[].ingrediants`. */
export function expandProductCompositionForClient(req: Request, steps: LoadedCompositionStep[]): unknown[] {
  return steps.map((s) => {
    const t = s.type;
    const ingrediants = t.rows
      .filter((r) => r.ingredient.visible && !r.ingredient.outOfStock)
      .map((r) => {
        const ing = r.ingredient;
        const extraCents = ingredientLineExtraCents(t.payment, ing);
        return {
          _id: ing.id,
          id: ing.id,
          name: ing.name,
          image: resolveImageForClient(req, ing.image),
          price: extraCents / 100,
          priceCents: extraCents,
          suppPrice: ing.suppPrice / 100,
          suppPriceCents: ing.suppPrice,
          position: r.position,
          outOfStock: ing.outOfStock,
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
      ingrediants,
      ingredients: ingrediants,
    };
  });
}
