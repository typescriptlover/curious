import { t } from '../../router';

import guard from '../../middlewares/guard';
import { createQuestionSchema, getQuestionsSchema } from './schema';
import { calculatePaginate, paginatePer } from '../../lib/paginate';
import { includeUserNecessary } from '../../lib/include';
import { TRPCError } from '@trpc/server';
import { excludeQuestionUseless } from '../../lib/exclude';

export default t.router({
   getQuestions: t.procedure
      .use(guard)
      .input(getQuestionsSchema)
      .query(async ({ ctx, input }) => {
         const user = ctx.user!;

         const { paginate } = input;

         const questionsCount = await ctx.prisma.question.count({
            where: {
               toId: user.id,
               answer: {
                  is: null,
               },
            },
         });

         const page = paginate ? paginate.page ?? 1 : 1;
         const per = paginate ? paginate.per ?? paginatePer : paginatePer;

         const questions = await ctx.prisma.question.findMany({
            where: {
               toId: user.id,
               answer: {
                  is: null,
               },
            },
            select: {
               ...excludeQuestionUseless,
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
               questionsCount,
            },
            payload: questions,
            paginate: calculatePaginate(questionsCount, per, page),
         };
      }),
   createQuestion: t.procedure
      .use(guard)
      .input(createQuestionSchema)
      .mutation(async ({ ctx, input }) => {
         const { username, question } = input;

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

         const authUser = ctx.user!;

         if (user.id === authUser.id) {
            throw new TRPCError({
               code: 'FORBIDDEN',
               message: 'Question cannot be to yourself',
            });
         }

         const newQuestion = await ctx.prisma.question.create({
            data: {
               to: {
                  connect: {
                     id: user.id,
                  },
               },
               question,
               by: {
                  connect: {
                     id: authUser.id,
                  },
               },
            },
            select: {
               ...excludeQuestionUseless,
               to: {
                  select: includeUserNecessary,
               },
               by: {
                  select: includeUserNecessary,
               },
            },
         });

         return {
            payload: newQuestion,
         };
      }),
});
