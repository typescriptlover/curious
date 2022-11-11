import z from 'zod';
import { isBase64 } from '../../lib/helpers';
import { paginateSchema } from '../../lib/paginate';
import { globalRegisterSchema } from '../auth/schema';

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

export const editProfileSchema = z
   .object({
      displayName: globalRegisterSchema.displayName.optional(),
      username: globalRegisterSchema.username.optional(),
      bio: z
         .string()
         .min(1, {
            message: 'Bio must be 1 characters or more',
         })
         .optional(),
      header: z.string().optional(),
      avatar: z.string().optional(),
   })
   .strict();
