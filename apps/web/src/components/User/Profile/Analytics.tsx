import clsx from 'clsx';

import { TUser } from '../../../types/types';

interface Props {
   user: TUser;
   isEditing: boolean;
}

const Analytics: React.FC<Props> = ({ user, isEditing }) => {
   return (
      <div
         className={clsx(
            'grid w-full grid-cols-4 mt-8 gap-x-2',
            isEditing && 'opacity-50'
         )}
      >
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {user._count.questions}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               questions received
            </div>
         </div>
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {user._count.answersCreated}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               answers given
            </div>
         </div>
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {user._count.questionsCreated}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               questions asked
            </div>
         </div>
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {user._count.answers}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               answers received
            </div>
         </div>
      </div>
   );
};

export default Analytics;
