import { Layout } from 'antd';

function FooterComponent() {
  const { Footer } = Layout;
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </>
  );
}

export default FooterComponent;
