import type { PrismaClient } from '../db/tenant-client';

export type TenantContext = {
  /** Registry tenant UUID */
  id: string;
  slug: string;
  /** Prisma client for this tenant's database */
  prisma: PrismaClient;
};
