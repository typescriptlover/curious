import z from 'zod';

import { paginateSchema } from '../../lib/paginate';

export const createAnswerSchema = z
   .object({
      questionId: z.string(),
      answer: z.string(),
   })
   .strict();

export const getAnswersSchema = z
   .object({
      username: z.string(),
      paginate: paginateSchema,
   })
   .strict();
