import { Col, Divider, Row, Card } from 'antd';

import style from './style.module.scss';
import { Link } from 'react-router-dom';

const { Meta } = Card;
function ServiceComponent({ title = '', items = [] }) {
  return (
    <>
      <Divider orientation="center">{title}</Divider>
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
