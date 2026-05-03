import { WebSocket } from 'ws';
import type { StaffRealtimeMessageV1 } from './staffRealtimeMessages';

/** In-memory subscribers per tenant (single Node process). Scale-out later via Redis pub/sub. */
const rooms = new Map<string, Set<WebSocket>>();

function roomFor(tenantId: string): Set<WebSocket> {
  let set = rooms.get(tenantId);
  if (!set) {
    set = new Set();
    rooms.set(tenantId, set);
  }
  return set;
}

export const staffRealtimeHub = {
  join(tenantId: string, ws: WebSocket): void {
    roomFor(tenantId).add(ws);
  },

  leave(tenantId: string, ws: WebSocket): void {
    const set = rooms.get(tenantId);
    if (!set) return;
    set.delete(ws);
    if (set.size === 0) rooms.delete(tenantId);
  },

  broadcast(tenantId: string, message: StaffRealtimeMessageV1): void {
    const set = rooms.get(tenantId);
    if (!set || set.size === 0) return;
    const raw = JSON.stringify(message);
    for (const ws of set) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(raw);
      }
    }
  },
};
