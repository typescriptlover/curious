import { useState } from 'react';
import { trpc } from '../../../lib/trpc';
import Post from '../../Post/Post';

interface Props {
   username: string;
}

const Posts: React.FC<Props> = ({ username }) => {
   const [page, setPage] = useState<number>(1);

   const { data, error, isLoading } = trpc.post.getPosts.useQuery({
      username,
      paginate: {
         page,
      },
   });

   if (isLoading) return null;

   if (error) return <div>error</div>;

   if (!data || !data.payload || !data.payload.length)
      return (
         <div className="items-center justify-center w-full mb-6 text-center mt-14">
            <div className="text-5xl opacity-25 text-rose-400">
               <i className="fa-duotone fa-fw fa-message-pen" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-rose-400">
               Empty posts.
            </h2>
            <div className="w-full max-w-xs mx-auto mt-3 text-sm font-medium text-zinc-400">
               This user hasn't posted anything yet, maybe they're too busy.
            </div>
         </div>
      );

   return (
      <div className="flex flex-col mt-6 gap-y-4">
         {data.payload.map((post) => (
            <Post key={post.id} post={post} />
         ))}
      </div>
   );
};

export default Posts;
