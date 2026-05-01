import { PrismaClient } from './registry-client';

let client: PrismaClient | null = null;

export function getRegistryClient(): PrismaClient {
  if (!client) {
    client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }
  return client;
}
