import Meta from '../components/Meta';
import { PageWithRecommended } from '../layouts/Page';
import Recommended from '../layouts/Recommended';
import Sidebar from '../layouts/Sidebar';

const Explore = () => {
   return <div>explore area</div>;
};

Explore.getLayout = (page: any) => {
   return <PageWithRecommended page={page} meta={<Meta title="explore" />} />;
};

export default Explore;
