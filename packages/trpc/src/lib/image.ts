import { TRPCError } from '@trpc/server';
import { ImgurClient } from 'imgur';

export const client = new ImgurClient({
   clientId: process.env.IMGUR_CLIENT_ID,
   clientSecret: process.env.IMGUR_CLIENT_SECRET,
});

export async function uploadImage(image: string) {
   const upload = await client.upload({
      image,
      type: 'base64',
   });

   if (upload.success) {
      return upload.data.id;
   } else {
      throw new TRPCError({
         code: 'INTERNAL_SERVER_ERROR',
         message: 'Failed uploading image',
      });
   }
}
