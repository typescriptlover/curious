import { PrismaClient } from '@prisma/client';
import { withExclude } from 'prisma-exclude';

export const prisma = withExclude(
   new PrismaClient({
      log: ['error'],
   })
);

export * from '@prisma/client';
