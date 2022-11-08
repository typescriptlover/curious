import z from 'zod';

import { paginateSchema } from '../../lib/paginate';

export const getQuestionsSchema = z
   .object({
      paginate: paginateSchema,
   })
   .strict();

export const createQuestionSchema = z
   .object({
      username: z.string(),
      question: z.string().min(10, {
         message: 'Question must be 10 characters or more',
      }),
   })
   .strict();
