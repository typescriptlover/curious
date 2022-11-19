import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../contexts/auth';

import { RouterInputs, trpc } from '../../../../lib/trpc';
import { IAuthContextForce } from '../../../../types/interfaces';
import Tooltip from '../../../ui/Tooltip';

interface Props {
   edit: RouterInputs['user']['editProfile'];
   updateEdit: (edit: RouterInputs['user']['editProfile']) => void;
   cancelEdit: any;
   isEditing: boolean;
   setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const Edit: React.FC<Props> = ({
   edit,
   updateEdit,
   cancelEdit,
   isEditing,
   setIsEditing,
}) => {
   const { auth, updateAuth } = useAuth<IAuthContextForce>();
   const router = useRouter();
   const trpcCtx = trpc.useContext();

   const editProfile = trpc.user.editProfile.useMutation({
      onSuccess: async ({ payload }) => {
         const { username } = payload;
         updateAuth(payload);
         setIsEditing(false);
         if (auth.username !== username) {
            router.push(`/@${username}`);
         } else {
            trpcCtx.user.getUser.refetch();
         }
         toast('Edited profile', {
            position: 'bottom-center',
         });
      },
      onError: (err) => {
         console.log(err);
      },
   });

   function Save() {
      const payload = Object.fromEntries(
         Object.entries(edit).map(([k, v]) => {
            return [k, v !== undefined ? (v.length ? v : undefined) : v];
         })
      );
      const empty = Object.values(payload).every((el) => el === undefined);
      if (empty) {
         cancelEdit();
         return setIsEditing(false);
      }

      editProfile.mutate(payload);
   }

   return (
      <div className="flex items-center gap-x-2">
         <Tooltip text={isEditing ? 'Cancel editing' : 'Edit my profile'}>
            <button
               onClick={() => {
                  cancelEdit();
                  setIsEditing(!isEditing);
               }}
               className="text-lg transition duration-200 ease-linear text-zinc-400 hover:text-rose-400"
            >
               <i
                  className={`fa-solid fa-fw fa-${
                     isEditing ? 'xmark' : 'pen-swirl'
                  }`}
               />
            </button>
         </Tooltip>
         {isEditing && (
            <Tooltip text="Save changes">
               <button onClick={Save} className="text-lg text-rose-400">
                  <i className="fa-solid fa-fw fa-check-double" />
               </button>
            </Tooltip>
         )}
      </div>
   );
};

export default Edit;
