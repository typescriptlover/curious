import z from 'zod';

import { paginateSchema } from '../../lib/paginate';

export const createAnswerSchema = z
   .object({
      questionId: z.string(),
      answer: z
         .string()
         .min(1, {
            message: 'Answer must be 1 characters or more',
         })
         .max(300, {
            message: 'Answer must be 300 characters or less.',
         }),
   })
   .strict();

export const getAnswersSchema = z
   .object({
      username: z.string(),
      paginate: paginateSchema,
   })
   .strict();
