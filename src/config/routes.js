import { HomePage, ProfilePage, NotFoundPage, LoginPage, ChatPage, RegisterPage } from '~/pages';

const publicRoute = [
  { path: '/login', component: LoginPage, layout: null },

  { path: '/*', component: NotFoundPage, layout: null },
  { path: '/register', component: RegisterPage, layout: null },
];

const privateRoute = [
  { path: '/', component: HomePage },
  { path: '/profile', component: ProfilePage },

  { path: '/chat', component: ChatPage, layout: null },
];

export { publicRoute, privateRoute };
