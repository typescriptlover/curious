import { useState } from 'react';
import { trpc } from '../../../lib/trpc';
import Answer from '../../Answer/Answer';

interface Props {
   username: string;
}

const Answers: React.FC<Props> = ({ username }) => {
   const [page, setPage] = useState<number>(1);

   const { data, error, isLoading } = trpc.answer.getAnswers.useQuery({
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
               <i className="fa-duotone fa-fw fa-comments" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-rose-400">
               Empty answers.
            </h2>
            <div className="w-full max-w-xs mx-auto mt-3 text-sm font-medium text-zinc-400">
               This user hasn't answered anyone yet, ask them a question and be
               their first.
            </div>
         </div>
      );

   return (
      <div className="flex flex-col mt-6 gap-y-4">
         {data.payload.map((answer) => (
            <Answer key={answer.id} answer={answer} />
         ))}
      </div>
   );
};

export default Answers;
