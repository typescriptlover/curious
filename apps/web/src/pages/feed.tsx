import Meta from '../components/Meta';
import { PageWithRecommended } from '../layouts/Page';
import { NextPageWithLayout } from '../types/types';

const Feed: NextPageWithLayout = () => {
   return <div>feed area</div>;
};

Feed.getLayout = (page) => {
   return <PageWithRecommended page={page} meta={<Meta title="feed" />} />;
};

export default Feed;
