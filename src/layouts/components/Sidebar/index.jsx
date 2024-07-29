import React, { useState } from 'react';
import {
  HomeOutlined,
  RightOutlined,
  LeftOutlined,
  ProductOutlined,
  TableOutlined,
  UngroupOutlined,
  DragOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Button, Col, Row, Flex } from 'antd';
import { Link } from 'react-router-dom';

function SidebarComponent({ collapsed, setCollapsed, currentURL }) {
  const { Sider } = Layout;
  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: 'play',
      icon: <PlayCircleOutlined />,
      label: <Link to="/play">Trò chơi</Link>,
    },
    {
      key: 'table',
      icon: <TableOutlined />,
      label: <Link to="/table">Bảng</Link>,
    },
    {
      key: 'flow',
      icon: <DragOutlined />,
      label: <Link to="/flow">Kéo thả</Link>,
    },
    {
      key: 'grp1',
      label: 'Group',
      icon: <UngroupOutlined />,
      children: [
        {
          key: 'aa',
          label: 'Thông tin',
          children: [
            {
              key: 'profile',
              label: <Link to="/profile">Trang cá nhân</Link>,
            },
          ],
        },
        {
          key: 'bb',
          label: 'Thêm',
          children: [
            {
              key: 'following',
              label: <Link to="/following">Theo dõi</Link>,
            },
          ],
        },
      ],
    },
    {
      key: 'product-list',
      label: 'Sản phẩm',
      icon: <ProductOutlined />,
      children: [
        {
          key: 'product',
          label: <Link to="/product">Danh sách</Link>,
        },
        {
          key: 'product/create',
          label: <Link to="/product/create">Thêm sản phẩm</Link>,
        },
      ],
    },
  ];

  const defaultSelectedKey = currentURL;

  const findParentKeys = (items, currentKey, parents = []) => {
    for (let item of items) {
      if (item.key === currentKey) {
        return parents;
      }
      if (item.children) {
        const result = findParentKeys(item.children, currentKey, [...parents, item.key]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const defaultOpenKeys = findParentKeys(items, currentURL) || [];

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items);

  const [stateOpenKeys, setStateOpenKeys] = useState(defaultOpenKeys);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const hanldeOnlick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      theme="light"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ margin: collapsed ? 10 : 30, transition: 'margin 0.7s ease' }} className="demo-logo">
        <Image alt="logo" src="/images/logo.png" />
      </div>
      <Menu
        defaultSelectedKeys={[defaultSelectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        theme="light"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
      <Row>
        <Col span={24}>
          <Flex justify={'center'} align={'center'}>
            <Button type="primary" onClick={hanldeOnlick} icon={collapsed ? <RightOutlined /> : <LeftOutlined />} />
          </Flex>
        </Col>
      </Row>
    </Sider>
  );
}

export default SidebarComponent;
