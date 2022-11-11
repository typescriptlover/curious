import clsx from 'clsx';
import getImage from '../../lib/image';

import { TPost } from '../../types/types';

interface Props {
   attachments: TPost['attachments'];
}

const Attachments: React.FC<Props> = ({ attachments }) => {
   return (
      <div className="mt-3">
         <div
            className={clsx('h-[20rem] grid grid-rows-1 gap-2', {
               'grid-cols-1': attachments.length === 1,
               'grid-cols-2': attachments.length > 1,
            })}
         >
            <div
               className={clsx('grid w-full h-full grid-cols-1 gap-2', {
                  'grid-rows-1': attachments.length < 4,
                  'grid-rows-2': attachments.length === 4,
               })}
            >
               <div className="w-full h-full">
                  <img
                     className="object-cover w-full h-full rounded-2xl"
                     src={getImage(attachments[0])}
                  />
               </div>
               {attachments.length === 4 && (
                  <div className="w-full h-full">
                     <img
                        className="object-cover w-full h-full rounded-2xl"
                        src={getImage(attachments[2])}
                     />
                  </div>
               )}
            </div>
            {attachments.length > 1 && (
               <div
                  className={clsx('grid w-full h-full grid-cols-1 gap-2', {
                     'grid-rows-1': attachments.length === 2,
                     'grid-rows-2': attachments.length > 2,
                  })}
               >
                  <div className="w-full h-full">
                     <img
                        className="object-cover w-full h-full rounded-2xl"
                        src={getImage(attachments[1])}
                     />
                  </div>
                  {attachments.length > 2 && (
                     <div className="w-full h-full">
                        <img
                           className="object-cover w-full h-full rounded-2xl"
                           src={getImage(
                              attachments.length === 4
                                 ? attachments[3]
                                 : attachments[2]
                           )}
                        />
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Attachments;
