import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import User from '../components/Nav/User';
import Link from '../components/ui/Link';

import { useAuth } from '../contexts/auth';

interface NavLinkProps {
   href: string;
   children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
   return (
      <Link
         href={href}
         className="font-medium transition duration-200 ease-linear text-zinc-300 hover:text-white"
      >
         {children}
      </Link>
   );
};

const Nav = () => {
   const { auth } = useAuth();
   const router = useRouter();

   const [scrolled, setScrolled] = useState<boolean>(false);

   useEffect(() => {
      function onScroll(e: any) {
         const top = window.pageYOffset || document.documentElement.scrollTop;
         if (top < 10) {
            setScrolled(false);
         } else {
            setScrolled(true);
         }
      }

      document.addEventListener('scroll', onScroll);
      return () => document.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <nav
         className={clsx(
            'fixed inset-x-0 top-0 z-[100] px-5 pointer-events-none'
         )}
      >
         <div className="flex items-center w-full h-20 max-w-6xl mx-auto">
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
               <div className="w-full flex gap-x-4 pointer-events-auto items-center col-span-1">
                  <div className="relative flex-1 group">
                     <input
                        type="text"
                        placeholder="Find a user"
                        className="w-full py-1.5 pl-9 pr-3 placeholder-zinc-500 transition duration-200 ease-linear focus:border-rose-500 focus:outline-none font-medium border-2 rounded-lg border-base-700 bg-base-800 focus:bg-base-750 hover:bg-base-750"
                     />
                     <div className="absolute inset-y-0 flex items-center left-3">
                        <span className="text-sm transition duration-200 ease-linear text-zinc-400 group-focus-within:text-rose-400">
                           <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                        </span>
                     </div>
                  </div>
                  <div>
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
         </div>
      </nav>
   );
};

export default Nav;
