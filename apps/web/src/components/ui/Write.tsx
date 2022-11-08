import clsx from 'clsx';
import { Dispatch, SetStateAction, TextareaHTMLAttributes } from 'react';

type Tools = 'images' | 'at' | 'emojis';
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   action: string;
   icon: string;
   value: string;
   setValue: Dispatch<SetStateAction<string>>;
   tools: Tools[] | 'all';
   onAction?: () => any;
   max: number;
   parentClassName?: string;
   className?: string;
}

const Write: React.FC<Props> = ({
   action,
   icon,
   value,
   setValue,
   tools,
   onAction,
   max,
   parentClassName,
   className,
   ...props
}) => {
   const enabled = (tool: Tools) => tools.includes(tool);

   return (
      <div
         className={clsx(
            'relative w-full overflow-hidden transition duration-200 ease-linear bg-transparent group rounded-2xl border-2 border-base-700 focus-within:border-rose-500',
            parentClassName
         )}
      >
         <textarea
            {...props}
            className={clsx(
               'w-full block placeholder-zinc-500 font-semibold !mb-0 p-4 resize-none focus:outline-none bg-base-800',
               className ?? 'h-24'
            )}
            value={value}
            onInput={(e: any) => setValue(e.target.value)}
         />
         <hr className="border-t-2 border-base-700" />
         <div className="flex items-center justify-between px-4 py-3 bg-base-750">
            <div className="flex items-center gap-x-4">
               {(tools === 'all' || enabled('images')) && (
                  <button className="block text-xl transition duration-200 ease-linear hover:text-rose-400 text-zinc-400">
                     <i className="fa-solid fa-fw fa-images" />
                  </button>
               )}
               {(tools === 'all' || enabled('at')) && (
                  <button className="block text-xl transition duration-200 ease-linear hover:text-rose-400 text-zinc-400">
                     <i className="fa-solid fa-fw fa-at" />
                  </button>
               )}
               {(tools === 'all' || enabled('emojis')) && (
                  <button className="block text-xl transition duration-200 ease-linear hover:text-rose-400 text-zinc-400">
                     <i className="fa-solid fa-fw fa-face-smile-plus" />
                  </button>
               )}
            </div>
            <div className="flex items-center gap-x-4">
               <span className="text-sm font-medium transition duration-200 ease-linear text-zinc-400 group-focus-within:text-white">
                  0/{max}
               </span>
               <button
                  onClick={onAction ?? undefined}
                  className="px-5 py-2 text-sm font-bold text-white transition duration-200 ease-linear rounded-lg bg-rose-500 hover:ring-2 hover:ring-rose-500"
               >
                  {action}
                  <span className="ml-2 -mr-2 text-xs text-rose-200">
                     <i className={'fa-solid fa-fw fa-' + icon} />
                  </span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Write;
