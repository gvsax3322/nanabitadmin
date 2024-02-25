import styled from "@emotion/styled";
import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import { Common, SearchButton } from "../../styles/AdminBasic";
import ResultModal from "../common/Modal";

export interface IDataItem {
  key: number;
  name: string;
  item: string;
  category: string;
  inventory: string;
  sale: string;
  bt?: JSX.Element;
  img?: JSX.Element;
}
interface ISubTableProps {
  tableNum: (selectedRowKeys: React.Key[]) => void;
}

const ItemTable: React.FC<ISubTableProps> = ({ tableNum }) => {
  const [showModal, setShowModal] = useState(false);

  // ResultModal을 보여주는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (selectedRowKeys: React.Key[], record: any[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
    console.log(record);
    tableNum(record);
  };
  // const onSelect = (record: any, selected: any) => {
  //   setSelectedRowKeys(record)
  //   console.log("Selected Row:", selectedRowKeys, "Selected:", selected);
  //   // 선택된 행에 대한 추가적인 처리
  // };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onSelect,
    onSelectAll: (selected: any, selectedRows: any) => {
      console.log(
        "All rows selected:",
        selected,
        "Selected Rows:",
        selectedRows,
      );
      // 모든 행에 대한 추가적인 처리
    },
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
    },
    {
      title: "이미지",
      dataIndex: "img",
    },
    {
      title: "상품명",
      dataIndex: "item",
    },
    {
      title: "카테고리",
      dataIndex: "category",
    },
    {
      title: "재고",
      dataIndex: "inventory",
    },
    {
      title: "판매가",
      dataIndex: "sale",
    },
    {
      title: "관리",
      dataIndex: "bt",
    },
  ];

  const data: IDataItem[] = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i + 1,
      name: `Edward King ${i}`,
      item: `어떤 유아 용품이 제일 잘 나가요?. ${i}`,
      category: `잘하고 있나요? ${i}`,
      inventory: `재고 얼마나 있나요? ${i}`,
      sale: `얼마에 팔까요? ${i}`,

      bt: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchButton onClick={handleShowModal}>수정</SearchButton>
        </div>
      ),
      img: (
        <img
          style={{ width: "100px", height: "50px" }}
          src={process.env.PUBLIC_URL + "/assets/images/testimg.jpg"}
        />
      ),
    });
  }

  const Aaa = styled(Table)`
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
      .ant-table-tbody
      .ant-table-row.ant-table-row-selected
      > .ant-table-cell {
      background-color: ${Common.color.p800};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${Common.color.p600};
      border-color: ${Common.color.p800};
    }
    .ant-checkbox-wrapper-checked:hover .ant-checkbox-inner,
    .ant-checkbox-checked:hover .ant-checkbox-inner {
      border-color: rgba(40, 40, 40, 0.8) !important;
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: #d9d9d9 !important;
    }
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-checkbox-indeterminate
      .ant-checkbox-inner:after {
      background-color: ${Common.color.p800};
    }
    &&& {
      .ant-table-thead > tr > th {
        text-align: center;
      }
      .ant-table-tbody > tr > td {
        text-align: center;
      }
    }
  `;

  return (
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
      {showModal && <ResultModal onClose={handleCloseModal} />}
    </ConfigProvider>
  );
};

export default ItemTable;
