import { inferProcedureOutput, initTRPC } from '@trpc/server';
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

import { auth, user, question, answer, post } from './routes';

export const router = t.router({
   auth,
   user,
   question,
   answer,
   post,
});

export type AppRouter = typeof router;
