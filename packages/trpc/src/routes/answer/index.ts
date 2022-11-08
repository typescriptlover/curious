import { t } from '../../router';

import guard from '../../middlewares/guard';
import { createAnswerSchema, getAnswersSchema } from './schema';
import { TRPCError } from '@trpc/server';
import { includeUserNecessary } from '../../lib/include';
import {
   excludeAnswerUseless,
   excludeQuestionUseless,
} from '../../lib/exclude';
import { calculatePaginate, paginatePer } from '../../lib/paginate';

export default t.router({
   createAnswer: t.procedure
      .use(guard)
      .input(createAnswerSchema)
      .mutation(async ({ ctx, input }) => {
         const { questionId, answer } = input;

         const question = await ctx.prisma.question.findUnique({
            where: {
               id: questionId,
            },
            include: {
               answer: true,
            },
         });

         if (!question) {
            throw new TRPCError({
               code: 'PARSE_ERROR',
               message: 'Question not found',
            });
         }

         const authUser = ctx.user!;

         if (question.toId !== authUser.id) {
            throw new TRPCError({
               code: 'FORBIDDEN',
               message: 'Question is not asked to you',
            });
         }

         if (question.answer) {
            throw new TRPCError({
               code: 'FORBIDDEN',
               message: 'Question is already answered',
            });
         }

         const newAnswer = await ctx.prisma.answer.create({
            data: {
               answer,
               question: {
                  connect: {
                     id: question.id,
                  },
               },
               to: {
                  connect: {
                     id: question.byId,
                  },
               },
               by: {
                  connect: {
                     id: authUser.id,
                  },
               },
            },
            select: {
               ...excludeAnswerUseless,
               to: {
                  select: includeUserNecessary,
               },
               by: {
                  select: includeUserNecessary,
               },
            },
         });

         return {
            payload: newAnswer,
         };
      }),
   getAnswers: t.procedure
      .input(getAnswersSchema)
      .query(async ({ ctx, input }) => {
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

         const answersCount = await ctx.prisma.answer.count({
            where: {
               byId: user.id,
            },
         });

         const page = paginate ? paginate.page ?? 1 : 1;
         const per = paginate ? paginate.per ?? paginatePer : paginatePer;

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
            skip: (page - 1) * per,
            take: per,
         });

         return {
            context: {
               answersCount,
            },
            payload: answers,
            paginate: calculatePaginate(answersCount, per, page),
         };
      }),
});
