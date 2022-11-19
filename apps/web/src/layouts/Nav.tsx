import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Search from '../components/Nav/Search';
import User from '../components/Nav/User';
import Link from '../components/ui/Link';

import { useAuth } from '../contexts/auth';

const Nav = () => {
   const { auth } = useAuth();

   return (
      <nav
         className={clsx(
            'fixed inset-x-0 top-0 z-[100] px-5 pointer-events-none'
         )}
      >
         <div className="flex items-center w-full h-20 max-w-6xl mx-auto 2xl:max-w-7xl">
            <div className="flex items-center max-w-[12rem] w-full gap-x-6 pointer-events-auto">
               <Link href="/">
                  <h1 className="text-2xl font-bold cursor-pointer group">
                     <span className="inline-block group-hover:opacity-100 will-change group-hover:scale-105 transition duration-200 ease-linear mr-2.5 text-xl opacity-50 text-rose-400 rotate-[14deg]">
                        <i className="fa-solid fa-block-question"></i>
                     </span>
                     curious
                  </h1>
               </Link>
            </div>
            <div className="ml-[2rem] grid grid-cols-3 w-full gap-x-8">
               <div className="w-full col-span-2 pointer-events-none" />
               <div className="flex items-center w-full col-span-1 pointer-events-auto gap-x-4">
                  <Search />
                  {auth ? (
                     <User />
                  ) : (
                     <Link href="/login">
                        <button className="relative block px-4 py-2 text-sm font-semibold transition duration-200 ease-linear rounded-lg bg-rose-500 hover:ring-2 hover:ring-rose-500">
                           Log in
                        </button>
                     </Link>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Nav;
