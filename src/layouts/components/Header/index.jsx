import { useContext } from 'react';
import { Layout, Dropdown, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { AuthContext } from '~/utils/authProvider';
import { signOutUser } from '~/services/authService';

function HeaderComponent() {
  const { Header } = Layout;
  const { user } = useContext(AuthContext);
  const { displayName, photoURL } = user;

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      signOutUser();
    }
  };

  const items = [
    {
      key: 'name-user',
      disabled: true,
      label: (
        <span
          style={{
            display: 'block',
            textAlign: 'center',
            minWidth: '100%',
          }}
        >
          {displayName}
        </span>
      ),
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
      >
        <Avatar src={<img src={photoURL} alt="avatar" />} />
      </Dropdown>
    </Header>
  );
}

export default HeaderComponent;
