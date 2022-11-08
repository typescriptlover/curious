import z from 'zod';
import { paginateSchema } from '../../lib/paginate';

export const userSchema = z
   .object({
      username: z.string(),
   })
   .strict();

export const getAllSchema = z
   .object({
      username: z.string(),
      paginate: paginateSchema,
   })
   .strict();
