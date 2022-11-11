import { FC, ReactElement } from 'react';
import { useSpring, motion } from 'framer-motion';
import Tippy, { TippyProps } from '@tippyjs/react';

interface Props extends TippyProps {
   text: string;
   children: ReactElement;
   className?: string;
}

const Tooltip: FC<Props> = ({ text, children, className, ...tippy }) => {
   const springConfig = { damping: 20, stiffness: 250 };
   const initial = {
      opacity: 0,
      y: 5,
   };
   const opacity = useSpring(initial.opacity, springConfig);
   const y = useSpring(initial.y, springConfig);

   function onMount() {
      y.set(0);
      opacity.set(1);
   }

   function onHide({ unmount }: any) {
      const cleanup = y.onChange((value) => {
         if (value === initial.y) {
            cleanup();
            unmount();
         }
      });

      y.set(initial.y);
      opacity.set(initial.opacity);
   }

   return (
      <Tippy
         render={(attrs: any) => (
            <motion.div
               className="text-xs !-mb-1 !-mt-1 will-change font-semibold text-white tracking-tight bg-base-600/95 py-2 rounded-lg shadow-2xl px-3"
               style={{ y, opacity }}
               {...attrs}
            >
               {text}
            </motion.div>
         )}
         animation={true}
         onMount={onMount}
         onHide={onHide}
         {...tippy}
      >
         {children}
      </Tippy>
   );
};

export default Tooltip;
