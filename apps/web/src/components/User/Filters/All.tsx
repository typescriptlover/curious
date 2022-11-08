import { useState } from 'react';

import { trpc } from '../../../lib/trpc';
import Answer from '../../Answer/Answer';
import Post from '../../Post/Post';
import { TAnswer, TPost } from '../../../types/types';

interface Props {
   username: string;
}

const All: React.FC<Props> = ({ username }) => {
   const [page, setPage] = useState<number>(1);

   const { data, error, isLoading } = trpc.user.getAll.useQuery({
      username,
      paginate: {
         page,
      },
   });

   if (isLoading) return null;

   if (error) return <div>error</div>;

   if (!data || !data.payload || !data.payload.length)
      return (
         <div className="items-center justify-center w-full mb-6 text-center mt-14">
            <div className="text-5xl opacity-25 text-rose-400">
               <i className="fa-duotone fa-fw fa-layer-group" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-rose-400">
               Empty timeline.
            </h2>
            <div className="w-full max-w-xs mx-auto mt-3 text-sm font-medium text-zinc-400">
               This user hasn't been active yet, maybe they're new or shy.
            </div>
         </div>
      );

   return (
      <div className="flex flex-col mt-6 gap-y-4">
         {data.payload.map((value) => {
            if (value.hasOwnProperty('answer')) {
               return <Answer key={value.id} answer={value as TAnswer} />;
            } else if (value.hasOwnProperty('body')) {
               return <Post key={value.id} post={value as TPost} />;
            }

            return <div>Not implemented</div>;
         })}
      </div>
   );
};

export default All;
