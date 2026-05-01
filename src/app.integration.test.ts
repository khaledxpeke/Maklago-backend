import 'dotenv/config';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app';

const app = createApp();

describe('health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

const integration =
  process.env.INTEGRATION_TEST === '1' &&
  Boolean(process.env.REGISTRY_DATABASE_URL) &&
  Boolean(process.env.TENANT_DATABASE_URL);

describe.skipIf(!integration)('integration (set INTEGRATION_TEST=1 and DB URLs)', () => {
  const tenantHeader = { 'x-tenant-id': process.env.TEST_TENANT_SLUG ?? 'demo' };
  const credentials = {
    email: process.env.TEST_STAFF_EMAIL ?? 'manager@demo.local',
    password: process.env.TEST_STAFF_PASSWORD ?? 'demo123456',
  };

  it('returns 401 without Authorization on /api/v1/auth/me', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });

  it('logs in with tenant header and returns accessToken', async () => {
    const res = await request(app).post('/api/v1/auth/login').set(tenantHeader).send(credentials);
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    expect(res.body.tenantSlug).toBe(process.env.TEST_TENANT_SLUG ?? 'demo');
  });

  it('logs in without tenant header when staff login directory has email', async () => {
    const res = await request(app).post('/api/v1/auth/login').send(credentials);
    expect(res.status).toBe(200);
    expect(res.body.tenantSlug).toBeTruthy();
    expect(res.body.accessToken).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });

  it('GET /api/v1/auth/me works with bearer only (no tenant header)', async () => {
    const login = await request(app).post('/api/v1/auth/login').send(credentials);
    expect(login.status).toBe(200);
    const token = login.body.accessToken as string;

    const me = await request(app).get('/api/v1/auth/me').set({ Authorization: `Bearer ${token}` });
    expect(me.status).toBe(200);
    expect(me.body.slug).toBe(login.body.tenantSlug);
  });

  it('creates an order with bearer token only (no tenant header)', async () => {
    const login = await request(app).post('/api/v1/auth/login').set(tenantHeader).send(credentials);
    expect(login.status).toBe(200);
    const token = login.body.accessToken as string;

    const productId = '00000000-0000-4000-8000-000000000101';
    const order = await request(app)
      .post('/api/v1/orders')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        status: 'active',
        lines: [{ productId, quantity: 1 }],
      });

    expect(order.status).toBe(201);
    expect(order.body.order).toBeDefined();
    expect(order.body.order.lines?.length).toBeGreaterThan(0);
    expect(order.body.order.fulfillment).toBe('takeaway');
  });

  it('rejects dine_in order without tableId', async () => {
    const login = await request(app).post('/api/v1/auth/login').set(tenantHeader).send(credentials);
    expect(login.status).toBe(200);
    const token = login.body.accessToken as string;

    const productId = '00000000-0000-4000-8000-000000000101';
    const res = await request(app)
      .post('/api/v1/orders')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        fulfillment: 'dine_in',
        status: 'active',
        lines: [{ productId, quantity: 1 }],
      });

    expect(res.status).toBe(400);
  });

  it('rejects takeaway order with tableId', async () => {
    const login = await request(app).post('/api/v1/auth/login').set(tenantHeader).send(credentials);
    expect(login.status).toBe(200);
    const token = login.body.accessToken as string;

    const productId = '00000000-0000-4000-8000-000000000101';
    const tableId = '00000000-0000-4000-8000-000000000201';
    const res = await request(app)
      .post('/api/v1/orders')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        fulfillment: 'takeaway',
        tableId,
        status: 'active',
        lines: [{ productId, quantity: 1 }],
      });

    expect(res.status).toBe(400);
  });
});
