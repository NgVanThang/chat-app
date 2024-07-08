import React, { useState } from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

function Sidebar({ collapsed, setCollapsed }) {
  const { Sider } = Layout;

  const items = [
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        {
          key: 'home',
          icon: <HomeOutlined />,
          label: <Link to="/">Trang chủ</Link>,
        },
        {
          key: 'following',
          label: <Link to="/following">Theo dõi</Link>,
        },
      ],
    },
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            {
              key: '1',
              label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                  Navigation Four - Link
                </a>
              ),
            },
            {
              key: '2',
              label: 'Option 2',
            },
          ],
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            {
              key: '3',
              label: 'Option 3',
            },
            {
              key: '4',
              label: 'Option 4',
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '5',
          label: 'Option 5',
        },
        {
          key: '6',
          label: 'Option 6',
        },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            {
              key: '7',
              label: 'Option 7',
            },
            {
              key: '8',
              label: 'Option 8',
            },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        {
          key: '9',
          label: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
        },
        {
          key: '11',
          label: 'Option 11',
        },
        {
          key: '12',
          label: 'Option 12',
        },
      ],
    },
  ];
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

  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
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

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="inline"
        theme="dark"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </Sider>
  );
}

export default Sidebar;
