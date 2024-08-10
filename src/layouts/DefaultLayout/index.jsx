import { useContext } from 'react';
import { Layout, theme } from 'antd';

import { HeaderComponent } from '../components';
import { AuthContext } from '~/utils/authProvider';

function DefaultLayout({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return;
  }
  const { Content } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <HeaderComponent />
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100vh',
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
export default DefaultLayout;
