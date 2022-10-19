import { t } from '../../router';

import { TRPCError } from '@trpc/server';
import { hash, compare } from 'bcrypt';

import guard from '../../middlewares/guard';
import already from '../../middlewares/already';
import { loginSchema, registerSchema } from './schema';
import { createToken } from '../../lib/auth';
import { uploadImage } from '../../lib/image';

export default t.router({
   me: t.procedure.use(guard).query(({ ctx }) => ({
      payload: ctx.user,
   })),
   register: t.procedure
      .use(already)
      .input(registerSchema)
      .mutation(async ({ ctx, input }) => {
         const existing = await ctx.prisma.user.findFirst({
            where: {
               OR: [
                  {
                     username: input.username,
                  },
                  {
                     email: input.email,
                  },
               ],
            },
         });

         if (existing) {
            if (existing.username === input.username) {
               throw new TRPCError({
                  code: 'PARSE_ERROR',
                  message: 'Username is already taken',
               });
            } else {
               throw new TRPCError({
                  code: 'PARSE_ERROR',
                  message: 'Email is already taken',
               });
            }
         }

         const passwordHash = await hash(input.password, 8);

         const user = await ctx.prisma.user.create({
            data: {
               ...input,
               avatar: input.avatar ? await uploadImage(input.avatar) : null,
               password: passwordHash,
            },
         });

         return {
            payload: await createToken(user),
         };
      }),
   login: t.procedure
      .use(already)
      .input(loginSchema)
      .mutation(async ({ ctx, input }) => {
         const { username, password } = input;

         const user = await ctx.prisma.user.findFirst({
            where: {
               username,
            },
         });

         if (!user) {
            throw new TRPCError({
               code: 'PARSE_ERROR',
               message: 'Invalid username or password',
            });
         }

         const valid = await compare(password, user.password);

         if (!valid) {
            throw new TRPCError({
               code: 'PARSE_ERROR',
               message: 'Invalid username or password',
            });
         }

         return {
            payload: await createToken(user),
         };
      }),
});
