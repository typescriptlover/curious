import { httpBatchLink } from '@trpc/client';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCNext } from '@trpc/next';
import cookie from 'js-cookie';

import type { AppRouter } from '@curious/trpc';

export const trpc = createTRPCNext<AppRouter>({
   config({ ctx }) {
      return {
         links: [
            httpBatchLink({
               url: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000',
               headers() {
                  if (ctx?.req) {
                     const cookies = (ctx.req as any).cookies;

                     if (cookies && cookies.curious) {
                        return {
                           authorization: cookies.curious,
                           'x-ssr': '1',
                        };
                     }

                     return {
                        'x-ssr': '1',
                     };
                  }

                  return {
                     authorization: cookie.get('curious'),
                  };
               },
            }),
         ],
         queryClientConfig: {
            defaultOptions: {
               queries: {
                  retry: false,
                  refetchOnMount: true,
                  refetchOnWindowFocus: true,
               },
            },
         },
      };
   },
   ssr: true,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
