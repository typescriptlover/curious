import Sidebar from '../layouts/Sidebar';
import Recommended from '../layouts/Recommended';
import Question from '../components/Question/Question';

import { trpc } from '../lib/trpc';
import { useState } from 'react';
import Meta from '../components/Meta';

const Dashboard = () => {
   const [page, setPage] = useState<number>(1);

   const { data, error, isLoading } = trpc.question.getQuestions.useQuery({
      paginate: {
         page,
      },
   });

   if (isLoading) return null;

   if (error) return <div>error</div>;

   if (!data || !data.payload || !data.payload.length) {
      return (
         <div className="items-center justify-center w-full text-center">
            <div className="text-5xl opacity-25 text-rose-400">
               <i className="fa-duotone fa-fw fa-sparkles" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-rose-400">
               Nothing more.
            </h2>
            <div className="mt-3 text-sm font-medium text-zinc-400">
               Looks like you've answered everything!
            </div>
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-y-6">
         {data.payload.map((question) => (
            <Question key={question.id} question={question} />
         ))}
      </div>
   );
};

Dashboard.getLayout = (page: any) => {
   return (
      <div className="w-full max-w-6xl mx-auto">
         <Sidebar />
         <div className="w-full pl-[14rem] gap-x-8 flex items-start">
            <Meta title="dashboard" />
            <div className="w-full">{page}</div>
            <Recommended />
         </div>
      </div>
   );
};

export default Dashboard;
