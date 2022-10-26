import { prisma } from '@curious/db';

export const excludeUserSafe = prisma.$exclude('user', [
   'password',
   'email',
   'updatedAt',
]);
