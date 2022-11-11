import React, { Dispatch, forwardRef, SetStateAction, useRef } from 'react';

interface Props {
   file: string;
   setFile: Dispatch<SetStateAction<string>>;
   accept?: string;
}

const Upload = forwardRef<HTMLInputElement, Props>(
   ({ file, setFile, accept }, ref) => {
      async function toBase64(file: File) {
         return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (e) => reject(e);
         });
      }

      async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
         if (e.target.files && e.target.files.length) {
            const b64 = await toBase64(e.target.files[0] as File);
            setFile(b64);
         }
      }

      return (
         <input
            key={file || 'empty'}
            ref={ref as any}
            className="hidden"
            accept={accept || '*'}
            type="file"
            onChange={onChange}
         />
      );
   }
);

export default Upload;
