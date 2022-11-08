import { useState } from 'react';

import { useAuth } from '../../../contexts/auth';
import Actions from '../../ui/Actions';
import Analytics from './Analytics';
import Follow from './Follow';
import Notifications from './Notifications';

import { TUser } from '../../../types/types';
import Edit from './Edit';

interface Props {
   user: TUser;
}

const Profile: React.FC<Props> = ({ user }) => {
   const { auth } = useAuth();

   const [isEditing, setIsEditing] = useState<boolean>(false);

   return (
      <div>
         <div className="relative w-full h-44">
            <div className="absolute inset-0 overflow-hidden rounded-xl bg-base-900">
               <img
                  className="object-cover w-full h-full -z-10 opacity-30"
                  src="https://data.whicdn.com/images/324215715/original.jpg"
               />
            </div>
         </div>
         <div className="p-5 -mt-4 border-2 bg-base-850 border-base-750 -z-10 rounded-xl">
            <div className="relative z-20 flex items-start justify-between -mt-14">
               <div className="inline-block p-2 rounded-full bg-base-850">
                  <img
                     src="https://data.whicdn.com/images/355760513/original.png"
                     className="w-24 h-24 rounded-full"
                  />
               </div>
               <div className="flex items-center mt-16 gap-x-4">
                  {auth && auth.username !== user.username ? (
                     <>
                        <Follow />
                        <Actions direction="horizontal" actions={{}} />
                        <Notifications />
                     </>
                  ) : (
                     <Edit isEditing={isEditing} setIsEditing={setIsEditing} />
                  )}
               </div>
            </div>
            <div className="px-2">
               <h2 className="text-xl font-bold">{user.displayName}</h2>
               <div className="text-sm font-semibold text-rose-400">
                  @{user.username}
               </div>
               <div className="mt-4 text-sm font-medium text-zinc-300">
                  {user.bio ?? 'No bio set.'}
               </div>
            </div>
            <Analytics username={user.username} />
         </div>
      </div>
   );
};

export default Profile;
