import Table from '~/components/Table';
import { Button, Flex } from 'antd';

function TablePage() {
  return (
    <>
      <Table></Table>
      <Flex gap="small" wrap>
        <Button type="primary" danger>
          Primary Button
        </Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </>
  );
}

export default TablePage;
