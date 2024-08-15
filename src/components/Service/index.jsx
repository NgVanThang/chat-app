import { Col, Divider, Row, Card } from 'antd';

import { GetConfigLayout } from '~/utils/configProvider';

function ServiceComponent() {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const items = [{}, {}];

  return (
    <>
      <Divider orientation="center">{getLanguageValue(languageSelected, 'luaChonDichVu')}</Divider>
      <Row gutter={[16, 16]}>
        <Col hoverable xs={24} sm={12} md={8} lg={6}>
          <Card title="Card 1" className="box">
            Content 1
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Card 2" className="box">
            Content 2
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Card 3" className="box">
            Content 3
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ServiceComponent;
