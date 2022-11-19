import { Dispatch, SetStateAction, useMemo } from 'react';
import clsx from 'clsx';

import { TUserFilter } from '../../types/types';

interface FilterProps {
   filters: TUserFilter[];
   filter: TUserFilter;
   setFilter: Dispatch<SetStateAction<TUserFilter>>;
}
const Filter: React.FC<FilterProps> = ({ filters, filter, setFilter }) => {
   return (
      <div>
         <div className="flex items-center w-full mt-12 gap-x-4">
            {filters.map((f) => (
               <button
                  key={f.name}
                  onClick={() => setFilter(f)}
                  className={clsx(
                     'text-[0.9rem] relative flex-grow font-semibold will-change rounded-xl py-2.5 transition duration-200 ease-linear',
                     filter.name === f.name
                        ? 'text-white bg-rose-500 border-2 border-rose-500'
                        : 'text-zinc-300 focus:scale-95 bg-base-700 hover:bg-base-650 hover:text-zinc-200 border-2 border-base-600'
                  )}
               >
                  <span
                     className={clsx(
                        'transition duration-200 ease-linear mr-3 text-base',
                        filter.name === f.name
                           ? 'text-rose-200'
                           : 'text-zinc-500'
                     )}
                  >
                     <i className={`fa-solid fa-fw fa-${f.icon}`} />
                  </span>
                  {f.name}
               </button>
            ))}
         </div>
      </div>
   );
};

export default Filter;
