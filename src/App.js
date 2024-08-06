import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '~/config';
import DefaultLayout from '~/layouts';

function App() {
  return (
    <Router>
      <Routes>
        {routes.publicRoute.map(({ path, component: Page, layout }, index) => {
          const Layout = layout ?? (layout === null ? Fragment : DefaultLayout);

          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
