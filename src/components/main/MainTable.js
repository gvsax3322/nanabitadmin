import { Divider, Table } from "antd";
import React from "react";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
];
const MainTable = ({title}) => {
  return (
    <div>
      <Divider>{title}</Divider>

      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default MainTable;
