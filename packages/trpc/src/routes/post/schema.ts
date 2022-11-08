import z from 'zod';
import { paginateSchema } from '../../lib/paginate';

export const getPostsSchema = z
   .object({
      username: z.string(),
      paginate: paginateSchema,
   })
   .strict();
