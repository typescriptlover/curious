import Document, { Html, Main, Head, NextScript } from 'next/document';

import { SEO } from '../lib/config';
import Body from '../layouts/Body';

class Doc extends Document {
   render() {
      return (
         <Html lang={SEO.locale}>
            <Head />
            <Body>
               <Main />
               <NextScript />
            </Body>
         </Html>
      );
   }
}

export default Doc;
