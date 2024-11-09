import { Row, Col, theme, Spin } from 'antd';
import { GetConfigLayout } from '~/context/configProvider';

import style from './style.module.scss';

function LoadingPage() {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const {
    token: { customBackgroundColor, customColorPrimary },
  } = theme.useToken();

  return (
    <Row style={{ background: customBackgroundColor }} className={style['row']}>
      <Col span={24}>
        <div className={style['container-loading']}>
          <div className={style['header-container']}>
            <img className={style['logo']} alt="logo" src="images/logo.svg" />
            <div style={{ color: customColorPrimary }} className={style['text-loading']}>
              <Spin className={style['icon-loading']} /> {getLanguageValue(languageSelected, 'dangTai')}
            </div>
          </div>
          <div style={{ color: customColorPrimary }} className={style['body-container']}>
            <b>THANG NGUYEN</b>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default LoadingPage;
