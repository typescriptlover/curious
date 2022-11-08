import { RouterOutputs, trpc } from '../../../lib/trpc';

interface Props {
   username: string;
}

const Analytics: React.FC<Props> = ({ username }) => {
   const { data, error, isLoading } = trpc.user.getAnalytics.useQuery({
      username,
   });

   function displayCount(
      type: keyof RouterOutputs['user']['getAnalytics']['payload']
   ) {
      if (isLoading || error || !data || !data.payload) {
         return '?';
      }

      return data.payload[type];
   }

   return (
      <div className="grid w-full grid-cols-4 mt-8 gap-x-2">
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {displayCount('questions')}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               questions received
            </div>
         </div>
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {displayCount('answersCreated')}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               answers given
            </div>
         </div>
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {displayCount('questionsCreated')}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               questions asked
            </div>
         </div>
         <div className="p-4 rounded-lg bg-base-750">
            <div className="text-lg font-semibold text-rose-400">
               {displayCount('answers')}
            </div>
            <div className="text-xs font-medium text-zinc-400">
               answers received
            </div>
         </div>
      </div>
   );
};

export default Analytics;
