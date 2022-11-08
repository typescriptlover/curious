import { useState } from 'react';
import cookie from 'js-cookie';
import ms from 'ms';
import { useRouter } from 'next/router';

import { trpc } from '../lib/trpc';
import { useAuth } from '../contexts/auth';
import Link from '../components/ui/Link';

const Register = () => {
   const [displayName, setDisplayName] = useState<string>('');
   const [username, setUsername] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const [error, setError] = useState<false | string>(false);

   const { updateAuth } = useAuth();
   const router = useRouter();

   const register = trpc.auth.register.useMutation({
      onError({ message }) {
         try {
            const data = JSON.parse(message);
            if (data.length) {
               setError(data[0].message);
            } else {
               setError('Something went wrong');
            }
         } catch (err) {
            setError(message ?? 'Something went wrong');
         }
      },
      onSuccess({ context, payload }) {
         setError(false);

         cookie.set('curious', context.token, {
            expires: ms('1 week'),
            sameSite: 'strict',
         });
         updateAuth(payload);

         return router.push('/dashboard');
      },
   });

   function Register() {
      register.mutate({
         displayName,
         username,
         email,
         password,
      });
   }

   return (
      <div className="w-full max-w-sm m-auto text-center">
         <h2 className="text-3xl font-bold tracking-tight">
            Create your new account
         </h2>
         <div className="mt-4 text-zinc-400">
            Or{' '}
            <Link
               href="/login"
               className="font-medium text-rose-400 transition duration-200 ease-linear hover:text-rose-300"
            >
               already have an account
            </Link>
         </div>
         <div className="w-full mt-8 -space-y-px shadow rounded-xl">
            <input
               autoFocus={true}
               type="text"
               placeholder="Display name"
               onInput={(e: any) => setDisplayName(e.target.value)}
               value={displayName}
               className="relative block w-full px-4 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 rounded-t-xl border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
            <div className="relative w-full group">
               <input
                  type="text"
                  placeholder="username"
                  onInput={(e: any) => setUsername(e.target.value)}
                  value={username}
                  className="relative block w-full pl-[7.5rem] pr-3 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
               />
               <div className="absolute z-20 left-4 inset-y-0 flex items-center">
                  <div className="font-semibold bg-base-750 group-hover:bg-base-700 group-focus-within:bg-base-700 px-2 rounded-lg tracking-tight transition duration-200 ease-linear text-rose-400">
                     curious.me/
                  </div>
               </div>
            </div>
            <input
               type="email"
               placeholder="Email"
               onInput={(e: any) => setEmail(e.target.value)}
               value={email}
               className="relative block w-full px-4 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
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
         <div className="mt-7">
            <button
               onClick={Register}
               className="relative w-full py-3 font-semibold transition duration-200 ease-linear rounded-lg shadow hover:bg-rose-500 bg-rose-600"
            >
               Register
               <div className="absolute inset-y-0 flex items-center right-5">
                  <span className="opacity-75">
                     <i className="fa-regular fa-user-unlock"></i>
                  </span>
               </div>
            </button>
         </div>
      </div>
   );
};

export default Register;
