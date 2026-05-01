/**
 * Seeds registry tenant `demo` and sample catalog + staff in the tenant database.
 * Run after migrations: `npm run seed`
 */
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';
import { upsertStaffLoginDirectory } from '../services/staffLoginDirectory';

/** Stable Unsplash URLs for demo catalog images (no local upload required). */
const DEMO_IMAGES = {
  categoryDrinks:
    'https://images.unsplash.com/photo-1437418747212-8d9709a3e9e2?w=800&q=80&auto=format&fit=crop',
  categoryFood:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop',
  productCoffee:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop',
  productSandwich:
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80&auto=format&fit=crop',
  productJuice:
    'https://images.unsplash.com/photo-1622597467836-f6abf83c8ac9?w=800&q=80&auto=format&fit=crop',
  productComposed:
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80&auto=format&fit=crop',
} as const;

async function main(): Promise<void> {
  if (!process.env.REGISTRY_DATABASE_URL || !process.env.TENANT_DATABASE_URL) {
    throw new Error('REGISTRY_DATABASE_URL and TENANT_DATABASE_URL must be set');
  }

  const registry = getRegistryClient();
  const tenantDbUrl = process.env.TENANT_DATABASE_URL;

  const platformEmail = process.env.PLATFORM_ADMIN_EMAIL ?? 'admin@maklago.local';
  const platformPassword = process.env.PLATFORM_ADMIN_PASSWORD ?? 'admin123456';
  const platformHash = await bcrypt.hash(platformPassword, env.bcryptRounds);
  await registry.platformAdmin.upsert({
    where: { email: platformEmail },
    create: {
      email: platformEmail,
      passwordHash: platformHash,
      fullName: 'Platform Admin',
    },
    update: { passwordHash: platformHash },
  });
  console.log('Platform admin (super admin):', platformEmail, '/', platformPassword);

  let tenant = await registry.tenant.findUnique({ where: { slug: 'demo' } });
  if (!tenant) {
    tenant = await registry.tenant.create({
      data: {
        slug: 'demo',
        name: 'Demo Restaurant',
        databaseUrl: tenantDbUrl,
      },
    });
    console.log('Created registry tenant', tenant.slug, tenant.id);
  } else {
    if (tenant.databaseUrl !== tenantDbUrl) {
      tenant = await registry.tenant.update({
        where: { id: tenant.id },
        data: { databaseUrl: tenantDbUrl },
      });
      console.log('Updated tenant databaseUrl for demo');
    }
  }

  const prisma = getTenantPrisma(tenant.id, tenant.databaseUrl);

  const email = 'cashier@demo.local';
  const password = 'demo123456';
  const hash = await bcrypt.hash(password, env.bcryptRounds);

  const demoStaff = await prisma.staff.upsert({
    where: { email },
    create: {
      email,
      passwordHash: hash,
      fullName: 'Demo Cashier',
      role: 'MANAGER',
    },
    update: { passwordHash: hash },
  });
  await upsertStaffLoginDirectory(registry, tenant.id, demoStaff.id, demoStaff.email);
  console.log('Staff:', email, '/', password);

  const catDrinks = await prisma.category.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' },
    create: {
      id: '00000000-0000-4000-8000-000000000001',
      name: 'Drinks',
      sortOrder: 0,
      image: DEMO_IMAGES.categoryDrinks,
    },
    update: { name: 'Drinks', image: DEMO_IMAGES.categoryDrinks },
  });

  const catFood = await prisma.category.upsert({
    where: { id: '00000000-0000-4000-8000-000000000002' },
    create: {
      id: '00000000-0000-4000-8000-000000000002',
      name: 'Food',
      sortOrder: 1,
      image: DEMO_IMAGES.categoryFood,
    },
    update: { name: 'Food', image: DEMO_IMAGES.categoryFood },
  });

  await prisma.product.upsert({
    where: { id: '00000000-0000-4000-8000-000000000101' },
    create: {
      id: '00000000-0000-4000-8000-000000000101',
      categoryId: catDrinks.id,
      name: 'Coffee',
      kind: 'SIMPLE',
      description: 'House blend. Hot or iced.',
      image: DEMO_IMAGES.productCoffee,
      price: 250,
      taxRateBps: 1000,
      sortOrder: 0,
      outOfStock: false,
      modifiers: [
        { id: 'milk', name: 'Extra milk', price: 0.5 },
        { id: 'syrup', name: 'Syrup', price: 0.75 },
      ],
    },
    update: {
      kind: 'SIMPLE',
      description: 'House blend. Hot or iced.',
      image: DEMO_IMAGES.productCoffee,
      price: 250,
      taxRateBps: 1000,
      outOfStock: false,
      modifiers: [
        { id: 'milk', name: 'Extra milk', price: 0.5 },
        { id: 'syrup', name: 'Syrup', price: 0.75 },
      ],
    },
  });

  await prisma.product.upsert({
    where: { id: '00000000-0000-4000-8000-000000000102' },
    create: {
      id: '00000000-0000-4000-8000-000000000102',
      categoryId: catFood.id,
      name: 'Sandwich',
      kind: 'SIMPLE',
      description: 'Ham, cheese, and greens on a toasted baguette.',
      image: DEMO_IMAGES.productSandwich,
      price: 899,
      taxRateBps: 1000,
      sortOrder: 0,
      outOfStock: false,
    },
    update: {
      kind: 'SIMPLE',
      description: 'Ham, cheese, and greens on a toasted baguette.',
      image: DEMO_IMAGES.productSandwich,
      price: 899,
      taxRateBps: 1000,
      outOfStock: false,
    },
  });

  await prisma.product.upsert({
    where: { id: '00000000-0000-4000-8000-000000000103' },
    create: {
      id: '00000000-0000-4000-8000-000000000103',
      categoryId: catDrinks.id,
      name: 'Fresh orange juice',
      kind: 'SIMPLE',
      description: 'Pressed daily. Currently unavailable (demo out-of-stock).',
      image: DEMO_IMAGES.productJuice,
      price: 450,
      sortOrder: 1,
      outOfStock: true,
    },
    update: {
      kind: 'SIMPLE',
      description: 'Pressed daily. Currently unavailable (demo out-of-stock).',
      image: DEMO_IMAGES.productJuice,
      price: 450,
      sortOrder: 1,
      outOfStock: true,
    },
  });

  const exHarissa = await prisma.extra.upsert({
    where: { id: '00000000-0000-4000-8000-000000000301' },
    create: {
      id: '00000000-0000-4000-8000-000000000301',
      name: 'Harissa',
      suppPrice: 0,
      price: 0,
      sortOrder: 0,
    },
    update: { name: 'Harissa', suppPrice: 0 },
  });
  const exMayo = await prisma.extra.upsert({
    where: { id: '00000000-0000-4000-8000-000000000302' },
    create: {
      id: '00000000-0000-4000-8000-000000000302',
      name: 'Mayonnaise',
      suppPrice: 50,
      price: 0,
      sortOrder: 1,
    },
    update: { name: 'Mayonnaise', suppPrice: 50 },
  });
  const exSalad = await prisma.extra.upsert({
    where: { id: '00000000-0000-4000-8000-000000000303' },
    create: {
      id: '00000000-0000-4000-8000-000000000303',
      name: 'Salade',
      suppPrice: 0,
      price: 0,
      sortOrder: 0,
    },
    update: { name: 'Salade' },
  });
  const exOnion = await prisma.extra.upsert({
    where: { id: '00000000-0000-4000-8000-000000000304' },
    create: {
      id: '00000000-0000-4000-8000-000000000304',
      name: 'Oignons',
      suppPrice: 25,
      price: 0,
      sortOrder: 1,
    },
    update: { name: 'Oignons', suppPrice: 25 },
  });

  const typeSauce = await prisma.compositionType.upsert({
    where: { id: '00000000-0000-4000-8000-000000000401' },
    create: {
      id: '00000000-0000-4000-8000-000000000401',
      name: 'sauce',
      label: 'Sauce',
      message: 'Choisissez une sauce',
      min: 1,
      max: 1,
      payment: false,
      selection: false,
      sortOrder: 0,
    },
    update: {
      label: 'Sauce',
      message: 'Choisissez une sauce',
      min: 1,
      max: 1,
      payment: false,
    },
  });
  const typeGarnish = await prisma.compositionType.upsert({
    where: { id: '00000000-0000-4000-8000-000000000402' },
    create: {
      id: '00000000-0000-4000-8000-000000000402',
      name: 'garniture',
      label: 'Garniture',
      message: 'Jusqu’à deux options',
      min: 0,
      max: 2,
      payment: false,
      selection: true,
      sortOrder: 1,
    },
    update: {
      label: 'Garniture',
      message: 'Jusqu’à deux options',
      min: 0,
      max: 2,
      payment: false,
    },
  });

  await prisma.compositionTypeExtra.deleteMany({
    where: { compositionTypeId: { in: [typeSauce.id, typeGarnish.id] } },
  });
  await prisma.compositionTypeExtra.createMany({
    data: [
      { compositionTypeId: typeSauce.id, extraId: exHarissa.id, position: 0 },
      { compositionTypeId: typeSauce.id, extraId: exMayo.id, position: 1 },
      { compositionTypeId: typeGarnish.id, extraId: exSalad.id, position: 0 },
      { compositionTypeId: typeGarnish.id, extraId: exOnion.id, position: 1 },
    ],
  });

  const composedProductId = '00000000-0000-4000-8000-000000000106';
  await prisma.product.upsert({
    where: { id: composedProductId },
    create: {
      id: composedProductId,
      categoryId: catFood.id,
      name: 'Tacos composé (démo)',
      kind: 'COMPOSED',
      description: 'Produit composé: choix sauce puis garnitures (comme Tacos Korner).',
      image: DEMO_IMAGES.productComposed,
      price: 799,
      taxRateBps: 1000,
      sortOrder: 2,
      outOfStock: false,
      modifiers: [],
    },
    update: {
      kind: 'COMPOSED',
      description: 'Produit composé: choix sauce puis garnitures (comme Tacos Korner).',
      image: DEMO_IMAGES.productComposed,
      price: 799,
      taxRateBps: 1000,
      outOfStock: false,
    },
  });
  await prisma.productComposition.deleteMany({ where: { productId: composedProductId } });
  await prisma.productComposition.createMany({
    data: [
      { productId: composedProductId, compositionTypeId: typeSauce.id, sortOrder: 0 },
      { productId: composedProductId, compositionTypeId: typeGarnish.id, sortOrder: 1 },
    ],
  });

  await prisma.setting.upsert({
    where: { key: 'default_tax_bps' },
    create: { key: 'default_tax_bps', value: 1000 },
    update: { value: 1000 },
  });

  const table1Id = '00000000-0000-4000-8000-000000000201';
  await prisma.restaurantTable.upsert({
    where: { id: table1Id },
    create: {
      id: table1Id,
      name: 'Table 1',
      zone: 'Main',
      sortOrder: 0,
    },
    update: { name: 'Table 1', zone: 'Main' },
  });

  const demoOrderIds = [
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000502',
    '00000000-0000-4000-8000-000000000503',
  ];
  await prisma.order.deleteMany({ where: { id: { in: demoOrderIds } } });

  const staffRow = await prisma.staff.findFirst({ where: { email } });
  if (!staffRow) {
    throw new Error('Seed staff not found');
  }

  const pidCoffee = '00000000-0000-4000-8000-000000000101';
  const pidSandwich = '00000000-0000-4000-8000-000000000102';

  /** Tax 10% (1000 bps), matches default_tax_bps and product taxRateBps. */
  const taxOn = (subtotalCents: number) => Math.round((subtotalCents * 1000) / 10000);

  const coffeeMilkUnit = 250 + 50;
  const coffeeMilkLine = coffeeMilkUnit * 2;
  const coffeeMilkTax = taxOn(coffeeMilkLine);
  await prisma.order.create({
    data: {
      id: demoOrderIds[0],
      status: 'ACTIVE',
      tableId: table1Id,
      staffId: staffRow.id,
      subtotalCents: coffeeMilkLine,
      taxCents: coffeeMilkTax,
      totalCents: coffeeMilkLine + coffeeMilkTax,
      lines: {
        create: [
          {
            productId: pidCoffee,
            quantity: 2,
            unitPriceCents: coffeeMilkUnit,
            lineTotalCents: coffeeMilkLine,
            taxCents: coffeeMilkTax,
            modifiersSnapshot: {
              selectedIds: ['milk'],
              defs: [{ id: 'milk', name: 'Extra milk', priceCents: 50 }],
            },
          },
        ],
      },
    },
  });

  const sub2a = 250;
  const sub2b = 899;
  const sub2 = sub2a + sub2b;
  const tax2 = taxOn(sub2a) + taxOn(sub2b);
  await prisma.order.create({
    data: {
      id: demoOrderIds[1],
      status: 'COMPLETED',
      tableId: table1Id,
      staffId: staffRow.id,
      subtotalCents: sub2,
      taxCents: tax2,
      totalCents: sub2 + tax2,
      lines: {
        create: [
          {
            productId: pidCoffee,
            quantity: 1,
            unitPriceCents: 250,
            lineTotalCents: sub2a,
            taxCents: taxOn(sub2a),
            modifiersSnapshot: { selectedIds: [], defs: [] },
          },
          {
            productId: pidSandwich,
            quantity: 1,
            unitPriceCents: 899,
            lineTotalCents: sub2b,
            taxCents: taxOn(sub2b),
            modifiersSnapshot: { selectedIds: [], defs: [] },
            note: 'Sans oignon',
          },
        ],
      },
    },
  });

  const composedLineSub = 799 + 25;
  const composedTax = taxOn(composedLineSub);
  await prisma.order.create({
    data: {
      id: demoOrderIds[2],
      status: 'ACTIVE',
      staffId: staffRow.id,
      subtotalCents: composedLineSub,
      taxCents: composedTax,
      totalCents: composedLineSub + composedTax,
      lines: {
        create: [
          {
            productId: composedProductId,
            quantity: 1,
            unitPriceCents: 799 + 25,
            lineTotalCents: composedLineSub,
            taxCents: composedTax,
            modifiersSnapshot: { selectedIds: [], defs: [] },
            compositionSnapshot: {
              steps: [
                {
                  compositionTypeId: typeSauce.id,
                  compositionTypeName: typeSauce.name,
                  compositionTypeLabel: typeSauce.label,
                  extraIds: [exHarissa.id],
                  extras: [{ id: exHarissa.id, name: exHarissa.name, extraCents: 0 }],
                },
                {
                  compositionTypeId: typeGarnish.id,
                  compositionTypeName: typeGarnish.name,
                  compositionTypeLabel: typeGarnish.label,
                  extraIds: [exOnion.id],
                  extras: [{ id: exOnion.id, name: exOnion.name, extraCents: 25 }],
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed complete (includes demo orders).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
