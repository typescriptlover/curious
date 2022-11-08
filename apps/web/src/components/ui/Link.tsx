import { default as NextLink, LinkProps } from 'next/link';

interface Props extends LinkProps {
   children: React.ReactNode;
   className?: string;
}

const Link: React.FC<Props> = ({ children, className, ...props }) => {
   return (
      <NextLink {...props}>
         <a className={className}>{children}</a>
      </NextLink>
   );
};

export default Link;
