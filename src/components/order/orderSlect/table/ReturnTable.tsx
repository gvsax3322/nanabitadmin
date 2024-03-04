import styled from "@emotion/styled";
import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import { Common, SearchButton } from "../../../../styles/AdminBasic";
import TestMd from "../../TestMd";

interface OrderAllDataItem {
  key: number;
  orderdate: string;
  bt: JSX.Element;
  img: JSX.Element;
  itemname: string;
  count: number;
  price: number;
  status: string;
  orderer: string;

  returndate: string;
  payment: string;
}

interface ISubTableProps {
  tableNum: (selectedRowKeys: React.Key[]) => void;
}

const ReturnTable: React.FC<ISubTableProps> = ({ tableNum }) => {
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
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
    tableNum(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
    },
    {
      title: "주문일시",
      dataIndex: "orderdate",
    },
    {
      title: "주문목록",
      dataIndex: "bt",
    },
    {
      title: "이미지",
      dataIndex: "img",
    },
    {
      title: "상품명",
      dataIndex: "itemname",
    },
    {
      title: "수량",
      dataIndex: "count",
    },
    {
      title: "상품금액",
      dataIndex: "price",
    },
    {
      title: "반품일시",
      dataIndex: "returndate",
    },
    {
      title: "주문자",
      dataIndex: "orderer",
    },
    {
      title: "결제수단",
      dataIndex: "payment",
    },
  ];
  const data: OrderAllDataItem[] = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i + 1,
      itemname: `노가다중..노가다중..노가다중..노가다중${i}`,
      orderdate: `2024-2-${i++}`,
      count: i + 2,
      price: 20000,
      status: `반품신청`,
      orderer: `김주영`,
      returndate: `2024-2-${i++}`,
      payment: `카드`,

      bt: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchButton onClick={handleShowModal}>정보보기</SearchButton>
        </div>
      ),
      img: (
        <img
          style={{ width: "50px", height: "50px" }}
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
      />
      {showModal && <TestMd onClose={handleCloseModal} iOrder={0} />}
    </ConfigProvider>
  );
};

export default ReturnTable;
