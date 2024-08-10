import { Row, Col, Spin } from 'antd';

function LoadingPage() {
  return (
    <Row>
      <Col span={24}>
        <Spin fullscreen size="large" tip="Đang tải vui lòng chờ" />
      </Col>
    </Row>
  );
}

export default LoadingPage;
