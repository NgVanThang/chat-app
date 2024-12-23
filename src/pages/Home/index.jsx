import { WechatOutlined } from '@ant-design/icons';

import { GetConfigLayout } from '~/context/configProvider';
import { ServiceComponent } from '~/components';
import style from './style.module.scss';

function HomePage() {
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
      name: 'Tải video',
      path: '/download-video',
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
      <div className={style['home-container']}>
        <ServiceComponent title={getLanguageValue(languageSelected, 'luaChonDichVu')} items={items} />
      </div>
    </>
  );
}

export default HomePage;
