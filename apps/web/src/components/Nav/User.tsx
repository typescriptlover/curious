import clsx from 'clsx';
import { ButtonHTMLAttributes, useRef, useState } from 'react';
import { LinkProps } from 'next/link';
import cookie from 'js-cookie';

import Dropdown from '../ui/Dropdown';
import Link from '../ui/Link';
import { useAuth } from '../../contexts/auth';
import { IAuthContextForce } from '../../types/interfaces';
import { useRouter } from 'next/router';

interface DropdownLinkProps extends LinkProps {
   children: React.ReactNode;
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ children, ...props }) => {
   return (
      <Link
         className="block w-full px-3 py-2 text-sm font-semibold text-left transition duration-200 ease-linear rounded-lg focus:outline-none hover:bg-base-750 focus:bg-base-750"
         {...props}
      >
         {children}
      </Link>
   );
};

interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   className?: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
   children,
   className,
   ...props
}) => {
   return (
      <button
         className={clsx(
            'block w-full px-3 py-2 text-sm font-semibold text-left transition duration-200 ease-linear rounded-lg focus:outline-none hover:bg-base-750 focus:bg-base-750',
            className
         )}
         {...props}
      >
         {children}
      </button>
   );
};

const User = () => {
   const ref = useRef<HTMLDivElement>(null);
   const [showDropdown, setShowDropdown] = useState<boolean>(false);

   const { auth, updateAuth } = useAuth<IAuthContextForce>();
   const router = useRouter();

   function Logout() {
      cookie.remove('curious');
      updateAuth(false);

      return router.push('/');
   }

   // https://i.imgur.com/fYcODaP.png

   return (
      <div ref={ref} className="relative flex-shrink-0">
         <button
            className="block group"
            onClick={() => setShowDropdown(!showDropdown)}
         >
            <img
               className={clsx(
                  'h-9 w-9 transition duration-200 ease-linear will-change rounded-full object-cover',
                  showDropdown ? 'scale-105' : ' group-hover:scale-105'
               )}
               src="https://data.whicdn.com/images/355760513/original.png"
            />
         </button>
         <Dropdown
            ref={ref}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            className="p-2 border-2 bg-base-850 border-base-750 w-36 rounded-xl shadow-2xl"
         >
            <div className="flex flex-col">
               <DropdownLink href={`/@${auth.username}`}>
                  My Profile
               </DropdownLink>
               <DropdownLink href="/notifications">Notifications</DropdownLink>
               <DropdownButton className="text-red-400" onClick={Logout}>
                  Logout
               </DropdownButton>
            </div>
         </Dropdown>
      </div>
   );
};

export default User;
