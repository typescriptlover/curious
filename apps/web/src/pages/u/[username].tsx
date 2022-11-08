import { useRouter } from 'next/router';
import { useState } from 'react';

import { trpc } from '../../lib/trpc';
import Recommended from '../../layouts/Recommended';
import Sidebar from '../../layouts/Sidebar';

import Profile from '../../components/User/Profile/Profile';
import Write from '../../components/ui/Write';
import Filter from '../../components/User/Filter';
import { TUserFilter } from '../../types/types';
import Error from '../../components/User/Error';
import { useAuth } from '../../contexts/auth';
import All from '../../components/User/Filters/All';
import Answers from '../../components/User/Filters/Answers';
import Posts from '../../components/User/Filters/Posts';
import Ask from '../../components/User/Ask';
import Meta from '../../components/Meta';

interface HydrateProps {
   filter: TUserFilter;
   username: string;
}
const Hydrate: React.FC<HydrateProps> = ({ filter, username }) => {
   if (filter === 'All') {
      return <All username={username} />;
   } else if (filter === 'Answers') {
      return <Answers username={username} />;
   } else if (filter === 'Posts') {
      return <Posts username={username} />;
   }

   return null;
};

const User = () => {
   const router = useRouter();
   const { username } = router.query as Record<string, any>;

   const { auth } = useAuth();

   const { data, error, isLoading } = trpc.user.getUser.useQuery({
      username,
   });

   const filters: TUserFilter[] = ['All', 'Answers', 'Posts'];
   const [filter, setFilter] = useState<TUserFilter>('All');

   if (isLoading) return null;

   if (error) {
      return (
         <>
            <Meta title="user" noindex={true} />
            <Error message={error.message} />
         </>
      );
   }

   return (
      <div>
         <Meta title={`@${data.payload.username}`} />
         <Profile user={data.payload} />
         <Ask auth={auth} username={username} />
         <Filter filters={filters} filter={filter} setFilter={setFilter} />
         <Hydrate filter={filter} username={username} />
      </div>
   );
};

User.getLayout = (page: any) => {
   return (
      <div className="w-full max-w-6xl mx-auto">
         <Sidebar />
         <div className="w-full pl-[14rem] gap-x-8 flex items-start">
            <div className="w-full">{page}</div>
            <Recommended />
         </div>
      </div>
   );
};

export default User;
