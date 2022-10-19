import Link from 'next/link';

const Nav = () => {
   // bg-base-850/75 border border-base-750
   return (
      <nav className="fixed inset-x-0 top-0 z-[100] px-5">
         <div className="flex items-center justify-between w-full h-20 max-w-6xl mx-auto">
            <div>
               <Link href="/">
                  <h1 className="text-2xl font-bold cursor-pointer group">
                     <span className="inline-block group-hover:opacity-100 will-change group-hover:scale-105 transition duration-200 ease-linear mr-2.5 text-xl opacity-50 text-rose-400 rotate-[14deg]">
                        <i className="fa-solid fa-block-question"></i>
                     </span>
                     curious
                  </h1>
               </Link>
            </div>
            <div className="flex items-center gap-x-5">
               <div className="relative w-64 group">
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
               <Link href="/login">
                  <button className="relative block px-4 py-2 text-sm font-semibold transition duration-200 ease-linear rounded-lg bg-rose-600 hover:ring-2 hover:ring-rose-600">
                     Log in
                  </button>
               </Link>
            </div>
         </div>
      </nav>
   );
};

export default Nav;
