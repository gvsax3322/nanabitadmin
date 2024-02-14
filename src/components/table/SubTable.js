import styled from "@emotion/styled";
import { Table } from "antd";
import React, { useState } from "react";
import { Common, SearchButton } from "../../styles/AdminBasic";
const columns = [
  {
    title: "번호",
    dataIndex: "age",
  },
  {
    title: "이미지",
    dataIndex: "img",
  },
  {
    title: "상품명",
    dataIndex: "address",
  },
  {
    title: "카테고리",
    dataIndex: "address",
  },
  {
    title: "재고",
    dataIndex: "address",
  },
  {
    title: "판매가",
    dataIndex: "address",
  },
  {
    title: "관리",
    dataIndex: "bt",
  },
];
// 30개 출력
const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: i + 1,
    address: `London, Park Lane no. ${i}`,
    bt: <SearchButton>수정</SearchButton>,
    img: (
      <img
        style={{ width: "100px", height: "50px" }}
        src="data:image/jpeg;base64,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"
      />
    ),
  });
}

const SubTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = newSelectedRowKeys => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: changeableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: changeableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
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
    <Aaa
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default SubTable;
