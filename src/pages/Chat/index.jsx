import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Row, Col, List, Empty, theme } from 'antd';
import { SendOutlined, DownOutlined } from '@ant-design/icons';

import { MessageIcon } from '~/assets/icons';
import { MessageComponent } from '~/components';
import { GetConfigLayout } from '~/utils/configProvider';
import { UserInfo } from '~/utils/authProvider';
import { firebase } from '~/config';

import style from './style.module.scss';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showButtonToDown, setShowButtonToDown] = useState(false);

  // Create a ref for the chat list
  const messagesEndRef = useRef(null);
  const chatCardref = useRef(null);

  const {
    token: { customColorPrimary },
  } = theme.useToken();

  const {
    user: { displayName, photoURL, uid },
  } = UserInfo();

  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const { realtimeDatabase, ref, onValue, push, realtimeTimestamp } = firebase;

  useEffect(() => {
    const messagesRef = ref(realtimeDatabase, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setMessages(formattedMessages);
      }
    });
  }, [realtimeDatabase, ref, onValue]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      push(ref(realtimeDatabase, 'messages'), {
        uid: uid,
        avatar: photoURL,
        name: displayName,
        time: realtimeTimestamp(),
        message: inputMessage,
      });

      setInputMessage('');
    }
  };

  const calculatorPosition = () => {
    if (chatCardref.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatCardref.current;
      const result = scrollHeight - clientHeight;

      return { scrollTop, scrollHeight, clientHeight, result };
    }
  };

  const handleScroll = () => {
    setShowButtonToDown(() => {
      const { scrollTop, result } = calculatorPosition();
      if (scrollTop < result - 100) return true;

      return false;
    });
  };

  // Scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const { scrollTop, result } = calculatorPosition();

    if (result - scrollTop < 300) scrollToBottom();
  }, [messages]);

  return (
    <Row gutter={[16, 16]} justify="center" align="middle">
      <Col xs={24} sm={20} md={18} lg={16}>
        <div className={style['chat-container']}>
          <div className={style['chat-card']} ref={chatCardref} onScroll={handleScroll}>
            <List
              locale={{
                emptyText: (
                  <Empty
                    style={{ color: customColorPrimary }}
                    image={<MessageIcon fill={customColorPrimary} />}
                    description={getLanguageValue(languageSelected, 'khongCoTinNhan')}
                  />
                ),
              }}
              dataSource={messages}
              renderItem={(msg) => (
                <MessageComponent
                  key={msg.id}
                  avatar={msg.avatar}
                  name={msg.name}
                  time={msg.time}
                  message={msg.message}
                />
              )}
            />
            <div ref={messagesEndRef} />
            {showButtonToDown && (
              <div className={style['button-to-bottom-wrapper']}>
                <button className={style['button-to-bottom']} onClick={scrollToBottom}>
                  <DownOutlined />
                </button>
              </div>
            )}
          </div>

          <div className={style['chat-input-container']}>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              placeholder={getLanguageValue(languageSelected, 'nhapNoiDungTinNhan')}
            />
            <Button
              icon={<SendOutlined />}
              className={style['send-button']}
              type="primary"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ChatPage;
