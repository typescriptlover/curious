import { forwardRef, MutableRefObject, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import clsx from 'clsx';

import useRouteChange from '../../hooks/useRouteChange';
import useClickOutside from '../../hooks/useClickOutside';

interface Props {
   children: React.ReactNode;
   showDropdown: boolean;
   setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
   left?: boolean;
   onClose?: any;
   parentClassName?: string;
   className?: string;
   focusLock?: boolean;
   arrow?: boolean;
   hidePresence?: boolean;
   stall?: boolean;
}

const Dropdown = forwardRef<HTMLElement, Props>(
   (
      {
         children,
         showDropdown,
         setShowDropdown,
         onClose,
         parentClassName,
         className,
         focusLock,
         hidePresence,
         stall,
      },
      ref
   ) => {
      const close = () => {
         if (stall) return;
         if (onClose) onClose();
         setShowDropdown(false);
      };

      useRouteChange(close);
      useClickOutside(showDropdown, ref as RefObject<HTMLElement>, close, [
         stall,
      ]);

      const dropdown = (
         <FocusLock autoFocus={false} disabled={focusLock === false}>
            <motion.div
               className={clsx(
                  'absolute z-[100]',
                  parentClassName ?? 'top-12 right-0 origin-top-right'
               )}
               initial={{ opacity: 0, y: -15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
               <div className={className}>{children}</div>
            </motion.div>
         </FocusLock>
      );

      if (!hidePresence) {
         return (
            <AnimatePresence mode="wait">
               {showDropdown && dropdown}
            </AnimatePresence>
         );
      } else {
         return dropdown;
      }
   }
);

export default Dropdown;
