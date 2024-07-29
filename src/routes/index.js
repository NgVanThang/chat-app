//IMPORT LAYOUTS

//IMPORT PAGES
import HomePage from '~/pages/Home';
import FollowingPage from '~/pages/Following';
import ProfilePage from '~/pages/Profile';
import NotFoundPage from '~/pages/NotFoundPage';
import TablePage from '~/pages/Table';

import FLowPage from '~/pages/Flow';

import PlayPage from '~/pages/Play';

import ProductPage from '~/pages/Product';
import CreateProductPage from '~/pages/Product/Create';
const publicRoute = [
  { path: '/', component: HomePage },
  { path: '/following', component: FollowingPage },
  { path: '/profile', component: ProfilePage }, //layout: HeaderOnly },
  { path: '/table', component: TablePage },
  { path: '/product', component: ProductPage },
  { path: '/flow', component: FLowPage },
  { path: '/product/create', component: CreateProductPage },
  { path: '/play', component: PlayPage, layout: null },

  { path: '/*', component: NotFoundPage, layout: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
