import { Divider, Table } from "antd";

export const columns = [
  {
    title: "주문번호",
    dataIndex: "name",
  },
  {
    title: "주문자명",
    dataIndex: "address",
  },
  {
    title: "수령자명",
    dataIndex: "address",
  },
  {
    title: "전화번호",
    dataIndex: "address",
  },
  {
    title: "결제방법	",
    dataIndex: "address",
  },
  {
    title: "총주문액",
    dataIndex: "address",
  },
  {
    title: "주문일시",
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

const RecentlyTable = () => {
  return (
    <div>
      <Divider>최근 주문내역</Divider>

      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default RecentlyTable;
