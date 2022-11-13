import clsx from 'clsx';

interface Props {
   className?: string;
}

const Spinner: React.FC<Props> = ({ className }) => {
   return (
      <svg
         className={clsx(
            'spinner',
            className ?? 'h-[1rem] w-[1rem] text-white'
         )}
         viewBox="0 0 50 50"
      >
         <circle
            className="path"
            cx="25"
            cy="25"
            r="15"
            fill="none"
            strokeWidth="4"
         ></circle>
      </svg>
   );
};

export default Spinner;
