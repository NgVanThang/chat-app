import { useState } from 'react';
import { Drawer, FloatButton } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

function DrawerComponent() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <FloatButton type="primary" icon={<SettingOutlined />} onClick={showDrawer} />
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default DrawerComponent;
