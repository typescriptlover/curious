import { useState } from 'react';
import { trpc } from '../../lib/trpc';

import { TAuth } from '../../types/types';
import Write from '../ui/Write';

interface Props {
   auth: TAuth;
   username: string;
}

const Ask: React.FC<Props> = ({ auth, username }) => {
   const [created, setCreated] = useState<boolean>(false);
   const [question, setQuestion] = useState<string>('');

   const trpcCtx = trpc.useContext();

   const create = trpc.question.createQuestion.useMutation({
      onSuccess() {
         setCreated(true);
         trpcCtx.user.getAnalytics.refetch();
      },
      onError(err) {
         console.log(err);
      },
   });

   function askAction() {
      if (question.length > 300) return;
      create.mutate({
         username,
         question,
      });
   }

   if (!auth || auth.username === username) return null;

   if (created) {
      return (
         <div className="mt-4">
            <div className="bg-rose-500 text-sm text-white font-semibold py-3 px-4 rounded-t-xl">
               Recently asked
            </div>
            <div className="bg-base-750 py-3 px-4 rounded-b-xl">
               <div className="text-zinc-300 font-semibold text-base">
                  {question}
               </div>
               <div className="mt-3 text-zinc-400 font-medium text-xs">
                  1 minute ago
               </div>
            </div>
         </div>
      );
   }

   return (
      <Write
         action="Ask"
         icon="paper-plane"
         placeholder={`Write a question to ${username}...`}
         tools={['at', 'emojis']}
         max={300}
         parentClassName="mt-4"
         className="h-24"
         value={question}
         setValue={setQuestion}
         onAction={askAction}
         loading={create.isLoading}
      />
   );
};

export default Ask;
