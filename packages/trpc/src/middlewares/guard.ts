import { t } from '../router';

import { TRPCError } from '@trpc/server';

export default t.middleware(async ({ ctx, next }) => {
   if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not logged in' });
   }

   return next({
      ctx,
   });
});
