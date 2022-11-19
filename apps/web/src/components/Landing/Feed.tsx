import Animate from '../Animate';

const Feed = () => {
   return (
      <div className="flex flex-col items-center w-full">
         <Animate.FadeUp
            className="w-full block"
            key="feed-2"
            y={75}
            delay={0.4}
            duration={0.3}
         >
            <div className="w-full max-w-md p-5 border shadow opacity-75 rotate-[10deg] rounded-xl bg-base-750 border-base-650">
               <div className="p-3 rounded-lg bg-base-700">
                  <div className="flex items-center group gap-x-3">
                     <img
                        className="w-8 h-8 rounded-full"
                        src="https://data.whicdn.com/images/361702603/original.jpg"
                     />
                     <div>
                        <div className="text-xs font-medium">johnny</div>
                        <div className="text-[0.65rem] font-medium text-rose-400">
                           @john
                        </div>
                     </div>
                  </div>
                  <div className="mt-3 text-xs font-semibold">
                     What do you think of Kanye's new album?
                  </div>
               </div>
               <div className="mt-4 text-xs font-semibold">
                  It's a bit different but I fell in love with it.
               </div>
               <div className="flex items-center mt-3 gap-x-3">
                  <img
                     className="rounded-full w-7 h-7"
                     src="https://data.whicdn.com/images/355760513/original.png"
                  />
                  <div>
                     <div className="text-xs font-medium">tyler</div>
                     <div className="text-[0.65rem] font-medium text-zinc-400">
                        1 minute ago
                     </div>
                  </div>
               </div>
            </div>
         </Animate.FadeUp>
         <Animate.FadeUp key="feed-1" y={25} duration={0.4}>
            <div className="z-10 w-full opacity-90 max-w-sm p-5 -mt-8 shadow-2xl -rotate-[4deg] bg-base-700 rounded-2xl">
               <div className="flex items-center gap-x-4">
                  <img
                     className="w-8 h-8 rounded-full"
                     src="https://data.whicdn.com/images/355760513/original.png"
                  />
                  <div>
                     <div className="text-xs font-semibold">tyler</div>
                     <div className="text-[0.65rem] font-medium text-zinc-400">
                        8 hours ago
                     </div>
                  </div>
               </div>
               <div className="mt-5 text-xs font-semibold">
                  I'll be answering all of your questions tonight, shoot me some
                  interesting ones.
               </div>
            </div>
         </Animate.FadeUp>
      </div>
   );
};

export default Feed;
