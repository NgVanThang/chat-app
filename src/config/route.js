import { HeaderOnly } from '~/layouts';
import {
  HomePage,
  ProfilePage,
  NotFoundPage,
  LoginPage,
  ChatPage,
  RegisterPage,
  WelcomePage,
  DownloadPage,
} from '~/pages';

const publicRoute = [
  { path: '/login', component: LoginPage, layout: null },

  { path: '/*', component: NotFoundPage, layout: null },
];

const privateRoute = [
  { path: '/', component: HomePage },
  { path: '/profile', component: ProfilePage },

  { path: '/chat', component: ChatPage, layout: HeaderOnly },
  { path: '/welcome', component: WelcomePage },
  { path: '/register', component: RegisterPage, layout: null },
  { path: '/download-video', component: DownloadPage },
];

export { publicRoute, privateRoute };
