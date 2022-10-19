import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { prisma } from '@curious/db';
import { getTokenUser } from './lib/auth';

export const createContext = async ({
   req,
   res,
}: CreateExpressContextOptions) => {
   const { authorization } = req.headers;

   return {
      req,
      res,
      user: authorization ? await getTokenUser(authorization) : null,
      prisma,
   };
};

export type Context = inferAsyncReturnType<typeof createContext>;
