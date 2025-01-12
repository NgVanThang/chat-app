import React, { useState } from 'react';
import { Input, Button, message, Typography, Layout, Space, Card, Row, Col } from 'antd';
import { SearchOutlined, LinkOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Search } = Input;

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleDownload = async () => {
    if (!url) {
      message.error('Please enter a valid video URL');
      return;
    }

    setLoading(true);
    const url = 'https://yt-api.p.rapidapi.com/dl?id=arj7oStGLkU&cgeo=DE';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '6491964b14mshe5f9c781770abe2p15ac15jsn5ba4ea0a6410',
        'x-rapidapi-host': 'yt-api.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'video.mp4';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      document.body.appendChild(link);
      // link.click();
      document.body.removeChild(link);

      message.success('Video download initiated. Check your browser downloads.');
    } catch (error) {
      message.error('Failed to initiate download. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="layout" style={{ minHeight: '70vh' }}>
      <Content style={{ padding: '50px 50px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <Card hoverable style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
              Trình tải xuống video
            </Title>
            <Paragraph style={{ textAlign: 'center' }}>
              Nhập URL của video bạn muốn tải xuống và nhấp vào nút bên dưới.
            </Paragraph>
            <Search
              placeholder="Nhập URL video"
              enterButton={
                <Button type="primary" icon={<SearchOutlined />} loading={loading}>
                  Tìm
                </Button>
              }
              size="large"
              onSearch={handleDownload}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Space>
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: '40px' }}>
          <Col xs={24} sm={12}>
            <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
              <YoutubeOutlined style={{ fontSize: '36px', color: '#ff0000' }} />
              <Title level={4}>YouTube</Title>
              <Paragraph>Tải video xuống từ YouTube</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
              <LinkOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
              <Title level={4}>Các nguồn khác</Title>
              <Paragraph>Tải xuống từ nhiều nguồn video khác nhau</Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default VideoDownloader;
