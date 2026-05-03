import { staffRealtimeHub } from './staffRealtimeHub';
import type { StaffRealtimeMessageV1 } from './staffRealtimeMessages';

export function broadcastStaffRealtime(tenantId: string, message: StaffRealtimeMessageV1): void {
  staffRealtimeHub.broadcast(tenantId, message);
}
