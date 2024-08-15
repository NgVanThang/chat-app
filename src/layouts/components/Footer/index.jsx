import { Layout, Row, Col, Card } from 'antd';

const { Footer } = Layout;
function FooterComponent() {
  return (
    <Footer>
      <Row gutter={[16, 16]} justify="space-around" align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
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
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Card 4" className="box">
            Content 4
          </Card>
        </Col>
      </Row>
    </Footer>
  );
}

export default FooterComponent;
