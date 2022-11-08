import { AnimatePresence } from 'framer-motion';
import {
   Dispatch,
   FC,
   ReactNode,
   SetStateAction,
   useEffect,
   useState,
   useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import useClickOutside from '../../hooks/useClickOutside';

interface Props {
   children: ReactNode;
   showModal: boolean;
   setShowModal: Dispatch<SetStateAction<boolean>>;
   onClose?: any;
}
const Modal: FC<Props> = ({ children, showModal, setShowModal, onClose }) => {
   const ref = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   const close = () => {
      if (onClose) onClose();
      setShowModal(false);
   };

   useClickOutside(showModal, ref, close, []);

   useEffect(() => {
      document.body.style.overflowY = showModal ? 'hidden' : 'auto';
      if (containerRef.current) {
         containerRef.current.style.overflowY = showModal ? 'auto' : 'hidden';
      }
   }, [showModal, containerRef.current]);

   return createPortal(
      <AnimatePresence mode="wait">
         {showModal && (
            <motion.div
               ref={containerRef}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ ease: 'easeInOut', duration: 0.4 }}
               className={clsx(
                  'fixed inset-0 overflow-y-auto z-[500] bg-black/60 px-4 py-8'
               )}
            >
               <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 45 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 45 }}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                  className={clsx(
                     'relative w-full max-w-2xl rounded-2xl px-10 py-12 mx-auto shadow-2xl bg-base-900 border border-base-800'
                  )}
               >
                  {children}
                  <div className="absolute top-4 right-5">
                     <button
                        onClick={close}
                        className="text-2xl transition duration-200 ease-linear opacity-50 hover:scale-105 will-change hover:opacity-100"
                     >
                        <i className="fa-light fa-xmark"></i>
                     </button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>,
      document.body
   );
};

export default Modal;
