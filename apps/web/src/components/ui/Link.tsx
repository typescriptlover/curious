import clsx from 'clsx';
import { default as NextLink, LinkProps } from 'next/link';

interface Props extends LinkProps {
   children: React.ReactNode;
   className?: string;
}

const Link: React.FC<Props> = ({ children, className, ...props }) => {
   return (
      <NextLink {...props}>
         <a
            className={clsx(
               'font-medium text-rose-400 transition duration-200 ease-linear hover:text-rose-300',
               className
            )}
         >
            {children}
         </a>
      </NextLink>
   );
};

export default Link;
