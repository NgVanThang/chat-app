import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
  const { Content } = Layout;
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const currentURL = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} currentURL={currentURL} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'margin-left 0.39s ease',
        }}
      >
        <Header />
        <Content
          style={{
            margin: '10px 5px',
            minWidth: 135,
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
export default DefaultLayout;
