import styled from "@emotion/styled";
import { Divider, Table } from "antd";

export const columns = [
  {
    title: "구매미확정",
    dataIndex: "name",
  },
  {
    title: "취소",
    dataIndex: "address",
  },
  {
    title: "환불",
    dataIndex: "address",
  },
  {
    title: "반품",
    dataIndex: "address",
  },
  {
    title: "교환",
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

const Asa = styled(Table)`
  :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
    .ant-table.ant-table-middle
    .ant-table-cell,
  :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
    .ant-table.ant-table-middle
    .ant-table-thead
    > tr
    > th {
    text-align: center;
  }
  
`;

const BuyTable = () => {
  return (
    <div>
      <Divider>구매확정/클래임 현황</Divider>

      <Asa
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default BuyTable;
