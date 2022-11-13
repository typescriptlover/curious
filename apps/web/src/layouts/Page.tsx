import Recommended from './Recommended';
import Sidebar from './Sidebar';

interface Props {
   page: any;
   meta?: React.ReactElement;
}

export const PageWithRecommended: React.FC<Props> = ({ page, meta }) => {
   return (
      <div className="w-full max-w-6xl mx-auto">
         {meta}
         <Sidebar />
         <div className="w-full pl-[14rem] grid grid-cols-3 gap-x-8">
            <div className="col-span-2">{page}</div>
            <div className="col-span-1">
               <Recommended />
            </div>
         </div>
      </div>
   );
};
