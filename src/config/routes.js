import { HomePage, ProfilePage, NotFoundPage, LoginPage } from '~/pages';

const publicRoute = [
  { path: '/', component: HomePage },
  { path: '/profile', component: ProfilePage },

  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },

  { path: '/*', component: NotFoundPage, layout: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
