const Recommended = () => {
   return (
      <div className="sticky self-start top-0 pt-[6.25rem] -mt-[6.25rem]">
         <div className="relative overflow-hidden border-2 rounded-xl border-base-750">
            <div className="px-5 py-4 bg-base-750">
               <h2 className="text-xl font-semibold">Recommended</h2>
            </div>
            <div className="px-5 py-4 bg-base-800">
               <div className="flex flex-col gap-y-6">
                  <div className="flex items-start gap-x-4">
                     <img
                        className="w-10 h-10 rounded-full"
                        src="https://data.whicdn.com/images/361702603/original.jpg"
                     />
                     <div>
                        <div className="font-semibold">tyler james</div>
                        <div className="text-xs font-medium text-zinc-400">
                           @tyler
                        </div>
                     </div>
                  </div>
                  <div className="flex items-start gap-x-4">
                     <img
                        className="w-10 h-10 rounded-full"
                        src="https://data.whicdn.com/images/354118841/original.jpg"
                     />
                     <div>
                        <div className="font-semibold">samantha</div>
                        <div className="text-xs font-medium text-zinc-400">
                           @sam
                        </div>
                     </div>
                  </div>
                  <div className="flex items-start gap-x-4">
                     <img
                        className="w-10 h-10 rounded-full"
                        src="https://data.whicdn.com/images/348243990/original.jpg"
                     />
                     <div>
                        <div className="font-semibold">reaper</div>
                        <div className="text-xs font-medium text-zinc-400">
                           @ra
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Recommended;
