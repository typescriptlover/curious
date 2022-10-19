import Script from 'next/script';

const FontAwesome = () => {
   return (
      <Script
         src="https://kit.fontawesome.com/bfd3987de4.js"
         crossOrigin="anonymous"
         strategy="beforeInteractive"
      />
   );
};

export default FontAwesome;
