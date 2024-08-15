import { Row, Col, Spin } from 'antd';
import { GetConfigLayout } from '~/utils/configProvider';

function LoadingPage() {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  return (
    <Row>
      <Col span={24}>
        <Spin fullscreen size="large" tip={getLanguageValue(languageSelected, 'dangTai')} />
      </Col>
    </Row>
  );
}

export default LoadingPage;
