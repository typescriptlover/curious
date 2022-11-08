import { Dispatch, SetStateAction } from 'react';

interface Props {
   isEditing: boolean;
   setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const Edit: React.FC<Props> = ({ isEditing, setIsEditing }) => {
   return (
      <button className="text-lg transition duration-200 ease-linear text-zinc-400 hover:text-rose-400">
         <i className="fa-solid fa-fw fa-pen-swirl" />
      </button>
   );
};

export default Edit;
