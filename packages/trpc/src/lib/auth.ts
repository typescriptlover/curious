import { verify, sign } from 'jsonwebtoken';

import { prisma, User } from '@curious/db';

export const emailRegex =
   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export async function createToken(id: string) {
   const token = await sign(
      {
         id,
      },
      process.env.JWT_SECRET as string,
      {
         expiresIn: '1w',
      }
   );
   return token;
}

export async function getTokenUser(token: string) {
   try {
      const data = (await verify(
         token,
         process.env.JWT_SECRET as string
      )) as any;

      const user = await prisma.user.findUnique({
         where: {
            id: data.id,
         },
         select: prisma.$exclude('user', ['password']),
      });

      return user;
   } catch (err) {
      return null;
   }
}
