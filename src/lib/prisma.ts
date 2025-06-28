import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare const global: typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
export * from '@prisma/client';
