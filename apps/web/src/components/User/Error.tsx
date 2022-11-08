import { useRouter } from 'next/router';

interface Props {
   message: string;
}

const Error: React.FC<Props> = ({ message }) => {
   const router = useRouter();

   return (
      <div>
         <div className="relative w-full h-44">
            <div className="absolute inset-0 overflow-hidden rounded-xl bg-base-900">
               <div className="w-full h-full bg-base-750"></div>
            </div>
         </div>
         <div className="p-5 -mt-4 border-2 bg-base-850 border-base-750 -z-10 rounded-xl">
            <div className="relative z-20 flex items-start justify-between -mt-14">
               <div className="inline-block p-2 rounded-full bg-base-850">
                  <div className="w-24 h-24 rounded-full bg-base-750" />
               </div>
            </div>
            <div className="relative px-2">
               <div className="text-zinc-400 font-medium">
                  @{router.query.username}
               </div>
               <div className="mt-4 text-lg font-semibold text-rose-400">
                  {message}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Error;
