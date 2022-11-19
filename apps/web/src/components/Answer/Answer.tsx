import Actions from '../ui/Actions';

import { TAnswer } from '../../types/types';
import Link from '../ui/Link';
import { useAuth } from '../../contexts/auth';
import getImage from '../../lib/image';
import { useMemo } from 'react';
import Delete from '../Actions/Delete';
import Block from '../Actions/Block';
import Copy from '../Actions/Copy';
import Archive from '../Actions/Archive';

interface Props {
   answer: TAnswer;
}

const Answer: React.FC<Props> = ({ answer }) => {
   const { auth } = useAuth();

   return (
      <div className="w-full p-5 border rounded-xl bg-base-750 border-base-650">
         <div className="p-4 rounded-lg bg-base-700">
            <Link
               href={`/@${answer.question.by.username}`}
               className="inline-flex items-center group gap-x-4"
            >
               <img
                  className="object-cover transition duration-200 ease-linear rounded-full w-11 h-11 will-change group-hover:scale-105"
                  src={getImage(answer.question.by.avatar)}
               />
               <div>
                  <div className="text-base font-medium">
                     {answer.question.by.displayName}
                  </div>
                  <div className="text-sm font-medium text-rose-400">
                     @{answer.question.by.username}
                  </div>
               </div>
            </Link>
            <div className="mt-2 text-base font-semibold break-words">
               {answer.question.question}
            </div>
         </div>
         <div className="mt-4 overflow-auto text-base font-semibold break-words">
            {answer.answer}
         </div>
         <div className="flex items-center mt-3 gap-x-4">
            <img
               className="object-cover rounded-full w-9 h-9"
               src={getImage(answer.by.avatar)}
            />
            <div>
               <div className="text-base font-medium">
                  {answer.by.displayName}
               </div>
               <div className="text-xs font-medium text-zinc-400">
                  1 week ago
               </div>
            </div>
         </div>
         <hr className="my-4 border-t border-base-700" />
         <div className="flex items-center justify-between">
            <div>
               <button className="flex items-center text-sm font-medium text-rose-400">
                  <span className="mr-2 text-lg">
                     <i className="fa-regular fa-heart"></i>
                  </span>
                  7
               </button>
            </div>
            <Actions direction="horizontal">
               {auth && auth.username === answer.by.username ? (
                  <Archive />
               ) : (
                  <Copy />
               )}
            </Actions>
         </div>
      </div>
   );
};

export default Answer;
