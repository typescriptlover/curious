import Meta from '../components/Meta';
import { PageWithRecommended } from '../layouts/Page';
import Recommended from '../layouts/Recommended';
import Sidebar from '../layouts/Sidebar';

const Feed = () => {
   return <div>feed area</div>;
};

Feed.getLayout = (page: any) => {
   return <PageWithRecommended page={page} meta={<Meta title="feed" />} />;
};

export default Feed;
