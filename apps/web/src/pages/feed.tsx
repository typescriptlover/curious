import Sidebar from '../layouts/Sidebar';

const Feed = () => {
   return <div>feed area</div>;
};

Feed.getLayout = (page: any) => {
   return (
      <div className="w-full max-w-6xl mx-auto">
         <Sidebar />
         <div className="w-full pl-[14rem]">{page}</div>
      </div>
   );
};

export default Feed;
