import clsx from 'clsx';
import { useRef, useState } from 'react';

import Dropdown from './Dropdown';

interface Props {
   direction?: 'vertical' | 'horizontal';
   actions:
      | {
           [key: string]: () => void;
        }
      | {};
}

const Actions: React.FC<Props> = ({ direction, actions }) => {
   const ref = useRef<HTMLDivElement>(null);
   const [showDropdown, setShowDropdown] = useState<boolean>(false);

   return (
      <div ref={ref} className="relative inline-block">
         <button
            onClick={() => {
               if (Object.keys(actions).length) {
                  setShowDropdown(!showDropdown);
               }
            }}
            className={clsx(
               'text-lg transition duration-200 ease-linear',
               showDropdown
                  ? 'text-rose-400'
                  : 'text-zinc-400 hover:text-rose-400'
            )}
         >
            <i
               className={
                  'fa-regular fa-fw fa-ellipsis' +
                  (direction === 'horizontal' ? '' : '-vertical')
               }
            ></i>
         </button>
         <Dropdown
            ref={ref}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            parentClassName="top-9 right-0 origin-top-right"
            className="p-2 border-2 shadow-2xl w-28 rounded-xl bg-base-750 border-base-700"
         >
            <div className="flex flex-col gap-y-1">
               {Object.keys(actions).map((action, index) => (
                  <button
                     key={index}
                     onClick={(actions as any)[action]}
                     className="flex items-center group text-sm py-1.5 px-3 rounded-lg transition duration-200 ease-linear focus:outline-none hover:bg-base-650 focus:bg-base-650 font-semibold w-full text-left"
                  >
                     <span className="mr-2 -ml-1 transition duration-200 ease-linear opacity-50 text-rose-400 group-hover:opacity-100">
                        <i className="fa-solid fa-fw fa-ban"></i>
                     </span>
                     {action}
                  </button>
               ))}
            </div>
         </Dropdown>
      </div>
   );
};

export default Actions;
