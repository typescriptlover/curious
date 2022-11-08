import { t } from '../../router';

import { TRPCError } from '@trpc/server';
import { getPostsSchema } from './schema';
import { calculatePaginate, paginatePer } from '../../lib/paginate';
import { includeUserNecessary } from '../../lib/include';

export default t.router({
   getPosts: t.procedure.input(getPostsSchema).query(async ({ ctx, input }) => {
      const { username, paginate } = input;

      const user = await ctx.prisma.user.findFirst({
         where: {
            username,
         },
      });

      if (!user) {
         throw new TRPCError({
            code: 'PARSE_ERROR',
            message: 'User not found',
         });
      }

      const postsCount = await ctx.prisma.post.count({
         where: {
            byId: user.id,
         },
      });

      const page = paginate ? paginate.page ?? 1 : 1;
      const per = paginate ? paginate.per ?? paginatePer : paginatePer;

      const posts = await ctx.prisma.post.findMany({
         where: {
            byId: user.id,
         },
         select: {
            ...ctx.prisma.$exclude('post', ['updatedAt']),
            by: {
               select: includeUserNecessary,
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
         skip: (page - 1) * per,
         take: per,
      });

      return {
         context: {
            postsCount,
         },
         payload: posts,
         paginate: calculatePaginate(postsCount, per, page),
      };
   }),
});
