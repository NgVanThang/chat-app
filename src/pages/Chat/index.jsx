import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Row, Col, List, Empty, theme } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import { MessageIcon } from '~/assets/icons';
import { MessageComponent } from '~/components';
import { GetConfigLayout } from '~/utils/configProvider';

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
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length,
        avatar: 'https://via.placeholder.com/40', // Avatar URL
        name: 'User', // User name
        time: new Date().toLocaleTimeString(), // Current time
        message: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage(''); // Clear input after sending message
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
              renderItem={(msg, index) => (
                <MessageComponent
                  key={index}
                  avatar={msg.avatar}
                  name={msg.name}
                  time={msg.time}
                  message={msg.message}
                />
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
