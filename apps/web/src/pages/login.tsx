import { useState } from 'react';
import Link from '../components/ui/Link';
import cookie from 'js-cookie';
import ms from 'ms';

import { trpc } from '../lib/trpc';
import { useAuth } from '../contexts/auth';
import { useRouter } from 'next/router';

const Login = () => {
   const [username, setUsername] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const [error, setError] = useState<false | string>(false);

   const { updateAuth } = useAuth();
   const router = useRouter();

   const login = trpc.auth.login.useMutation({
      onError({ message }) {
         setError(message);
      },
      onSuccess({ context, payload }) {
         setError(false);

         cookie.set('curious', context.token, {
            expires: ms('1 week'),
            sameSite: 'strict',
         });
         updateAuth(payload);

         return router.push((router.query.from as string) ?? '/dashboard');
      },
   });

   async function Login() {
      login.mutate({
         username,
         password,
      });
   }

   return (
      <div className="w-full max-w-sm m-auto text-center">
         <h2 className="text-3xl font-bold tracking-tight">
            Log in to your account
         </h2>
         <div className="mt-4 text-zinc-400">
            Or{' '}
            <Link
               href="/register"
               className="font-medium transition duration-200 ease-linear text-rose-400 hover:text-rose-300"
            >
               register for an account
            </Link>
         </div>
         <div className="w-full mt-8 -space-y-px shadow rounded-xl">
            <input
               autoFocus={true}
               type="text"
               placeholder="Username"
               onInput={(e: any) => setUsername(e.target.value)}
               value={username}
               className="relative block w-full px-4 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 rounded-t-xl border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
            <input
               type="password"
               placeholder="Password"
               onInput={(e: any) => setPassword(e.target.value)}
               value={password}
               className="relative block w-full px-4 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 rounded-b-xl border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
         </div>
         {error && (
            <div className="mt-3 w-full text-left bg-red-600 text-sm font-semibold py-2.5 px-4 rounded-lg">
               {error}
            </div>
         )}
         <div className="mt-3 text-sm font-medium text-left text-rose-400">
            Forgot password?
         </div>
         <div className="mt-7">
            <button
               onClick={Login}
               className="relative w-full py-3 font-semibold transition duration-200 ease-linear rounded-lg shadow hover:bg-rose-500 bg-rose-600"
            >
               Log in
               <div className="absolute inset-y-0 flex items-center right-5">
                  <span className="opacity-75">
                     <i className="fa-regular fa-lock-open"></i>
                  </span>
               </div>
            </button>
         </div>
      </div>
   );
};

export default Login;
