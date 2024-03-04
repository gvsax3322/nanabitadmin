import styled from "@emotion/styled";
import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import { Common, SearchButton } from "../../../../styles/AdminBasic";
import TestMd from "../../TestMd";

interface OrderAllDataItem {
  key: number;
  orderdate: string;
  bt?: JSX.Element;
  items: OrderItem[];
  canceldate: string;
  orderer: string;
  totalAmount: number;
  payment: string;
}

interface OrderItem {
  item: string;
  itemcount: number;
  price: number;
  status: string;
  img: JSX.Element;
}

interface ISubTableProps {
  tableNum: (selectedRowKeys: React.Key[]) => void;
}

const CancelTable: React.FC<ISubTableProps> = ({ tableNum }) => {
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
      dataIndex: "actions",
      render: (record: OrderAllDataItem) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <SearchButton
              style={{ marginBottom: "12px" }}
              onClick={handleShowModal}
            >
              주문목록
            </SearchButton>
          </div>
        </div>
      ),
    },
    {
      title: "이미지",
      dataIndex: "items",
      render: (items: OrderItem[]) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ul>
            {items.map((item, index) => (
              <li
                style={{ marginBottom: "10px", marginTop: "10px" }}
                key={index}
              >
                {item.img}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "상품명",
      dataIndex: "items",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "수량",
      dataIndex: "items",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.itemcount}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "상품금액",
      dataIndex: "items",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "처리상태",
      dataIndex: "items",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.status}
            </li>
          ))}
        </ul>
      ),
    },

    {
      title: "취소일시",
      dataIndex: "canceldate",
    },
    {
      title: "주문자",
      dataIndex: "orderer",
    },
    {
      title: "총주문액",
      dataIndex: "totalAmount",
    },
    {
      title: "결제수단",
      dataIndex: "payment",
    },
  ];

  const nestedData = [
    [
      {
        item: "루솔 프리미엄 이유식 1단계",
        itemcount: 2,
        price: 10000,
        status: "처리 중",
        // returnbt: <SearchButton>반품신청</SearchButton>,
        img: (
          <img
            style={{ width: "50px", height: "50px" }}
            src={process.env.PUBLIC_URL + "/assets/images/testimg.jpg"}
          />
        ),
      },
      {
        item: "루솔 프리미엄 이유식 2단계",
        itemcount: 1,
        price: 5000,
        status: "완료",
        // returnbt: <SearchButton>반품신청</SearchButton>,
        img: (
          <img
            style={{ width: "50px", height: "50px" }}
            src={process.env.PUBLIC_URL + "/assets/images/testimg.jpg"}
          />
        ),
      },
    ],
    // 다른 상품 정보를 추가할 수 있음
  ];

  const data: OrderAllDataItem[] = [];

  for (let i = 0; i < 10; i++) {
    nestedData.forEach((nestedItem, index) => {
      const items: OrderItem[] = nestedItem.map((item, itemIndex) => ({
        img: item.img,
        item: item.item,
        itemcount: item.itemcount,
        price: item.price,
        status: item.status,
        // returnbt: item.returnbt,
      }));

      data.push({
        key: data.length + 1,
        orderdate: `2024-12-${data.length + 1}`,
        items: items,
        orderer: "살려요",
        canceldate: `2024-12-${data.length + 1}`,
        totalAmount: 100,
        payment: "카드",
        bt: (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchButton onClick={handleShowModal}>주문목록</SearchButton>
          </div>
        ),
      });
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

export default CancelTable;
