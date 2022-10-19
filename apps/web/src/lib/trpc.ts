import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import type { AppRouter } from '@curious/trpc';

function getBaseUrl() {
   if (typeof window !== 'undefined') {
      return '';
   }
   if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
   }
   return process.env.NEXT_PUBLIC_API_URL ?? '';
}

export const trpc = createTRPCNext<AppRouter>({
   config() {
      return {
         links: [
            httpBatchLink({
               url: getBaseUrl(),
            }),
         ],
      };
   },
   ssr: true,
});
