import { RefObject, useEffect } from 'react';

export default function useClickOutside(
   condition: boolean,
   ref: RefObject<any>,
   handler: any,
   dependencies: any[]
) {
   useEffect(() => {
      if (condition) {
         const clickOutsideA = (e: any) => {
            if (
               e.offsetX > e.target.clientWidth ||
               e.offsetY > e.target.clientHeight
            ) {
               return;
            }
            if (ref && ref.current && !ref.current.contains(e.target))
               handler();
         };
         document.addEventListener('mousedown', clickOutsideA, false);

         return () => document.removeEventListener('mousedown', clickOutsideA);
      }
   }, [condition, ref, ...(dependencies ?? [])]);
}
