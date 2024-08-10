import { useEffect, useLayoutEffect, useState, createContext } from 'react';
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
      if (location.pathname === '/login') navigate('/');
    } else {
      if (privateRoute.some((route) => matchPath(route.path, location.pathname))) navigate('/login');
    }
  }, [isLoading, user, location.pathname, navigate, privateRoute]);

  return isLoading ? <LoadingPage /> : <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
