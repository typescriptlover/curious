import clsx from 'clsx';
import TimeAgo from 'timeago-react';
import { useAuth } from '../../contexts/auth';
import getImage from '../../lib/image';
import { TPost } from '../../types/types';
import Archive from '../Actions/Archive';
import Block from '../Actions/Block';
import Copy from '../Actions/Copy';
import Delete from '../Actions/Delete';
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
               className="object-cover w-12 h-12 rounded-full"
               src={getImage(post.by.avatar)}
            />
            <div>
               <div className="text-lg font-semibold">
                  {post.by.displayName}
               </div>
               <div className="text-xs font-medium text-zinc-400">
                  <TimeAgo datetime={post.createdAt} locale="cus" />
               </div>
            </div>
         </div>
         <div className="grid mt-5 overflow-auto font-semibold break-words">
            {post.body}
         </div>
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
            <Actions direction="horizontal">
               {auth && auth.username === post.by.username ? (
                  <Archive />
               ) : (
                  <Copy />
               )}
            </Actions>
         </div>
      </div>
   );
};

export default Post;
