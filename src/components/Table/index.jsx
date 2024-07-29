import React from 'react';
import { Table } from 'antd';

const StickyTable = ({ cloumns, data }) => {
  {
    /*
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8',
      width: 150,
    },
    {
      title: 'Column 9',
      dataIndex: 'address',
      width: 150,
      key: '9',
    },
    {
      title: 'Column 10',
      dataIndex: 'address',
      width: 150,
      key: '10',
    },
    {
      title: 'Column 11',
      dataIndex: 'address',
      width: 150,
      key: '11',
    },
    {
      title: 'Column 12',
      dataIndex: 'address',
      width: 150,
      key: '12',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a href="https://google.com">action</a>,
    },
  ];
  const data = [];
  for (let i = 1; i <= 145; i++) {
    data.push({
      key: i,
      name: i,
      address: `Item ${i}`,
    });
  }
*/
  }
  return (
    <Table
      columns={cloumns}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 500,
      }}
    />
  );
};

export default StickyTable;
