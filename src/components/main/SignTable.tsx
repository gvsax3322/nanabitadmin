import { ConfigProvider, Divider, Table } from "antd";
import styled from "styled-components";
import { Common } from "../../styles/AdminBasic";

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

const SignTable = () => {
  return (
    <div>
      <Divider>최근 회원가입</Divider>

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

export default SignTable;
