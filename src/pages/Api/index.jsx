import React, { useState } from 'react';
import { Layout, Input, Button, Select, Form, Card, message, Row, Col, Tabs, Divider } from 'antd';

import style from './style.module.scss';

const { Header, Content } = Layout;
const { Option } = Select;

const ItemRow = React.memo(({ index, item, updateItem, removeItem }) => {
  return (
    <Col span={24} key={index}>
      <Row>
        <Col span={5} className={style['padding-3']}>
          <Form.Item>
            <Input placeholder="Key" value={item.key} onChange={(e) => updateItem(index, 'key', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={15} className={style['padding-3']}>
          <Form.Item>
            <Input
              placeholder="Value"
              value={item.value}
              onChange={(e) => updateItem(index, 'value', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={3} className={style['padding-3']}>
          <Button danger onClick={() => removeItem(index)}>
            Remove
          </Button>
        </Col>
      </Row>
    </Col>
  );
});

const ApiPage = () => {
  const [url, setUrl] = useState('');
  const [requestSend, setRequestSend] = useState(JSON.parse(localStorage.getItem('requestSend')) || {});
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([]);
  const [params, setParams] = useState([]);
  //const [body, setBody] = useState('');
  const [body] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('0'); // Quản lý giá trị được chọn

  const handleSendRequest = async () => {
    if (!url) {
      message.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setResponse(null);
    const startTime = performance.now(); // Ghi lại thời gian bắt đầu
    try {
      // Tạo query string từ params
      const queryString = params
        .filter((param) => param.key)
        .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&');

      const finalUrl = queryString ? `${url}?${queryString}` : url;

      const options = {
        method,
        headers: headers.reduce((acc, header) => {
          acc[header.key] = header.value;
          return acc;
        }, {}),
        ...(method !== 'GET' && body ? { body: JSON.stringify(JSON.parse(body)) } : {}),
      };

      const res = await fetch(finalUrl, options);
      const data = await res.json();

      setResponse({
        status: res.status,
        statusText: res.ok,
        data,
      });

      const newObject = {
        method,
        params: params,
        headers: headers,
      };
      const newRequest = { ...requestSend, [url]: newObject };

      localStorage.setItem('requestSend', JSON.stringify(newRequest));
      setRequestSend(newRequest);
    } catch (error) {
      setResponse({
        status: 'Error',
        statusText: error.message,
        data: null,
      });
    } finally {
      setLoading(false);
      const endTime = performance.now();
      setResponse((prev) => ({
        ...prev, // Sao chép trạng thái cũ
        time: `${(endTime - startTime).toFixed(0)} ms`,
      }));
    }
  };

  const handleDeleteRequestSend = React.useCallback((k) => {
    setRequestSend((prev) => {
      const data = { ...prev };
      if (data[k]) delete data[k];
      localStorage.setItem('requestSend', JSON.stringify(data));
      return data;
    });
  }, []);

  const handleChangeSelectRequestSend = React.useCallback(
    (e) => {
      const data = requestSend[e];
      if (!data) return;
      setMethod(data.method);
      setUrl(e);
      setHeaders(data.headers);
      setParams(data.params);
    },
    [requestSend],
  );

  const updateHeaders = React.useCallback((index, field, value) => {
    setHeaders((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }, []);

  const addHeader = React.useCallback(() => {
    setHeaders((prev) => [...prev, { key: '', value: '' }]);
  }, []);

  const removeHeader = (index) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  };

  const updateParams = React.useCallback((index, field, value) => {
    setParams((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }, []);

  const addParam = React.useCallback(() => {
    setParams((prev) => [...prev, { key: '', value: '' }]);
  }, []);

  const removeParam = (index) => {
    setParams((prev) => prev.filter((_, i) => i !== index));
  };

  const items = React.useMemo(() => {
    return [
      {
        key: 'header',
        label: 'Headers',
        children: (
          <>
            <Row>
              <Col span={24}>
                <Button type="dashed" onClick={addHeader}>
                  Add Headers
                </Button>
              </Col>
            </Row>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '550px', overflow: 'hidden auto' }}>
              <Row gutter={[16, 16]}>
                {headers.map((item, index) => (
                  <ItemRow key={index} index={index} item={item} updateItem={updateHeaders} removeItem={removeHeader} />
                ))}
              </Row>
            </div>
          </>
        ),
      },
      {
        key: 'params',
        label: 'Params',
        children: (
          <>
            <Row>
              <Col span={24}>
                <Button type="dashed" onClick={addParam}>
                  Add Params
                </Button>
              </Col>
            </Row>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '550px', overflow: 'hidden auto' }}>
              <Row gutter={[16, 16]}>
                {params.map((item, index) => (
                  <ItemRow key={index} index={index} item={item} updateItem={updateParams} removeItem={removeParam} />
                ))}
              </Row>
            </div>
          </>
        ),
      },
      {
        key: 'auth',
        label: 'Authorization',
        children: 'Content of Tab Pane Authen',
      },
      {
        key: 'body',
        label: 'Body',
        children: 'Content of Tab Pane 3',
      },
    ];
  }, [headers, params, addHeader, addParam, updateHeaders, updateParams]);

  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ color: 'white', textAlign: 'center' }}>API Tester</Header>
      <Content style={{ padding: '20px', flex: 1 }}>
        <Row className={style['row-content']}>
          <Col className={style['col-content']} span={17}>
            <Card title="API Request" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Form layout="vertical" style={{ display: 'flex', flexDirection: 'column' }}>
                <Row style={{ zIndex: 999 }}>
                  <Col className={style['gutter-row']} span={24}>
                    <Form.Item label="Request send">
                      <Select
                        value={selectedValue}
                        onChange={(value) => {
                          setSelectedValue(value); // Cập nhật giá trị được chọn
                          handleChangeSelectRequestSend(value);
                        }}
                      >
                        <Option value="0" disabled>
                          Select submitted request
                        </Option>
                        {Object.keys(requestSend).map((key) => (
                          <Option key={key} value={key}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{key}</span>
                              {selectedValue !== key && ( // Chỉ hiển thị nút "x" khi không phải mục đang được chọn
                                <button
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'red',
                                    cursor: 'pointer',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation(); // Ngăn sự kiện chọn
                                    handleDeleteRequestSend(key); // Gọi hàm xử lý xóa
                                  }}
                                >
                                  x
                                </button>
                              )}
                            </div>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col className={style['gutter-row']} span={3}>
                    <Form.Item label="Method">
                      <Select value={method} onChange={setMethod}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                        <Option value="PUT">PUT</Option>
                        <Option value="DELETE">DELETE</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col className={style['gutter-row']} span={19}>
                    <Form.Item label="URL">
                      <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter API URL" />
                    </Form.Item>
                  </Col>
                  <Col className={style['gutter-row']} span={2}>
                    <Form.Item>
                      <Button type="primary" onClick={handleSendRequest} loading={loading}>
                        Send
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ flex: 1 }}>
                  <Col span={24} style={{ height: '100%' }}>
                    <Tabs tabPosition="left" defaultActiveKey="header" items={items} />
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col className={style['col-content']} span={7}>
            <Card title="API Response" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <p>Code: {response?.status || '...'}</p>
              <p>Time: {response?.time || '...'}</p>
              <p>Status: {response?.statusText ? 'success' : 'failure' || '...'}</p>
              <pre
                style={{
                  background: '#f6f6f6',
                  padding: '10px',
                  borderRadius: '4px',
                  height: '800px',
                  overflow: 'auto',
                }}
              >
                {response ? (
                  JSON.stringify(response.data, null, 2)
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {loading ? 'Loading...' : 'NO DATA'}
                  </div>
                )}
              </pre>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ApiPage;
