import { Col, Divider, Row } from 'antd';

function HomePage() {
  return (
    <>
      <Divider orientation="left">Raw flex style</Divider>
      <Row wrap={true}>
        <Col flex="1 1 200px">sdfsdg</Col>
        <Col flex="1 1 200px">sdsdfs</Col>
      </Row>
    </>
  );
}

export default HomePage;
