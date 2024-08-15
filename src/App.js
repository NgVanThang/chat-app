import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from './utils/authProvider';
import { routes } from '~/config';
import DefaultLayout from '~/layouts';
import ConfigProviderTheme from '~/utils/configProvider';

function App() {
  const { publicRoute, privateRoute } = routes;

  return (
    <BrowserRouter>
      <ConfigProviderTheme>
        <AuthProvider>
          <Routes>
            {[...publicRoute, ...privateRoute].map(({ path, component: Page, layout }, index) => {
              const Layout = layout ?? (layout === null ? Fragment : DefaultLayout);

              return <Route key={index} path={path} element={<Layout children={<Page />} />} />;
            })}
          </Routes>
        </AuthProvider>
      </ConfigProviderTheme>
    </BrowserRouter>
  );
}

export default App;
