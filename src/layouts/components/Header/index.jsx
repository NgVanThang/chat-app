import { Link } from 'react-router-dom';
import { Layout, Avatar, Dropdown, Space, Typography, theme } from 'antd';
import { LogoutOutlined, SunOutlined, MoonOutlined, TranslationOutlined, UserOutlined } from '@ant-design/icons';

import { UserInfo } from '~/context/authProvider';
import { signOutUser } from '~/services/authService';
import { language } from '~/config';
import { GetConfigLayout } from '~/context/configProvider';
const { Header } = Layout;

const HeaderComponent = ({ ...props }) => {
  const { Text } = Typography;
  const {
    configLayout: { theme: themeMod },
    setConfigLayout,
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const {
    user: { displayName, photoURL, email },
  } = UserInfo();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      signOutUser();
    }
    if (key === 'themeMod') {
      setConfigLayout((prev) => {
        return {
          ...prev,
          theme: themeMod === 'light' ? 'dark' : 'light',
        };
      });
    }
    if (language.option.some((option) => option.key === key)) {
      setConfigLayout((prev) => ({
        ...prev,
        lang: key,
      }));
    }
  };

  const items = [
    {
      key: 'user',
      disabled: true,
      label: (
        <span
          style={{
            display: 'block',
            textAlign: 'center',
            minWidth: '100%',
          }}
        >
          {email.split('@')[0]}
        </span>
      ),
    },
    {
      key: 'info',
      icon: <UserOutlined />,
      label: getLanguageValue(languageSelected, 'thongTinNguoiDung'),
    },
    {
      key: 'language',
      icon: <TranslationOutlined />,
      label: languageSelected.settings.label,
      children: language.option,
    },
    {
      key: 'themeMod',
      icon: themeMod === 'light' ? <SunOutlined /> : <MoonOutlined />,
      label:
        themeMod === 'light'
          ? getLanguageValue(languageSelected, 'giaoDienSang')
          : getLanguageValue(languageSelected, 'giaoDienToi'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutOutlined />,
      label: getLanguageValue(languageSelected, 'dangXuat'),
    },
  ];

  const {
    token: { customBackgroundHeader, customColorPrimary },
  } = theme.useToken();

  const style = {
    color: 'inherit',
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        backgroundColor: customBackgroundHeader,
        position: 'sticky',
        top: 0,
        color: customColorPrimary,
        zIndex: 1000,
      }}
    >
      <Space>
        <Link to="/">
          <img className="logo" src="images/logo.png" alt="logo" />
        </Link>
      </Space>

      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text style={style} strong>
          {getLanguageValue(languageSelected, 'xinChao')} {displayName}
        </Text>
        <Dropdown
          trigger={['click']}
          menu={{
            items,
            onClick: handleMenuClick,
          }}
        >
          <Avatar src={<img src={photoURL} alt="avatar" />} />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent;
