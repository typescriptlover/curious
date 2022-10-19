import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { SEO } from '../lib/config';

interface Props {
   title?: string;
   description?: string;
   canonical?: string;
   noindex?: boolean;
   nofollow?: boolean;
}

const Meta: React.FC<Props> = (props) => (
   <>
      <Head>
         <meta charSet="UTF-8" key="charset" />
         <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
            key="viewport"
         />
      </Head>

      <NextSeo
         title={props.title ? SEO.title + ' • ' + props.title : SEO.title}
         description={props.description || SEO.description}
         canonical={props.canonical || SEO.canonical}
         openGraph={{
            title: props.title ? SEO.title + ' • ' + props.title : SEO.title,
            description: props.description || SEO.description,
            url: props.canonical || SEO.canonical,
            locale: SEO.locale,
            site_name: SEO.site_name,
         }}
         noindex={props.noindex || false}
         nofollow={props.nofollow || false}
      />
   </>
);

export default Meta;
