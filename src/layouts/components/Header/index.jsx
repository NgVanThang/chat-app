import { Layout, theme } from 'antd';
import { Input } from 'antd';

function HeaderComponent() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const { Header } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Search } = Input;
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
    </Header>
  );
}

export default HeaderComponent;
