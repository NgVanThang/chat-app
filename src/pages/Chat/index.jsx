import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Row, Col, List, Empty, theme, Dropdown, message } from 'antd';
import { SendOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import useSWRMutation from 'swr/mutation';

import { MessageIcon, ImageUploadIcon, PlusIcon } from '~/assets/icons';
import { MessageComponent } from '~/components';
import { GetConfigLayout } from '~/context/configProvider';
import { UserInfo } from '~/context/authProvider';
import { firebase } from '~/config';
import { cloudinary } from '~/services';
import { LoadingComponent } from '~/components';

import style from './style.module.scss';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showButtonToDown, setShowButtonToDown] = useState(false);
  const [images, setImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  const { trigger, isMutating } = useSWRMutation(
    'https://api.cloudinary.com/v1_1/dmbmugbvi/image/upload',
    cloudinary.fetchUploadImage,
    {
      onSuccess: (data) => {
        setImages([]);
      },
      onError: () => {},
    },
  );

  // Create a ref for the chat list
  const messagesEndRef = useRef(null);
  const chatCardref = useRef(null);

  const {
    token: { customColorPrimary, customerBackgroundBoxInput },
  } = theme.useToken();

  const {
    user: { displayName, photoURL, uid },
  } = UserInfo();

  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const items = [
    {
      label: <span>{getLanguageValue(languageSelected, 'sapRaMat')}</span>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <span>{getLanguageValue(languageSelected, 'sapRaMat')}</span>,
      key: '3',
    },
  ];

  const { realtimeDatabase, ref, onValue, push, realtimeTimestamp } = firebase;

  useEffect(() => {
    const messagesRef = ref(realtimeDatabase, 'messages');

    let scroll;

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setMessages(formattedMessages);

        scroll = setTimeout(() => {
          scrollToBottom();
        }, 300);
      }

      setIsLoading(false);
    });

    return () => {
      if (scroll) clearTimeout(scroll);

      unsubscribe();
    };
  }, [realtimeDatabase, ref, onValue]);

  const handleChangeChoiceFile = (e) => {
    const imageFile = e.target.files;

    if (!imageFile) {
      setImages([]);
      return;
    }

    setImages((prev) => {
      if (typeof prev === 'object' && prev.length > 0) {
        for (let i = 0; i < prev.length; i++) {
          URL.revokeObjectURL(prev[i].url);
        }
      }

      return createImagePreview(imageFile);
    });
    e.target.value = null;
  };

  const createImagePreview = (files) => {
    const result = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.split('/')[0] !== 'image') {
        messageApi.error(getLanguageValue(languageSelected, 'tepPhaiLaAnh'));
        continue;
      }

      if (file.size > 5000000) {
        messageApi.error(getLanguageValue(languageSelected, 'dungLuongToiDa'));
        continue;
      }

      const data = {
        url: URL.createObjectURL(file),
        file: file,
        id: `image-${i}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      };

      result.push(data);
    }
    return result;
  };

  const hanldeRemoveImagePreview = (id) => {
    setImages((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.url);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSendMessage = async () => {
    try {
      if (!inputMessage.trim() && images.length < 1) {
        messageApi.error('Tin nhắn không hợp lệ'); //getLanguageValue(languageSelected, 'dungLuongToiDa'));

        return;
      }

      let dataImages = [];

      if (images && images.length > 0) {
        dataImages = await trigger({ files: images });
      }

      push(ref(realtimeDatabase, 'messages'), {
        uid: uid,
        avatar: photoURL,
        name: displayName,
        time: realtimeTimestamp(),
        images: dataImages,
        message: inputMessage,
      });

      setInputMessage('');
    } catch (error) {
      messageApi.error('error');
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
      {contextHolder}
      <Col xs={24} sm={20} md={18} lg={16}>
        <div className={style['chat-container']}>
          <div className={style['chat-card']} ref={chatCardref} onScroll={handleScroll}>
            {isLoading ? (
              <LoadingComponent />
            ) : messages && messages.length > 0 ? (
              <List
                dataSource={messages}
                renderItem={(msg) => (
                  <MessageComponent
                    key={msg?.id}
                    avatar={msg?.avatar}
                    name={msg.name}
                    time={msg?.time}
                    images={msg?.images}
                    message={msg?.message}
                    uid={msg?.uid}
                  />
                )}
              />
            ) : (
              // Hiển thị Empty khi không có dữ liệu
              <Empty
                style={{ color: customColorPrimary }}
                image={<MessageIcon fill={customColorPrimary} />}
                description={getLanguageValue(languageSelected, 'khongCoTinNhan')}
              />
            )}

            <div ref={messagesEndRef} />
            {showButtonToDown && (
              <div className={style['button-to-bottom-wrapper']}>
                <button className={style['button-to-bottom']} onClick={scrollToBottom}>
                  <DownOutlined />
                </button>
              </div>
            )}
          </div>

          <div className={style['wapper-input']}>
            {images && images.length > 0 && (
              <div className={style['wapper-image-preview']}>
                <div className={style['preview-body']}>
                  {isMutating && (
                    <div className={style['upload-loading']}>
                      <div className={style['spin-upload']}></div>
                    </div>
                  )}
                  {images.map(function (data, index) {
                    return (
                      <div key={index} className={style['card-image']}>
                        <div className={style['image-container']}>
                          <img alt="image-preview" src={data.url} />
                        </div>
                        <div className={style['button-container']}>
                          <button onClick={() => hanldeRemoveImagePreview(data.id)}>
                            <CloseOutlined />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className={style['chat-input-container']} style={{ backgroundColor: customerBackgroundBoxInput }}>
              <div className={style['wapper-input-file']}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <button>
                    <PlusIcon />
                  </button>
                </Dropdown>
                <button className={style['button-choice-file']}>
                  <input type="file" multiple title="" accept="image/*" onChange={handleChangeChoiceFile} />
                  <ImageUploadIcon />
                </button>
              </div>
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
        </div>
      </Col>
    </Row>
  );
};

export default ChatPage;
