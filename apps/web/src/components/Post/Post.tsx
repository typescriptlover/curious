import clsx from 'clsx';
import { useAuth } from '../../contexts/auth';
import { TPost } from '../../types/types';
import Actions from '../ui/Actions';
import Attachments from './Attachments';

interface Props {
   post: TPost;
}

const Post: React.FC<Props> = ({ post }) => {
   const { auth } = useAuth();

   return (
      <div className="w-full p-5 bg-base-700 rounded-2xl">
         <div className="flex items-center gap-x-4">
            <img
               className="w-12 h-12 rounded-full"
               src="https://data.whicdn.com/images/355760513/original.png"
            />
            <div>
               <div className="text-lg font-semibold">
                  {post.by.displayName}
               </div>
               <div className="text-xs font-medium text-zinc-400">
                  2 weeks ago
               </div>
            </div>
         </div>
         <div className="mt-5 font-semibold">{post.body}</div>
         {!!post.attachments.length && (
            <Attachments attachments={post.attachments} />
         )}
         <hr className="my-4 border-t border-base-650" />
         <div className="flex items-center justify-between">
            <div>
               <button className="flex items-center text-sm font-medium text-rose-400">
                  <span className="mr-2 text-base">
                     <i className="fa-regular fa-heart"></i>
                  </span>
                  3
               </button>
            </div>
            <Actions direction="horizontal" actions={{}} />
         </div>
      </div>
   );
};

export default Post;
