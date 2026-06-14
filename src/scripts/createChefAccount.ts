/**
 * Creates (or resets) the demo chef account on the `demo` tenant.
 * Safe to run multiple times — uses upsert.
 *
 * Usage:  npx ts-node src/scripts/createChefAccount.ts
 */
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';
import { upsertStaffLoginDirectory } from '../services/staffLoginDirectory';

const CHEF_ID = '070000000603';
const CHEF_EMAIL = 'chef@demo.local';
const CHEF_PASSWORD = 'chef1234';

async function main(): Promise<void> {
  if (!process.env.REGISTRY_DATABASE_URL || !process.env.TENANT_DATABASE_URL) {
    throw new Error('REGISTRY_DATABASE_URL and TENANT_DATABASE_URL must be set in .env');
  }

  const registry = getRegistryClient();

  const tenant = await registry.tenant.findUnique({ where: { slug: 'demo' } });
  if (!tenant) {
    throw new Error('Demo tenant not found. Run `npm run seed` first to create it.');
  }

  const prisma = getTenantPrisma(tenant.id, tenant.databaseUrl);
  const hash = await bcrypt.hash(CHEF_PASSWORD, env.bcryptRounds);

  const chef = await prisma.staff.upsert({
    where: { email: CHEF_EMAIL },
    create: {
      id: CHEF_ID,
      email: CHEF_EMAIL,
      passwordHash: hash,
      firstName: 'Demo',
      lastName: 'Chef',
      role: 'chef',
    },
    update: {
      passwordHash: hash,
      firstName: 'Demo',
      lastName: 'Chef',
      role: 'chef',
      isActive: true,
    },
  });

  await upsertStaffLoginDirectory(registry, tenant.id, chef.id, chef.email);

  console.log('');
  console.log('Chef account ready:');
  console.log('  Tenant slug : demo');
  console.log('  Email       :', CHEF_EMAIL);
  console.log('  Password    :', CHEF_PASSWORD);
  console.log('  Staff ID    :', chef.id);
  console.log('  Role        :', chef.role);
  console.log('');
  console.log('Login:');
  console.log('  POST /api/v1/auth/login');
  console.log('  Headers: x-tenant-id: demo');
  console.log('  Body:   { "email": "chef@demo.local", "password": "chef1234" }');
  console.log('');
  console.log('Kitchen app access:');
  console.log('  GET  /api/v1/kitchen/orders      (paginated, last 24h)');
  console.log('  GET  /api/v1/kitchen/orders/:id');
  console.log('  PATCH /api/v1/kitchen/orders/:id/seen');
  console.log('  WS   /api/v1/realtime?token=<JWT>  (chef.init + kitchen.order.* events)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
