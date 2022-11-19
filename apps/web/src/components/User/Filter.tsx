import { Dispatch, SetStateAction, useMemo } from 'react';
import clsx from 'clsx';

import { TUserFilter } from '../../types/types';
import Link from '../ui/Link';
import { useRouter } from 'next/router';

export const filters: TUserFilter[] = [
   {
      name: 'All',
      icon: 'comments-question',
      route: '',
   },
   {
      name: 'Answers',
      icon: 'comment',
      route: '/answers',
   },
   {
      name: 'Questions',
      icon: 'comment-question',
      route: '/questions',
   },
   {
      name: 'Posts',
      icon: 'comment-pen',
      route: '/posts',
   },
];

interface FilterProps {
   username: string;
}
const Filter: React.FC<FilterProps> = ({ username }) => {
   const router = useRouter();

   return (
      <div>
         <div className="flex items-center w-full mt-12 gap-x-4">
            {filters.map((f) => (
               <Link
                  key={f.name}
                  href={`/${username}${f.route}`}
                  shallow={true}
                  className={clsx(
                     'text-[0.9rem] relative block text-center flex-grow font-semibold will-change rounded-xl py-2.5 transition duration-200 ease-linear',
                     router.asPath === `/${username}${f.route}`
                        ? 'text-white bg-rose-500 border-2 border-rose-500'
                        : 'text-zinc-300 focus:scale-95 bg-base-700 hover:bg-base-650 hover:text-zinc-200 border-2 border-base-600'
                  )}
               >
                  <span
                     className={clsx(
                        'transition duration-200 ease-linear mr-3 text-base',
                        router.asPath === `/${username}${f.route}`
                           ? 'text-rose-200'
                           : 'text-zinc-500'
                     )}
                  >
                     <i className={`fa-solid fa-fw fa-${f.icon}`} />
                  </span>
                  {f.name}
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Filter;
