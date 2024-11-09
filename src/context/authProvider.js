import { useEffect, useLayoutEffect, useState, createContext, useContext } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { routes, firebase } from '~/config';
import { LoadingPage } from '~/pages/_Static';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const { auth } = firebase;
  const { privateRoute } = routes;
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(
        user ? { displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL } : null,
      );
      setIsLoading(false);
    });
    return () => unsubscribed();
  }, [auth]);

  useLayoutEffect(() => {
    if (isLoading) return;

    if (user) {
      if (location.pathname === '/login') {
        navigate('/');
      } else {
        const isNewUser = localStorage.getItem('isNewUser') ?? 'false';

        if (JSON.parse(isNewUser.toLowerCase())) {
          navigate('/welcome');
          localStorage.setItem('isNewUser', 'false');
        } else {
          if (location.pathname === '/welcome') navigate('/');
        }
      }
    } else {
      if (privateRoute.some((route) => matchPath(route.path, location.pathname))) navigate('/login');
    }
  }, [isLoading, user, location.pathname, navigate, privateRoute, auth]);

  if (!user && privateRoute.some((route) => matchPath(route.path, location.pathname))) return <LoadingPage />;

  return isLoading ? <LoadingPage /> : <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export const UserInfo = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
