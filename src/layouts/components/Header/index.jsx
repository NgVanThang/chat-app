import { Layout, theme } from 'antd';
import { signOutUser } from '~/services/authService';

function HeaderComponent() {
  const { Header } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const hanldeSignOut = () => {
    signOutUser();
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <button onClick={hanldeSignOut}>Đăng xuất</button>
    </Header>
  );
}

export default HeaderComponent;
