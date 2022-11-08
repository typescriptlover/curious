import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from '../components/ui/Link';

const Sidebar = () => {
   const router = useRouter();

   const links = [
      {
         name: 'Dashboard',
         href: '/dashboard',
         icon: 'inbox',
      },
      {
         name: 'Feed',
         href: '/feed',
         icon: 'layer-group',
      },
      {
         name: 'Explore',
         href: '/explore',
         icon: 'globe-americas',
      },
   ];

   return (
      <div className="fixed bg-base-850 shadow-2xl border-2 border-base-750 rounded-xl max-w-[12rem] w-full">
         <div className="flex flex-col px-2 py-3 gap-y-1">
            {links.map((link) => (
               <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                     'block px-4 py-2 font-semibold text-left rounded-lg transition duration-200 ease-linear',
                     router.asPath === link.href
                        ? 'bg-base-700'
                        : 'hover:bg-base-750'
                  )}
               >
                  <span
                     className={clsx(
                        'mr-3 text-lg',
                        router.asPath === link.href
                           ? 'text-rose-400'
                           : 'text-zinc-500'
                     )}
                  >
                     <i
                        className={clsx('fa-solid fa-fw', `fa-${link.icon}`)}
                     ></i>
                  </span>
                  {link.name}
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Sidebar;
