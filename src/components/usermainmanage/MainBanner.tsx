import React, { useState } from "react";
import { Common, SearchButton } from "../../styles/AdminBasic";
import styled from "styled-components";
import { Button, Form, GetRef, Input, Table } from "antd";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface IDataItem {
  key: number;
  name: string;
  item: string;
  bt: JSX.Element;
  img: JSX.Element;
}
const columns = [
  {
    title: "순서",
    dataIndex: "key",
  },
  {
    title: "미리보기",
    dataIndex: "img",
  },
  {
    title: "사진업로드",
    dataIndex: "item",
  },
  {
    title: "링크주소",
    dataIndex: "name",
  },
  {
    title: "TARGET",
    dataIndex: "name",
  },
  {
    title: "상태관리",
    dataIndex: "bt",
  },
];
const data: IDataItem[] = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i + 1,
    name: `Edward King ${i}`,
    item: `London, Park Lane no. ${i}`,
    bt: <SearchButton>수정</SearchButton>,
    img: (
      <img
        style={{ width: "100px", height: "50px" }}
        src="https://post-phinf.pstatic.net/MjAyMjExMTdfNzYg/MDAxNjY4NjUwMTQxMzU2.KOS5Iab6G0-88otScR2vsaZmoimqN8v-b5QiMhSkj5og.qsrQszwww-AZFP32Vs0gfJpqYp4tWpaXQYRupweSlOMg.JPEG/1633c62db4f2af416b327f14ce3c3100.jpg?type=w800_q75"
        alt=""
      />
    ),
  });
}
const MainBanner: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
  `;

  return (
    <>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      <Aaa
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};
export default MainBanner;
