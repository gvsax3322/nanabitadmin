import styled from "@emotion/styled";
import { ConfigProvider, Divider, Table } from "antd";
import { Common } from "../../styles/AdminBasic";

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

const Aaa = styled(Table)`
:where(.css-dev-only-do-not-override-17sses9).ant-table-wrapper
  .ant-table-tbody
  .ant-table-row.ant-table-row-selected
  > .ant-table-cell {
  background-color: ${Common.color.p800};
}
.ant-checkbox-input {
  background-color: ${Common.color.p800};
}
&&& {
  .ant-table-thead > tr > th {
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    line-height: 30px;
  }
}
`;

const BuyTable = () => {
  return (
    <div>
      <Divider>구매확정/클래임 현황</Divider>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a5a5a5",
          },
          components: {
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      >
        <Aaa
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
};

export default BuyTable;
