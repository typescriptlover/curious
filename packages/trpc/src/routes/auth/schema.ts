import z from 'zod';

import { emailRegex } from '../../lib/auth';

export const registerSchema = z
   .object({
      displayName: z.string().min(1, {
         message: 'Display name must be 1 characters or more',
      }),
      username: z
         .string()
         .min(2, {
            message: 'Username must be 2 characters or more',
         })
         .max(20, {
            message: 'Username must be 20 characters or less',
         }),
      email: z.string().refine((v) => v.match(emailRegex), {
         message: 'Email must be valid',
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
