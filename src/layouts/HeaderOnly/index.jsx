import { Layout, theme } from 'antd';
import { HeaderComponent } from '../components';

function HeaderOnly({ children }) {
  const { Content } = Layout;
  const {
    token: { customBackgroundColor },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderComponent />
      <Content>
        <div
          style={{
            background: customBackgroundColor,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
export default HeaderOnly;
