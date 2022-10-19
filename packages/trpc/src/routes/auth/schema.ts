import z from 'zod';

import { emailRegex } from '../../lib/auth';

export const registerSchema = z
   .object({
      displayName: z.string(),
      username: z
         .string()
         .min(2, {
            message: 'username must be 2 characters or more',
         })
         .max(20, {
            message: 'username must be 20 characters or less',
         }),
      email: z.string().refine((v) => v.match(emailRegex), {
         message: 'email must be valid',
      }),
      avatar: z.string().optional(),
      password: z.string(),
      bio: z.string().optional(),
   })
   .strict();

export const loginSchema = z
   .object({
      username: z.string(),
      password: z.string(),
   })
   .strict();
