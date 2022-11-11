import { Dispatch, SetStateAction, useState } from 'react';

export default function useCancelState<T>(
   initial: T
): [T, Dispatch<SetStateAction<T>>, any] {
   const [state, setState] = useState<T>(initial);

   function cancel() {
      setState(initial);
      return initial;
   }

   return [state, setState, cancel];
}
