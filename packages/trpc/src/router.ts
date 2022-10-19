import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import type { Context } from './context';

export const t = initTRPC.context<Context>().create({
   errorFormatter({ shape, error }) {
      return {
         ...shape,
         data: {
            ...shape.data,
            zodError:
               error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
                  ? error.cause.flatten()
                  : null,
         },
      };
   },
});

import { auth } from './routes';

export const router = t.router({
   auth,
});

export type AppRouter = typeof router;
