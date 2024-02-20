import { Divider, Table } from "antd";

export const columns = [
  {
    title: "입금대기",
    dataIndex: "name",
  },
  {
    title: "입금완료",
    dataIndex: "address",
  },
  {
    title: "배송준비",
    dataIndex: "address",
  },
  {
    title: "배송중",
    dataIndex: "address",
  },
  {
    title: "배송완료",
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

const SecondTable = () => {
  return (
    <div>
      <Divider>주문상태 현황</Divider>

      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default SecondTable;
