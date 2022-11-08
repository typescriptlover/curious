import { t } from '../../router';

import { TRPCError } from '@trpc/server';

import { getAllSchema, userSchema } from './schema';
import {
   excludeAnswerUseless,
   excludeQuestionUseless,
   excludeUserSafe,
} from '../../lib/exclude';
import { calculatePaginate, paginatePer } from '../../lib/paginate';
import { Answer, Post } from '@curious/db';
import { includeUserNecessary } from '../../lib/include';
import { hasOwnProperty } from '../../lib/helpers';

// TODO: edit profile
export default t.router({
   getUser: t.procedure.input(userSchema).query(async ({ ctx, input }) => {
      const { username } = input;

      const user = await ctx.prisma.user.findFirst({
         where: {
            username,
         },
         select: excludeUserSafe,
      });

      if (!user) {
         throw new TRPCError({
            code: 'PARSE_ERROR',
            message: 'User not found',
         });
      }

      return {
         payload: user,
      };
   }),
   getAll: t.procedure.input(getAllSchema).query(async ({ ctx, input }) => {
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

      const answers = await ctx.prisma.answer.findMany({
         where: {
            byId: user.id,
         },
         select: {
            ...excludeAnswerUseless,
            question: {
               select: {
                  ...excludeQuestionUseless,
                  by: {
                     select: includeUserNecessary,
                  },
               },
            },
            by: {
               select: includeUserNecessary,
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

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
      });

      const per = paginate.per ?? paginatePer;

      const all = [...answers, ...posts]
         .sort((a, b) => {
            return Number(b.createdAt) - Number(a.createdAt);
         })
         .splice(per * (paginate.page - 1), per);

      return {
         context: {
            allCount: all.length,
         },
         payload: all,
         paginate: calculatePaginate(all.length, per, paginate.page),
      };
   }),
   getAnalytics: t.procedure.input(userSchema).query(async ({ ctx, input }) => {
      const { username } = input;

      const user = await ctx.prisma.user.findFirst({
         where: {
            username,
         },
         include: {
            _count: {
               select: {
                  answers: true,
                  answersCreated: true,
                  questions: true,
                  questionsCreated: true,
               },
            },
         },
      });

      if (!user) {
         throw new TRPCError({
            code: 'PARSE_ERROR',
            message: 'User not found',
         });
      }

      return {
         payload: {
            ...user._count,
         },
      };
   }),
});
