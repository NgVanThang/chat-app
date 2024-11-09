import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

import { GetConfigLayout } from '~/context/configProvider';

const WelcomePage = () => {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  return (
    <Result
      icon={<SmileOutlined />}
      title={getLanguageValue(languageSelected, 'chaoMungThanhVienMoi')}
      extra={
        <Link to="/">
          <Button type="primary">{getLanguageValue(languageSelected, 'tiepTuc')}</Button>
        </Link>
      }
    />
  );
};
export default WelcomePage;
