export type TenantSource = 'header' | 'subdomain';

function parseTenantSource(raw: string | undefined): TenantSource {
  if (raw === 'subdomain') return 'subdomain';
  return 'header';
}

/** Comma-separated origins, or `*` to reflect any Origin (dev-friendly). Empty = CORS disabled. */
function parseCorsOrigins(raw: string | undefined): string[] {
  const s = raw?.trim();
  if (!s) return [];
  if (s === '*') return ['*'];
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  /** When non-empty, `cors` middleware is enabled. Use `*` for permissive dev. */
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  /** Registry (platform) Postgres URL */
  registryDatabaseUrl: process.env.REGISTRY_DATABASE_URL ?? '',
  tenantSource: parseTenantSource(process.env.TENANT_SOURCE),
  /** HTTP header name (lowercase). Value is tenant **slug** or UUID. */
  tenantHeader: (process.env.TENANT_HEADER ?? 'x-tenant-id').toLowerCase(),
  baseDomain: (process.env.BASE_DOMAIN ?? '').toLowerCase().trim(),

  jwtSecret: process.env.JWT_SECRET ?? 'dev-only-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10),

  /** Header `x-platform-key` for provisioning routes */
  platformApiKey: process.env.PLATFORM_API_KEY ?? '',

  /**
   * Optional absolute origin for uploaded files and catalog `image` URLs (no trailing slash).
   * When unset, URLs are derived from each request's Host header.
   */
  publicBaseUrl: (process.env.PUBLIC_BASE_URL ?? '').replace(/\/$/, ''),
};
