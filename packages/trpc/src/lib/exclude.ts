import { prisma } from '@curious/db';

export const excludeUserSafe = prisma.$exclude('user', [
   'password',
   'email',
   'updatedAt',
]);

export const excludeAnswerUseless = prisma.$exclude('answer', [
   'updatedAt',
   'questionId',
   'byId',
   'toId',
]);

export const excludeQuestionUseless = prisma.$exclude('question', [
   'updatedAt',
   'byId',
   'toId',
]);
