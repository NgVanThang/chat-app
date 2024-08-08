import { Spin } from 'antd';
import { useEffect, useState, createContext } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

import { routes, firebase } from '~/config';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const { auth } = firebase;
  const { privateRoute } = routes;
  const location = useLocation();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribed();
  }, [auth]);

  useEffect(() => {
    //  console.log(1);
    if (!isLoading) {
      const isPrivateRoute = privateRoute.some((route) => matchPath(route.path, location.pathname));

      if (isPrivateRoute && !user) {
        navigate('/login');
      }

      /*
      const requestNext = location.pathname === '/login' ? '/' : location.pathname;
      navigate(requestNext);
      */
    }
  }, [isLoading, user, location.pathname, navigate, privateRoute]);

  if (isLoading) {
    return <Spin />;
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
