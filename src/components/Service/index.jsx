import { Col, Divider, Row, Card } from 'antd';
import { WechatOutlined } from '@ant-design/icons';

import { GetConfigLayout } from '~/utils/configProvider';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

const { Meta } = Card;
function ServiceComponent() {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const items = [
    {
      key: 1,
      name: getLanguageValue(languageSelected, 'nhanTin'),
      path: '/chat',
      cover: <WechatOutlined />,
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    },
    {
      key: 2,
      name: getLanguageValue(languageSelected, 'nhanTin'),
      path: '/chat',
      cover: <WechatOutlined />,
      style: {
        width: '100%',
      },
    },
    {
      key: 3,
      name: getLanguageValue(languageSelected, 'nhanTin'),
      path: '/chat',
      cover: <WechatOutlined />,
      style: {
        width: '100%',
      },
    },
  ];

  return (
    <>
      <Divider orientation="center">{getLanguageValue(languageSelected, 'luaChonDichVu')}</Divider>
      <Row gutter={[16, 16]} justify="center" align="center" className={style['custom-row']}>
        {items.map(({ key, name, path, style }) => {
          return (
            <Col key={key} xs={24} sm={12} md={8} lg={6}>
              <Link to={path}>
                <Card hoverable style={style}>
                  <Meta title={name} />
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default ServiceComponent;
