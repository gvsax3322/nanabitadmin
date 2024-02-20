import { Divider, Table } from "antd";

export const columns = [
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "아이디",
    dataIndex: "address",
  },
  {
    title: "이메일",
    dataIndex: "address",
  },
  {
    title: "접속횟수",
    dataIndex: "address",
  },
  {
    title: "가입일시",
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

const SignTable = () => {
  return (
    <div>
      <Divider>최근 회원가입</Divider>

      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default SignTable;
