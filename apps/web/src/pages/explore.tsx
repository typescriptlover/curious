import Meta from '../components/Meta';
import { PageWithRecommended } from '../layouts/Page';
import { NextPageWithLayout } from '../types/types';

const Explore: NextPageWithLayout = () => {
   return <div>explore area</div>;
};

Explore.getLayout = (page) => {
   return <PageWithRecommended page={page} meta={<Meta title="explore" />} />;
};

export default Explore;
