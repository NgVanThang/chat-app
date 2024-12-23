import React from 'react';

import { LogoIcon } from '~/assets/icons';
import style from './style.module.scss';

const LoadingComponent = React.memo(() => {
  return (
    <div className={style['loading-wapper']}>
      <div className={style['loading-container']}>
        <div className={style['content-rotate']}></div>
        <LogoIcon />
      </div>
    </div>
  );
});

export default LoadingComponent;
