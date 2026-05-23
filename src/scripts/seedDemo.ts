/**
 * Seeds registry tenant `demo` and sample catalog + staff in the tenant database.
 * Run after migrations: `npm run seed`
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';
import { upsertStaffLoginDirectory, removeStaffLoginDirectory } from '../services/staffLoginDirectory';
import { refreshTableOccupancyFromOrders } from '../services/tableOccupancy';

/** Source URLs — downloaded into `uploads/<tenantId>/` as portable `uploads/…` paths in the DB. */
const SEED_IMAGE_SOURCES = {
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

/** Stable 12-char lowercase hex ids for demo data (integration tests expect these when seed runs). */
const S = {
  CAT_DRINKS: '010000000001',
  CAT_FOOD: '010000000002',
  PROD_COFFEE: '020000000101',
  PROD_SANDWICH: '020000000102',
  PROD_JUICE: '020000000103',
  PROD_COMPOSED: '020000000106',
  EX_HARISSA: '030000000301',
  EX_MAYO: '030000000302',
  EX_SALAD: '030000000303',
  EX_ONION: '030000000304',
  TYPE_SAUCE: '040000000401',
  TYPE_GARNISH: '040000000402',
  ZONE_MAIN: '050000000200',
  TABLE_1: '050000000201',
  ORDER_1: '060000000501',
  ORDER_2: '060000000502',
  ORDER_3: '060000000503',
  STAFF_MGR: '070000000601',
  STAFF_OWNER: '070000000602',
  LINE_O1: '080000050101',
  LINE_O2A: '080000050201',
  LINE_O2B: '080000050202',
  LINE_O3: '080000050301',
} as const;

async function ensureSeedImage(tenantId: string, filename: string, sourceUrl: string): Promise<string> {
  const dir = path.join(process.cwd(), 'uploads', tenantId);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, filename);
  if (!fs.existsSync(dest)) {
    const res = await fetch(sourceUrl);
    if (!res.ok) {
      throw new Error(`Seed: failed to download ${filename} (${res.status})`);
    }
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log('Saved seed image', path.relative(process.cwd(), dest));
  }
  return `uploads/${tenantId}/${filename}`;
}

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
      firstName: 'Platform',
      lastName: 'Admin',
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

  const demoImages = {
    categoryDrinks: await ensureSeedImage(tenant.id, 'seed-category-drinks.jpg', SEED_IMAGE_SOURCES.categoryDrinks),
    categoryFood: await ensureSeedImage(tenant.id, 'seed-category-food.jpg', SEED_IMAGE_SOURCES.categoryFood),
    productCoffee: await ensureSeedImage(tenant.id, 'seed-product-coffee.jpg', SEED_IMAGE_SOURCES.productCoffee),
    productSandwich: await ensureSeedImage(tenant.id, 'seed-product-sandwich.jpg', SEED_IMAGE_SOURCES.productSandwich),
    productJuice: await ensureSeedImage(tenant.id, 'seed-product-juice.jpg', SEED_IMAGE_SOURCES.productJuice),
    productComposed: await ensureSeedImage(tenant.id, 'seed-product-composed.jpg', SEED_IMAGE_SOURCES.productComposed),
  };

  const legacyDemoEmail = 'cashier@demo.local';
  const legacyStaff = await prisma.staff.findUnique({ where: { email: legacyDemoEmail } });
  if (legacyStaff) {
    await removeStaffLoginDirectory(registry, tenant.id, legacyStaff.id);
    await prisma.staff.delete({ where: { id: legacyStaff.id } });
    console.log('Removed legacy demo login:', legacyDemoEmail, '→ use manager@demo.local');
  }

  /** Demo tenant login: manager (not the restaurant owner — owner is created via platform provision / ownerEmail). */
  const email = 'manager@demo.local';
  const password = 'demo123456';
  const hash = await bcrypt.hash(password, env.bcryptRounds);

  const demoStaff = await prisma.staff.upsert({
    where: { email },
    create: {
      id: S.STAFF_MGR,
      email,
      passwordHash: hash,
      firstName: 'Demo',
      lastName: 'Manager',
      role: 'manager',
    },
    update: { passwordHash: hash, firstName: 'Demo', lastName: 'Manager', role: 'manager' },
  });
  await upsertStaffLoginDirectory(registry, tenant.id, demoStaff.id, demoStaff.email);
  console.log('Staff (manager):', email, '/', password);

  const ownerEmailAddr = 'owner@demo.local';
  const ownerHash = await bcrypt.hash(password, env.bcryptRounds);
  const demoOwner = await prisma.staff.upsert({
    where: { email: ownerEmailAddr },
    create: {
      id: S.STAFF_OWNER,
      email: ownerEmailAddr,
      passwordHash: ownerHash,
      firstName: 'Demo',
      lastName: 'Owner',
      role: 'owner',
    },
    update: { passwordHash: ownerHash, firstName: 'Demo', lastName: 'Owner', role: 'owner' },
  });
  await upsertStaffLoginDirectory(registry, tenant.id, demoOwner.id, demoOwner.email);
  await registry.owner.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: ownerEmailAddr } },
    create: {
      tenantId: tenant.id,
      email: ownerEmailAddr,
      passwordHash: ownerHash,
      firstName: 'Demo',
      lastName: 'Owner',
    },
    update: { passwordHash: ownerHash, firstName: 'Demo', lastName: 'Owner' },
  });
  console.log('Staff (owner):', ownerEmailAddr, '/', password);

  const catDrinks = await prisma.category.upsert({
    where: { id: S.CAT_DRINKS },
    create: {
      id: S.CAT_DRINKS,
      name: 'Drinks',
      sortOrder: 0,
      image: demoImages.categoryDrinks,
    },
    update: { name: 'Drinks', image: demoImages.categoryDrinks },
  });

  const catFood = await prisma.category.upsert({
    where: { id: S.CAT_FOOD },
    create: {
      id: S.CAT_FOOD,
      name: 'Food',
      sortOrder: 1,
      image: demoImages.categoryFood,
    },
    update: { name: 'Food', image: demoImages.categoryFood },
  });

  await prisma.product.upsert({
    where: { id: S.PROD_COFFEE },
    create: {
      id: S.PROD_COFFEE,
      categoryId: catDrinks.id,
      name: 'Coffee',
      kind: 'simple',
      description: 'House blend. Hot or iced.',
      image: demoImages.productCoffee,
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
      kind: 'simple',
      description: 'House blend. Hot or iced.',
      image: demoImages.productCoffee,
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
    where: { id: S.PROD_SANDWICH },
    create: {
      id: S.PROD_SANDWICH,
      categoryId: catFood.id,
      name: 'Sandwich',
      kind: 'simple',
      description: 'Ham, cheese, and greens on a toasted baguette.',
      image: demoImages.productSandwich,
      price: 899,
      taxRateBps: 1000,
      sortOrder: 0,
      outOfStock: false,
    },
    update: {
      kind: 'simple',
      description: 'Ham, cheese, and greens on a toasted baguette.',
      image: demoImages.productSandwich,
      price: 899,
      taxRateBps: 1000,
      outOfStock: false,
    },
  });

  await prisma.product.upsert({
    where: { id: S.PROD_JUICE },
    create: {
      id: S.PROD_JUICE,
      categoryId: catDrinks.id,
      name: 'Fresh orange juice',
      kind: 'simple',
      description: 'Pressed daily. Currently unavailable (demo out-of-stock).',
      image: demoImages.productJuice,
      price: 450,
      sortOrder: 1,
      outOfStock: true,
    },
    update: {
      kind: 'simple',
      description: 'Pressed daily. Currently unavailable (demo out-of-stock).',
      image: demoImages.productJuice,
      price: 450,
      sortOrder: 1,
      outOfStock: true,
    },
  });

  const exHarissa = await prisma.extra.upsert({
    where: { id: S.EX_HARISSA },
    create: {
      id: S.EX_HARISSA,
      name: 'Harissa',
      suppPrice: 0,
      price: 0,
      sortOrder: 0,
    },
    update: { name: 'Harissa', suppPrice: 0 },
  });
  const exMayo = await prisma.extra.upsert({
    where: { id: S.EX_MAYO },
    create: {
      id: S.EX_MAYO,
      name: 'Mayonnaise',
      suppPrice: 50,
      price: 0,
      sortOrder: 1,
    },
    update: { name: 'Mayonnaise', suppPrice: 50 },
  });
  const exSalad = await prisma.extra.upsert({
    where: { id: S.EX_SALAD },
    create: {
      id: S.EX_SALAD,
      name: 'Salade',
      suppPrice: 0,
      price: 0,
      sortOrder: 0,
    },
    update: { name: 'Salade' },
  });
  const exOnion = await prisma.extra.upsert({
    where: { id: S.EX_ONION },
    create: {
      id: S.EX_ONION,
      name: 'Oignons',
      suppPrice: 25,
      price: 0,
      sortOrder: 1,
    },
    update: { name: 'Oignons', suppPrice: 25 },
  });

  const typeSauce = await prisma.compositionType.upsert({
    where: { id: S.TYPE_SAUCE },
    create: {
      id: S.TYPE_SAUCE,
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
    where: { id: S.TYPE_GARNISH },
    create: {
      id: S.TYPE_GARNISH,
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

  const composedProductId = S.PROD_COMPOSED;
  await prisma.product.upsert({
    where: { id: composedProductId },
    create: {
      id: composedProductId,
      categoryId: catFood.id,
      name: 'Tacos composé (démo)',
      kind: 'composed',
      description: 'Produit composé: choix sauce puis garnitures (comme Tacos Korner).',
      image: demoImages.productComposed,
      price: 799,
      taxRateBps: 1000,
      sortOrder: 2,
      outOfStock: false,
      modifiers: [],
    },
    update: {
      kind: 'composed',
      description: 'Produit composé: choix sauce puis garnitures (comme Tacos Korner).',
      image: demoImages.productComposed,
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

  const table1Id = S.TABLE_1;
  await prisma.tableZone.upsert({
    where: { id: S.ZONE_MAIN },
    create: { id: S.ZONE_MAIN, name: 'Main', sortOrder: 0 },
    update: { name: 'Main', sortOrder: 0 },
  });

  await prisma.restaurantTable.upsert({
    where: { id: table1Id },
    create: {
      id: table1Id,
      tableNumber: 1,
      zoneId: S.ZONE_MAIN,
      seatCount: 4,
      sortOrder: 0,
      status: 'free',
    },
    update: { tableNumber: 1, zoneId: S.ZONE_MAIN, seatCount: 4 },
  });

  const demoOrderIds = [S.ORDER_1, S.ORDER_2, S.ORDER_3];
  await prisma.order.deleteMany({ where: { id: { in: demoOrderIds } } });

  const staffRow = await prisma.staff.findFirst({ where: { email } });
  if (!staffRow) {
    throw new Error('Seed staff not found');
  }

  const pidCoffee = S.PROD_COFFEE;
  const pidSandwich = S.PROD_SANDWICH;

  /** Tax 10% (1000 bps), matches default_tax_bps and product taxRateBps. */
  const taxOn = (subtotalCents: number) => Math.round((subtotalCents * 1000) / 10000);

  const demoCommandDate = new Date(Date.UTC(2026, 4, 2));

  const coffeeMilkUnit = 250 + 50;
  const coffeeMilkLine = coffeeMilkUnit * 2;
  const coffeeMilkTax = taxOn(coffeeMilkLine);
  await prisma.order.create({
    data: {
      id: demoOrderIds[0],
      reference: 'de000501',
      commandDate: demoCommandDate,
      commandNumber: 1,
      status: 'confirmed',
      orderType: 'dine_in',
      tableId: table1Id,
      staffId: staffRow.id,
      paymentMethod: 'cash',
      subtotalCents: coffeeMilkLine,
      taxCents: coffeeMilkTax,
      totalCents: coffeeMilkLine + coffeeMilkTax,
      lines: {
        create: [
          {
            id: S.LINE_O1,
            productId: pidCoffee,
            categoryId: catDrinks.id,
            quantity: 2,
            unitPriceCents: coffeeMilkUnit,
            lineTotalCents: coffeeMilkLine,
            taxCents: coffeeMilkTax,
            modifiersSnapshot: {
              selectedIds: ['milk'],
              defs: [{ id: 'milk', name: 'Extra milk', priceCents: 50 }],
            },
            extrasSnapshot: [{ id: 'milk', count: 2, price: 50 }],
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
      reference: 'de000502',
      commandDate: demoCommandDate,
      commandNumber: 2,
      status: 'completed',
      orderType: 'dine_in',
      tableId: table1Id,
      staffId: staffRow.id,
      paymentMethod: 'card',
      subtotalCents: sub2,
      taxCents: tax2,
      totalCents: sub2 + tax2,
      lines: {
        create: [
          {
            id: S.LINE_O2A,
            productId: pidCoffee,
            categoryId: catDrinks.id,
            quantity: 1,
            unitPriceCents: 250,
            lineTotalCents: sub2a,
            taxCents: taxOn(sub2a),
            modifiersSnapshot: { selectedIds: [], defs: [] },
            extrasSnapshot: [],
          },
          {
            id: S.LINE_O2B,
            productId: pidSandwich,
            categoryId: catFood.id,
            quantity: 1,
            unitPriceCents: 899,
            lineTotalCents: sub2b,
            taxCents: taxOn(sub2b),
            modifiersSnapshot: { selectedIds: [], defs: [] },
            extrasSnapshot: [],
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
      reference: 'de000503',
      commandDate: demoCommandDate,
      commandNumber: 3,
      status: 'confirmed',
      orderType: 'takeaway',
      staffId: staffRow.id,
      paymentMethod: 'unpaid',
      subtotalCents: composedLineSub,
      taxCents: composedTax,
      totalCents: composedLineSub + composedTax,
      lines: {
        create: [
          {
            id: S.LINE_O3,
            productId: composedProductId,
            categoryId: catFood.id,
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
            extrasSnapshot: [
              { id: exHarissa.id, count: 1, price: 0 },
              { id: exOnion.id, count: 1, price: 25 },
            ],
          },
        ],
      },
    },
  });

  await refreshTableOccupancyFromOrders(prisma, table1Id);

  console.log('Seed complete (includes demo orders).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
