import { useState } from 'react';
import { RouterOutputs, trpc } from '../../lib/trpc';

import Actions from '../ui/Actions';
import Write from '../ui/Write';

interface Props {
   question: RouterOutputs['question']['getQuestions']['payload'][number];
}

const Question: React.FC<Props> = ({ question }) => {
   const [write, setWrite] = useState<boolean>(false);
   const [answer, setAnswer] = useState<string>('');

   const trpcCtx = trpc.useContext();

   const createAnswer = trpc.answer.createAnswer.useMutation({
      onSuccess(data) {
         trpcCtx.question.getQuestions.refetch();
      },
      onError(err) {
         console.log(err);
      },
   });

   function answerAction() {
      createAnswer.mutate({
         answer,
         questionId: question.id,
      });
   }

   return (
      <div className="flex flex-col gap-y-1">
         <div className="w-full p-5 border rounded-xl bg-base-800 border-base-700">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-x-4">
                  <img
                     className="w-12 h-12 rounded-full"
                     src="https://data.whicdn.com/images/361702603/original.jpg"
                  />
                  <div>
                     <div className="text-lg font-semibold">
                        {question.by.displayName}
                     </div>
                     <div className="text-sm font-medium text-zinc-400">
                        @{question.by.username}
                     </div>
                  </div>
               </div>
               <Actions direction="horizontal" actions={{}} />
            </div>
            <div className="w-full p-4 mt-5 rounded-lg bg-base-750">
               <div className="text-[0.7rem] font-semibold uppercase text-rose-400">
                  asks you
               </div>
               <div className="text-xl font-semibold">{question.question}</div>
               <div className="mt-4 text-xs font-medium text-zinc-500">
                  1 week ago
               </div>
            </div>
            {write ? (
               <div className="mt-4">
                  <div className="flex items-end justify-between pl-4">
                     <div className="text-[0.7rem] font-semibold uppercase text-rose-400">
                        your answer
                     </div>
                     <button
                        onClick={() => setWrite(false)}
                        className="text-sm transition duration-200 ease-linear rounded-lg text-zinc-300 hover:text-rose-400 h-7 w-7 bg-base-700"
                     >
                        <i className="fa-regular fa-fw fa-xmark" />
                     </button>
                  </div>
                  <div className="mt-2">
                     <Write
                        action="Answer"
                        icon="comment"
                        placeholder={`Write an answer to tyler...`}
                        tools="all"
                        className="h-24"
                        max={1000}
                        autoFocus={true}
                        value={answer}
                        setValue={setAnswer}
                        onAction={answerAction}
                     />
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-2 mt-4 gap-x-3">
                  <button
                     onClick={() => setWrite(true)}
                     className="w-full py-2 rounded-lg bg-rose-500 text-rose-200"
                  >
                     <i className="fa-solid fa-fw fa-comment" />
                  </button>
                  <button className="w-full py-2 text-red-200 bg-red-600 rounded-lg">
                     <i className="fa-solid fa-fw fa-trash" />
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Question;
