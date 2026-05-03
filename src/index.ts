import 'dotenv/config';
import http from 'node:http';
import { createApp } from './app';
import { env } from './config/env';
import { attachStaffRealtimeServer } from './realtime/attachStaffRealtimeServer';

const app = createApp();
const server = http.createServer(app);

attachStaffRealtimeServer(server);

server.listen(env.port, () => {
  console.log(`Server listening on http://localhost:${env.port}`);
  console.log(`Staff realtime: ws://localhost:${env.port}/api/v1/realtime?token=<jwt>`);
});
