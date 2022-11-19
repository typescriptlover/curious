import { useRouter } from 'next/router';

import { PageWithRecommended } from '../../layouts/Page';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../contexts/auth';
import Profile from '../../components/User/Profile/Profile';
import Filter, { filters } from '../../components/User/Filter';
import Error from '../../components/User/Error';
import Ask from '../../components/User/Ask';
import Meta from '../../components/Meta';
import All from '../../components/User/Filters/All';
import { NextPageWithLayout, TUserFilter } from '../../types/types';
import Answers from '../../components/User/Filters/Answers';
import Posts from '../../components/User/Filters/Posts';

interface HydrateProps {
   tab: string;
   username: string;
}
const Hydrate: React.FC<HydrateProps> = ({ tab, username }) => {
   if (tab === 'answers') {
      return <Answers username={username} />;
   } else if (tab === 'posts') {
      return <Posts username={username} />;
   }

   return null;
};

const User: NextPageWithLayout = () => {
   const router = useRouter();
   const { username, tab } = router.query as Record<string, any>;

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
         <Hydrate tab={tab} username={username} />
      </div>
   );
};

export async function getServerSideProps(ctx: any) {
   const { tab } = ctx.params;

   const filtersName = filters
      .map((filter) => filter.route.split('/')[1])
      .filter((v) => !!v);

   return { props: {}, notFound: !filtersName.includes(tab) };
}

User.getLayout = (page) => {
   return <PageWithRecommended page={page} />;
};

export default User;
