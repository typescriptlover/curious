import { useRouter } from 'next/router';
import { useState } from 'react';

import { trpc } from '../../lib/trpc';

import Profile from '../../components/User/Profile/Profile';
import Filter from '../../components/User/Filter';
import { TUserFilter } from '../../types/types';
import Error from '../../components/User/Error';
import { useAuth } from '../../contexts/auth';
import All from '../../components/User/Filters/All';
import Answers from '../../components/User/Filters/Answers';
import Posts from '../../components/User/Filters/Posts';
import Ask from '../../components/User/Ask';
import Meta from '../../components/Meta';
import { PageWithRecommended } from '../../layouts/Page';

interface HydrateProps {
   filter: TUserFilter;
   username: string;
}
const Hydrate: React.FC<HydrateProps> = ({ filter, username }) => {
   if (filter.name === 'All') {
      return <All username={username} />;
   } else if (filter.name === 'Answers') {
      return <Answers username={username} />;
   } else if (filter.name === 'Posts') {
      return <Posts username={username} />;
   }

   return null;
};

// TODO: make use of router query for tab filtering and push to query when selected
const User = () => {
   const router = useRouter();
   const { username } = router.query as Record<string, any>;

   const { auth } = useAuth();

   const { data, error, isLoading } = trpc.user.getUser.useQuery({
      username,
   });

   const filters: TUserFilter[] = [
      {
         name: 'All',
         icon: 'comments-question',
      },
      {
         name: 'Answers',
         icon: 'comment',
      },
      {
         name: 'Questions',
         icon: 'comment-question',
      },
      {
         name: 'Posts',
         icon: 'comment-pen',
      },
   ];
   const [filter, setFilter] = useState<TUserFilter>(filters[0]!);

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
   return <PageWithRecommended page={page} />;
};

export default User;
