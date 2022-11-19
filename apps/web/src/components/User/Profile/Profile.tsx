import { useState } from 'react';

import { useAuth } from '../../../contexts/auth';
import Actions from '../../ui/Actions';
import Analytics from './Analytics';
import Header from './Header';
import Avatar from './Avatar';
import Info from './Info';
import Follow from './Toggle/Follow';
import Edit from './Toggle/Edit';
import useCancelState from '../../../hooks/useCancelState';

import { TUser } from '../../../types/types';
import { RouterInputs } from '../../../lib/trpc';
import Block from '../../Actions/Block';

interface Props {
   user: TUser;
}

const Profile: React.FC<Props> = ({ user }) => {
   const { auth } = useAuth();

   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [edit, setEdit, cancelEdit] = useCancelState<
      RouterInputs['user']['editProfile']
   >({
      displayName: undefined,
      username: undefined,
      header: undefined,
      avatar: undefined,
   });

   function updateEdit(newEdit: typeof edit) {
      setEdit({
         ...edit,
         ...newEdit,
      });
   }

   function changeEdit(
      value: any,
      key: keyof RouterInputs['user']['editProfile']
   ) {
      if (!value || value === user[key]) {
         updateEdit({
            [key]: undefined,
         });
      } else {
         updateEdit({
            [key]: value,
         });
      }
   }

   return (
      <div>
         <Header
            user={user}
            edit={edit}
            isEditing={isEditing}
            changeEdit={changeEdit}
         />
         <div className="p-5 -mt-2 border-2 bg-base-850 border-base-750 rounded-b-xl">
            <div className="flex items-center justify-between">
               <Avatar
                  user={user}
                  edit={edit}
                  isEditing={isEditing}
                  changeEdit={changeEdit}
               />
               {auth && (
                  <div className="flex items-center gap-x-4">
                     {auth.username !== user.username ? (
                        <>
                           <Follow />
                           <Actions direction="horizontal">
                              <Block />
                           </Actions>
                        </>
                     ) : (
                        <Edit
                           edit={edit}
                           updateEdit={updateEdit}
                           cancelEdit={cancelEdit}
                           isEditing={isEditing}
                           setIsEditing={setIsEditing}
                        />
                     )}
                  </div>
               )}
            </div>
            <Info
               user={user}
               edit={edit}
               isEditing={isEditing}
               changeEdit={changeEdit}
            />
            <Analytics user={user} isEditing={isEditing} />
         </div>
      </div>
   );
};

export default Profile;
