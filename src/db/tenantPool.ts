import { PrismaClient } from './tenant-client';

type Pooled = { prisma: PrismaClient; databaseUrl: string };

const pool = new Map<string, Pooled>();

/**
 * Cached Prisma client per tenant. If `databaseUrl` changes (registry PATCH) or a tenant is
 * recreated with the same slug but a new id, we must not reuse a client connected to the wrong DB.
 */
export function getTenantPrisma(tenantId: string, databaseUrl: string): PrismaClient {
  const existing = pool.get(tenantId);
  if (existing && existing.databaseUrl === databaseUrl) {
    return existing.prisma;
  }
  if (existing) {
    void existing.prisma.$disconnect();
    pool.delete(tenantId);
  }

  const prisma = new PrismaClient({
    datasources: { db: { url: databaseUrl } },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
  pool.set(tenantId, { prisma, databaseUrl });
  return prisma;
}

/** Disconnect and drop cached client when a tenant is removed from the registry. */
export function removeTenantFromPool(tenantId: string): void {
  const entry = pool.get(tenantId);
  if (entry) {
    void entry.prisma.$disconnect();
    pool.delete(tenantId);
  }
}
