import { Toaster } from 'react-hot-toast';

const Toast = () => {
   return (
      <Toaster
         gutter={6}
         containerClassName="!fixed !z-[100] !inset-0 my-[1rem]"
         toastOptions={{
            className:
               '!bg-rose-500 !rounded-xl !drop-shadow-2xl !text-white !text-sm !font-semibold !tracking-tight !py-1.5 !px-3',
         }}
      />
   );
};

export default Toast;
