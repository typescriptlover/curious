import { useRouter } from 'next/router';

import { PageWithRecommended } from '../../layouts/Page';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../contexts/auth';
import Profile from '../../components/User/Profile/Profile';
import Filter from '../../components/User/Filter';
import Error from '../../components/User/Error';
import Ask from '../../components/User/Ask';
import Meta from '../../components/Meta';
import All from '../../components/User/Filters/All';
import { NextPageWithLayout } from '../../types/types';

const User: NextPageWithLayout = () => {
   const router = useRouter();
   const { username } = router.query as Record<string, any>;

   const { auth } = useAuth();

   const { data, error, isLoading } = trpc.user.getUser.useQuery({
      username,
   });

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
         <Filter username={username} />
         <All username={username} />
      </div>
   );
};

User.getLayout = (page: any) => {
   return <PageWithRecommended page={page} />;
};

export default User;
