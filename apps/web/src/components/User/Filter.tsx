import { Dispatch, SetStateAction, useMemo } from 'react';
import clsx from 'clsx';

import { TUserFilter } from '../../types/types';

interface FilterProps {
   filters: TUserFilter[];
   filter: TUserFilter;
   setFilter: Dispatch<SetStateAction<TUserFilter>>;
}
const Filter: React.FC<FilterProps> = ({ filters, filter, setFilter }) => {
   const calcW = useMemo(() => 100 / filters.length, [filters]);

   return (
      <div>
         <div className="flex items-center w-full mt-12 gap-x-4">
            {filters.map((f) => (
               <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                     'text-[0.9rem] font-semibold will-change rounded-xl py-2.5 px-3 transition duration-200 ease-linear',
                     filter === f
                        ? 'text-white bg-rose-500 border-2 border-rose-500'
                        : 'text-zinc-300 focus:scale-95 bg-base-700 hover:bg-base-650 hover:text-zinc-200 border-2 border-base-650'
                  )}
                  style={{
                     width: `${calcW}%`,
                  }}
               >
                  {f}
               </button>
            ))}
         </div>
      </div>
   );
};

export default Filter;
