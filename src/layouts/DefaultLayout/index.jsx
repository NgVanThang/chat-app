import { Layout, theme } from 'antd';
import { HeaderComponent, FooterComponent } from '../components';

function DefaultLayout({ children }) {
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
            height: 'fit-content',
            padding: 24,
          }}
        >
          {children}
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
}
export default DefaultLayout;
