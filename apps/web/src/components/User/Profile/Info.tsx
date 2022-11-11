import Tooltip from '../../ui/Tooltip';

import { RouterInputs } from '../../../lib/trpc';
import { TUser } from '../../../types/types';

interface Props {
   user: TUser;
   isEditing: boolean;
   edit: RouterInputs['user']['editProfile'];
   changeEdit(
      value: string,
      key: keyof RouterInputs['user']['editProfile']
   ): void;
}

const InfoEditing: React.FC<Props> = ({ user, edit, changeEdit }) => {
   return (
      <div className="px-2">
         <Tooltip text="Display name" placement="top-start" hideOnClick={false}>
            <input
               onInput={(e: any) => changeEdit(e.target.value, 'displayName')}
               value={edit.displayName ?? user.displayName}
               className="block relative w-full max-w-[10rem] focus:outline-none px-2 py-0.5 text-lg font-bold rounded-lg bg-base-750"
            />
         </Tooltip>
         <Tooltip text="Username" placement="top-start" hideOnClick={false}>
            <div className="max-w-[7rem] relative mt-1">
               <input
                  onInput={(e: any) => changeEdit(e.target.value, 'username')}
                  value={edit.username ?? user.username}
                  className="block w-full py-1 pl-5 pr-2 mt-1 text-sm font-semibold rounded-lg focus:outline-none bg-base-750 text-rose-400"
               />
               <div className="pointer-events-none absolute inset-y-0 flex items-center text-sm font-semibold left-1.5 text-rose-400">
                  @
               </div>
            </div>
         </Tooltip>
         <Tooltip text="Bio" placement="top-start" hideOnClick={false}>
            <div className="mt-4">
               <textarea
                  onInput={(e: any) => changeEdit(e.target.value, 'bio')}
                  value={edit.bio ?? user.bio ?? ''}
                  placeholder="No bio set."
                  className="w-full px-3 py-2 text-sm font-medium rounded-lg resize-none focus:outline-none placeholder:text-zinc-400 text-zinc-300 bg-base-750"
               />
            </div>
         </Tooltip>
      </div>
   );
};

const Info: React.FC<Props> = ({ user, isEditing, edit, changeEdit }) => {
   if (isEditing) {
      return (
         <InfoEditing
            user={user}
            edit={edit}
            isEditing={isEditing}
            changeEdit={changeEdit}
         />
      );
   }

   return (
      <div className="px-2">
         <h2 className="text-xl font-bold">{user.displayName}</h2>
         <div className="text-sm font-semibold text-rose-400">
            @{user.username}
         </div>
         <div className="mt-4 text-sm font-medium text-zinc-300">
            {user.bio ?? 'No bio set.'}
         </div>
      </div>
   );
};

export default Info;
