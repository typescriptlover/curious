import { NextRouter, useRouter } from 'next/router';
import type { NextPage } from 'next';
import * as timeago from 'timeago.js';

import '../styles/tailwind.css';
import '../styles/global.css';
import '../styles/fonts/satoshi.css';

import Meta from '../components/Meta';
import Wrapper from '../layouts/Wrapper';
import Nav from '../layouts/Nav';
import FontAwesome from '../components/FontAwesome';
import Container from '../layouts/Container';
import { trpc } from '../lib/trpc';
import { AuthProvider } from '../contexts/auth';
import Toast from '../components/Toast';
import { localeFunc } from '../lib/locale';
import { NextPageWithLayout } from '../types/types';

timeago.register('cus', localeFunc);

interface AppPropsWithLayout {
   Component: NextPageWithLayout;
   props: any;
}

const App = ({ Component, props }: AppPropsWithLayout) => {
   const { data } = trpc.auth.me.useQuery(undefined, {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
   });

   const getLayout = Component.getLayout || ((page) => page);
   const router = useRouter();

   return (
      <AuthProvider auth={data?.payload ?? false}>
         <FontAwesome />
         <Meta />

         <Wrapper>
            <Toast />
            <Nav />
            <Container>{getLayout(<Component {...props} />, router)}</Container>
         </Wrapper>
      </AuthProvider>
   );
};

export default trpc.withTRPC(App);
