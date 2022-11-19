import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
   children: React.ReactNode;
   key: string;
   className?: string;
   duration?: number;
   delay?: number;
}

const Animate = {
   Scale: ({
      children,
      key,
      className,
      duration,
      delay,
      scale,
   }: Props & Partial<Record<'scale', number>>) => {
      return (
         <motion.div
            key={key}
            initial={{ opacity: 0, scale: scale || 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: scale || 0.95 }}
            transition={{
               ease: 'easeInOut',
               duration: duration ?? 0.15,
               delay: delay ?? 0,
            }}
            className={clsx('will-change', className)}
         >
            {children}
         </motion.div>
      );
   },
   FadeUp: ({
      children,
      key,
      className,
      duration,
      delay,
      y,
   }: Props & Partial<Record<'y', number>>) => {
      return (
         <motion.div
            key={key}
            initial={{ opacity: 0, y: y || 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: y || 15 }}
            transition={{
               ease: 'easeInOut',
               duration: duration ?? 0.15,
               delay: delay ?? 0,
            }}
            className={clsx('will-change', className)}
         >
            {children}
         </motion.div>
      );
   },
   FadeDown: ({
      children,
      key,
      className,
      duration,
      delay,
      y,
   }: Props & Partial<Record<'y', number>>) => {
      return (
         <motion.div
            key={key}
            initial={{ opacity: 0, y: y || -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: y || -10 }}
            transition={{
               ease: 'easeInOut',
               duration: duration ?? 0.15,
               delay: delay ?? 0,
            }}
            className={clsx('will-change', className)}
         >
            {children}
         </motion.div>
      );
   },
};

export default Animate;
