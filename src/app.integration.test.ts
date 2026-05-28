import 'dotenv/config';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app';

const app = createApp();

describe('health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', lang: 'fr' });
    expect(res.headers['content-language']).toBe('fr');
  });

  it('respects lang header', async () => {
    const res = await request(app).get('/health').set('lang', 'en');
    expect(res.body.lang).toBe('en');
    expect(res.headers['content-language']).toBe('en');
  });
});

describe('lang header on errors', () => {
  it('returns localized unauthorized message', async () => {
    const res = await request(app).get('/api/v1/auth/me').set('lang', 'ar');
    expect(res.status).toBe(401);
    expect(res.body.error.message).toMatch(/[\u0600-\u06FF]/);
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

    const categoryDrinks = '010000000001';
    const productId = '020000000101';
    const order = await request(app)
      .post('/api/v1/orders')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        subtotal: 2.5,
        tva: 0.25,
        total: 2.75,
        products: [{ categoryId: categoryDrinks, id: productId, count: 1, price: 2.5 }],
      });

    expect(order.status).toBe(201);
    expect(order.body.order).toBeDefined();
    expect(order.body.order.status).toBe('confirmed');
    expect(order.body.order.products?.length).toBeGreaterThan(0);
    expect(order.body.order.orderType).toBe('takeaway');
  });

  it('rejects dine_in order without tableId', async () => {
    const login = await request(app).post('/api/v1/auth/login').set(tenantHeader).send(credentials);
    expect(login.status).toBe(200);
    const token = login.body.accessToken as string;

    const categoryDrinks = '010000000001';
    const productId = '020000000101';
    const res = await request(app)
      .post('/api/v1/orders')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        orderType: 'dine_in',
        subtotal: 2.5,
        tva: 0.25,
        total: 2.75,
        products: [{ categoryId: categoryDrinks, id: productId, count: 1, price: 2.5 }],
      });

    expect(res.status).toBe(400);
  });

  it('rejects takeaway order with tableId', async () => {
    const login = await request(app).post('/api/v1/auth/login').set(tenantHeader).send(credentials);
    expect(login.status).toBe(200);
    const token = login.body.accessToken as string;

    const categoryDrinks = '010000000001';
    const productId = '020000000101';
    const tableId = '050000000201';
    const res = await request(app)
      .post('/api/v1/orders')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        orderType: 'takeaway',
        subtotal: 250,
        tva: 25,
        total: 275,
        tableId,
        products: [{ categoryId: categoryDrinks, id: productId, count: 1, price: 250 }],
      });

    expect(res.status).toBe(400);
  });
});
