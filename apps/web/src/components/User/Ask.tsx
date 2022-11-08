import { useState } from 'react';
import { trpc } from '../../lib/trpc';

import { TAuth } from '../../types/types';
import Write from '../ui/Write';

interface Props {
   auth: TAuth;
   username: string;
}

const Ask: React.FC<Props> = ({ auth, username }) => {
   const [question, setQuestion] = useState<string>('');

   const trpcCtx = trpc.useContext();

   const create = trpc.question.createQuestion.useMutation({
      onSuccess(data) {
         console.log(data);
         trpcCtx.user.getAnalytics.refetch();
         setQuestion('');
      },
      onError(err) {
         console.log(err);
      },
   });

   function askAction() {
      create.mutate({
         username,
         question,
      });
   }

   if (!auth || auth.username === username) return null;

   return (
      <Write
         action="Ask"
         icon="paper-plane"
         placeholder={`Write a question to ${username}...`}
         tools={['at', 'emojis']}
         max={1000}
         parentClassName="mt-4"
         className="h-24"
         value={question}
         setValue={setQuestion}
         onAction={askAction}
      />
   );
};

export default Ask;
