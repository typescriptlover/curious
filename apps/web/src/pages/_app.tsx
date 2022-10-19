import type { AppProps } from 'next/app';

import '../styles/tailwind.css';
import '../styles/fonts/inter.css';
import '../styles/fonts/satoshi.css';

import Meta from '../components/Meta';
import Wrapper from '../layouts/Wrapper';
import Nav from '../layouts/Nav';
import FontAwesome from '../components/FontAwesome';
import Container from '../layouts/Container';

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <>
         <FontAwesome />
         <Meta />

         <Wrapper>
            <Nav />
            <Container>
               <Component {...pageProps} />
            </Container>
         </Wrapper>
      </>
   );
};

export default App;
