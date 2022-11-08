import { NextRequest, NextResponse } from 'next/server';

const authGuard = ['/dashboard', '/feed'];
const alreadyGuard = ['/login', '/register'];
const authRedirects: any = {
   '/': '/dashboard',
};

export function middleware(req: NextRequest) {
   const { url, nextUrl } = req;
   const { pathname } = nextUrl;

   if (new RegExp(/^.*(fonts|_next|vk.com|favicon).*$/).test(req.url)) {
      return NextResponse.next();
   }

   const cookie = req.cookies.get('curious');

   if (!cookie) {
      if (authGuard.includes(pathname)) {
         return NextResponse.redirect(new URL('/login?from=' + pathname, url));
      }
      return NextResponse.next();
   } else {
      return fetch(process.env.NEXT_PUBLIC_API_URL + '/auth.me', {
         method: 'GET',
         headers: {
            authorization: cookie,
         },
      })
         .then((data) => {
            if (data.status !== 200) throw new Error('Failed');

            if (authRedirects.hasOwnProperty(pathname)) {
               return NextResponse.redirect(
                  new URL(authRedirects[pathname], url)
               );
            } else if (authGuard.includes(pathname)) {
               return NextResponse.next();
            } else if (alreadyGuard.includes(pathname)) {
               return NextResponse.redirect(new URL('/', url));
            }
         })
         .catch(() => {
            if (authGuard.includes(pathname)) {
               return NextResponse.redirect(
                  new URL('/login?from=' + pathname, url)
               );
            } else {
               return NextResponse.next();
            }
         });
   }
}

export const config = {
   matcher: ['/', '/dashboard', '/feed', '/login', '/register'],
};
