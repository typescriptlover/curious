import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
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

const HeaderEditing: React.FC<Props> = ({
   user,
   isEditing,
   edit,
   changeEdit,
}) => {
   const ref = useRef<HTMLInputElement>(null);
   const [file, setFile] = useState<string>('');

   useEffect(() => {
      changeEdit(file, 'header');
   }, [file]);

   return (
      <>
         <Tooltip text="Header">
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

const Header: React.FC<Props> = ({ user, isEditing, edit, changeEdit }) => {
   return (
      <div className="relative w-full h-44">
         <div className="absolute inset-0 overflow-hidden rounded-xl bg-base-900">
            {edit.header || user.header ? (
               <img
                  className={clsx(
                     'object-cover w-full h-full -z-10',
                     isEditing ? 'opacity-25' : 'opacity-40'
                  )}
                  src={edit.header ?? `https://i.imgur.com/${user.header}.jpg`}
               />
            ) : (
               <div className="w-full h-full bg-rose-400/20" />
            )}
         </div>
         {isEditing && (
            <HeaderEditing
               user={user}
               isEditing={isEditing}
               edit={edit}
               changeEdit={changeEdit}
            />
         )}
      </div>
   );
};

export default Header;
