import type { NextPage } from 'next';

import Link from 'next/link';

const Index: NextPage = () => {
   return (
      <div className="w-full max-w-6xl m-auto mx-auto">
         <div className="grid grid-cols-2">
            <div className="flex justify-center w-full">
               <div className="w-full max-w-md">
                  <h2 className="relative text-5xl font-extrabold tracking-tight">
                     Explore curiosity,
                     <div className="absolute top-0 right-0 text-8xl mr-16 mt-2 z-[-10]">
                        <span className="inline-block rotate-[24deg] opacity-25 text-rose-400">
                           <i className="fa-duotone fa-earth-americas" />
                        </span>
                     </div>
                  </h2>
                  <h2 className="relative mt-2 text-5xl font-extrabold tracking-tight">
                     together.
                     <div className="absolute top-0 left-0 text-5xl -ml-6 mt-6 z-[-10]">
                        <span className="inline-block opacity-25 text-rose-400">
                           <i className="fa-duotone fa-comments" />
                        </span>
                     </div>
                  </h2>
                  <div className="mt-6 text-lg font-medium text-zinc-400">
                     Ask, answer, post. Connect with your favorite creators,
                     friends or anyone across the globe.
                  </div>
                  <Link href="/register">
                     <button className="px-5 py-3 mt-10 font-semibold transition duration-200 ease-linear rounded-lg shadow-sm group hover:shadow-2xl bg-rose-600 hover:bg-rose-500">
                        Start your journey
                        <span className="inline-block ml-3 -mr-1 text-xs transition duration-200 ease-in-out group-hover:translate-x-1 will-change text-rose-300">
                           <i className="fa-regular fa-chevrons-right" />
                        </span>
                     </button>
                  </Link>
                  <div className="mt-2 text-sm italic font-medium text-zinc-400">
                     join{' '}
                     <span className="font-semibold text-rose-400">23,000</span>{' '}
                     others
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
