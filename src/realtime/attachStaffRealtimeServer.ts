import type { Server } from 'node:http';
import { URL } from 'node:url';
import { WebSocketServer } from 'ws';
import { verifyStaffToken } from '../auth/jwt';
import { env } from '../config/env';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';
import { kitchenOrderInclude, serializeOrdersKitchen } from '../services/orderJsonKitchen';
import { getRestaurantSettings, resolveSessionStart } from '../services/restaurantSettings';
import { staffRealtimeHub } from './staffRealtimeHub';

/**
 * Staff cashier/kitchen realtime: `GET ws(s)://host/api/v1/realtime?token=<JWT>`
 * Same JWT as `Authorization: Bearer` from login.
 *
 * Note: tokens in query strings can appear in proxies/logs — acceptable for LAN POS;
 * prefer TLS (`wss://`) and short-lived JWTs in production.
 */
export function attachStaffRealtimeServer(httpServer: Server): WebSocketServer {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    const host = request.headers.host ?? '127.0.0.1';
    let pathname: string;
    try {
      pathname = new URL(request.url ?? '/', `http://${host}`).pathname;
    } catch {
      socket.destroy();
      return;
    }

    if (pathname !== '/api/v1/realtime') {
      socket.destroy();
      return;
    }

    void (async () => {
      try {
        const url = new URL(request.url ?? '/', `http://${host}`);
        const token = url.searchParams.get('token');
        if (!token || !env.registryDatabaseUrl) {
          socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
          socket.destroy();
          return;
        }

        const payload = verifyStaffToken(token);
        const registry = getRegistryClient();
        const row = await registry.tenant.findFirst({
          where: { id: payload.tenantId, isActive: true },
        });
        if (!row) {
          socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
          socket.destroy();
          return;
        }

        wss.handleUpgrade(request, socket, head, (ws) => {
          staffRealtimeHub.join(row.id, ws);
          ws.send(JSON.stringify({ v: 1, type: 'connected', tenantId: row.id }));

          if (payload.role === 'chef') {
            void (async () => {
              try {
                const tenantPrisma = getTenantPrisma(row.id, row.databaseUrl);
                const settings = await getRestaurantSettings(tenantPrisma);
                const sessionStart = resolveSessionStart(settings.openTime);
                const orders = await tenantPrisma.order.findMany({
                  where: { createdAt: { gte: sessionStart } },
                  include: kitchenOrderInclude,
                  orderBy: { createdAt: 'asc' },
                });
                const serialized = await serializeOrdersKitchen(tenantPrisma, orders);
                ws.send(JSON.stringify({ v: 1, type: 'chef.init', orders: serialized, ts: new Date().toISOString() }));
              } catch {
                // non-fatal: chef continues connected and will receive live updates
              }
            })();
          }

          ws.on('close', () => staffRealtimeHub.leave(row.id, ws));
          ws.on('error', () => staffRealtimeHub.leave(row.id, ws));
        });
      } catch {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
      }
    })();
  });

  return wss;
}
