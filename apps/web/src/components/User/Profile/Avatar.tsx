import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import getImage from '../../../lib/image';
import { RouterInputs } from '../../../lib/trpc';
import { TUser } from '../../../types/types';
import Tooltip from '../../ui/Tooltip';
import Upload from '../../ui/Upload';

interface Props {
   user: TUser;
   isEditing: boolean;
   edit: RouterInputs['user']['editProfile'];
   changeEdit(
      value: string,
      key: keyof RouterInputs['user']['editProfile']
   ): void;
}

const AvatarEditing: React.FC<Props> = ({
   user,
   isEditing,
   edit,
   changeEdit,
}) => {
   const ref = useRef<HTMLInputElement>(null);
   const [file, setFile] = useState<string>('');

   useEffect(() => {
      changeEdit(file, 'avatar');
   }, [file]);

   return (
      <>
         <Tooltip text="Avatar">
            <button
               onClick={() => ref.current?.click()}
               className="absolute inset-0 flex items-center justify-center group"
            >
               <div className="text-xl transition duration-200 ease-linear text-zinc-300 group-hover:text-rose-400 will-change group-hover:scale-110">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
               </div>
            </button>
         </Tooltip>
         <Upload ref={ref} file={file} setFile={setFile} />
      </>
   );
};

const Avatar: React.FC<Props> = ({ user, isEditing, edit, changeEdit }) => {
   return (
      <div className="relative inline-block p-2 -mt-16 rounded-full pointer-events-auto bg-base-850">
         <img
            src={
               edit.avatar || user.avatar
                  ? edit.avatar ?? getImage(user.avatar)
                  : getImage('')
            }
            className={clsx(
               'object-cover w-24 h-24 rounded-full',
               isEditing && 'opacity-25'
            )}
         />
         {isEditing && (
            <AvatarEditing
               user={user}
               isEditing={isEditing}
               edit={edit}
               changeEdit={changeEdit}
            />
         )}
      </div>
   );
};

export default Avatar;
