import React from 'react';
import { Avatar, theme } from 'antd';

import { useTime } from '~/hooks';
import { GetConfigLayout } from '~/utils/configProvider';
import style from './style.module.scss';

const MessageComponent = ({ avatar, name, time, message }) => {
  const {
    token: { customColorPrimary, customBackgroundChat },
  } = theme.useToken();

  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className={style['message-container']}>
      <Avatar src={avatar} alt={name} className={style['message-avatar']} />
      <div className={style['message-content']}>
        <div className={style['message-header']}>
          <span className={style['message-name']}>{name}</span>
        </div>
        <div className={style['message-body']}>
          <div
            style={{ backgroundColor: customBackgroundChat, color: customColorPrimary }}
            className={style['message-text']}
          >
            {isValidUrl(message) ? <a href={message}>{getLanguageValue(languageSelected, 'duongDan')}</a> : message}
          </div>
          <span className={style['message-time']}>{useTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
