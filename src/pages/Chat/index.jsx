import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Row, Col, List, Empty, theme } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import { MessageIcon } from '~/assets/icons';
import { MessageComponent } from '~/components';
import { GetConfigLayout } from '~/utils/configProvider';
import { UserInfo } from '~/utils/authProvider';
import { firebase } from '~/config';

import style from './style.module.scss';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Create a ref for the chat list
  const messagesEndRef = useRef(null);

  const {
    token: { customColorPrimary },
  } = theme.useToken();

  const {
    user: { displayName, photoURL, uid },
  } = UserInfo();

  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const { realtimeDatabase, ref, onValue, push, serverTimestamp } = firebase;

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
        name: displayName, // User name
        time: serverTimestamp(), // Current time
        message: inputMessage,
      });

      setInputMessage('');
    }
  };

  // Scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Row gutter={[16, 16]} justify="center" align="middle">
      <Col xs={24} sm={20} md={18} lg={16}>
        <div className={style['chat-container']}>
          <div className={style['chat-card']}>
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
                <MessageComponent key={msg.id} avatar={msg.avatar} name={msg.name} time={12} message={msg.message} />
              )}
            />
            <div ref={messagesEndRef} />
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
