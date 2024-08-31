import { Layout, Row, Col, Divider, Space, Modal, theme, Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { ZaloIcon, FacebookIcon, GithubIcon } from '~/assets/icons';
import { ItemComponent } from '~/components';
import { GetConfigLayout } from '~/utils/configProvider';

const { Footer } = Layout;

function FooterComponent() {
  const {
    token: { customBackgroundFooter },
  } = theme.useToken();
  const style = {
    backgroundColor: customBackgroundFooter,
  };
  const styleIcon = {
    width: '3rem',
    height: '3rem',
  };

  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const [modal, setModal] = useState(false);

  const items = [
    {
      key: 1,
      icon: <FacebookIcon style={styleIcon} />,
      path: 'https://www.facebook.com/nhok.quay.1293575/',
    },
    {
      key: 2,
      icon: <GithubIcon style={styleIcon} />,
      path: 'https://github.com/NgVanThang',
    },
    {
      key: 3,
      icon: <ZaloIcon style={styleIcon} />,
      event: () => setModal(true),
    },
  ];

  return (
    <Footer style={style}>
      <Row gutter={[16, 16]} justify="space-around" align="start">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Divider orientation="left" orientationMargin="0">
            {getLanguageValue(languageSelected, 'lienHe')}
          </Divider>
          <ItemComponent
            items={[
              {
                icon: <MailOutlined />,
                label: <a href="mailto:contact.thangnguyen2003@gmail.com">contact.thangnguyen2003@gmail.com</a>,
              },
              {
                icon: <PhoneOutlined />,
                label: <span>03*****793</span>,
              },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Divider orientation="left" orientationMargin="0">
            {getLanguageValue(languageSelected, 'thongTinDuAn')}
          </Divider>
          <ItemComponent
            items={[
              {
                label: (
                  <a target="_blank" rel="noreferrer" href="https://github.com/NgVanThang/chat-app">
                    {getLanguageValue(languageSelected, 'maNguonVaDongGop')}
                  </a>
                ),
              },
              {
                label: (
                  <a target="_blank" rel="noreferrer" href="https://vercel.com">
                    Vercel
                  </a>
                ),
              },
              {
                label: (
                  <a target="_blank" rel="noreferrer" href="https://react.dev/">
                    React
                  </a>
                ),
              },
              {
                label: (
                  <a target="_blank" rel="noreferrer" href="https://firebase.google.com/">
                    Firebase
                  </a>
                ),
              },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Divider orientation="right" orientationMargin="0">
            {getLanguageValue(languageSelected, 'mangXaHoi')}
          </Divider>
          <Row justify="end">
            <Col>
              <Space size={10} wrap>
                {items.map(({ key, icon, path, event }) => {
                  return path ? (
                    <a key={key} href={path} rel="noreferrer" target="_blank">
                      {icon}
                    </a>
                  ) : (
                    <span key={key} onClick={event} style={{ cursor: 'pointer' }}>
                      {icon}
                    </span>
                  );
                })}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title={getLanguageValue(languageSelected, 'quetMaDeLienHe')}
        centered
        open={modal}
        footer={[
          <Button key="close" onClick={() => setModal(false)}>
            {getLanguageValue(languageSelected, 'dong')}
          </Button>,
        ]}
      >
        <a href="images/qr.jpg" download="images/qr.jpg">
          <img src="images/qr.jpg" alt="QR" style={{ width: '100%' }} />
        </a>
      </Modal>
    </Footer>
  );
}

export default FooterComponent;
