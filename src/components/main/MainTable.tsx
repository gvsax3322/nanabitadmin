import React from "react";
import { Divider, Table } from "antd";

interface MainTableProps {
  title: string;
}

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
const MainTable: React.FC<MainTableProps> = ({ title }) => {
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
