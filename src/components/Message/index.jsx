import React from 'react';
import { Avatar, theme } from 'antd';

import { useTime } from '~/hooks';
import { GetConfigLayout } from '~/utils/configProvider';
import { UserInfo } from '~/utils/authProvider';
import style from './style.module.scss';

const MessageComponent = ({ avatar, name, time, message, uid }) => {
  const {
    token: { customColorPrimary, customBackgroundChat },
  } = theme.useToken();

  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const {
    user: { uid: idUser },
  } = UserInfo();

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }

  const formattedTime = useTime(time);

  const messageContent = React.useMemo(
    () => (isValidUrl(message) ? <a href={message}>{getLanguageValue(languageSelected, 'duongDan')}</a> : message),
    [message, languageSelected, getLanguageValue],
  );
  const messageStyle = {
    backgroundColor: customBackgroundChat,
    color: customColorPrimary,
    ...(idUser === uid && { border: '1px solid #ffbdbd' }),
  };

  return (
    <div className={style['message-container']}>
      <Avatar src={avatar} alt={name} className={style['message-avatar']} />
      <div className={style['message-content']}>
        <div className={style['message-header']}>
          <span className={style['message-name']}>{name}</span>
        </div>
        <div className={style['message-body']}>
          <div style={messageStyle} className={style['message-text']}>
            {messageContent}
          </div>
          <span className={style['message-time']}>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
