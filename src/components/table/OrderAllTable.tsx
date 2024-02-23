import styled from "@emotion/styled";
import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import { Common, SearchButton } from "../../styles/AdminBasic";

interface OrderItem {
  item: string;
  itemcount: number;
  price: number;
  process: string;
  returnbt: JSX.Element;
}

interface OrderAllDataItem {
  key: number;
  orderdate: string;
  items: OrderItem[];
  orderer: string;
  recipient: string;
  totalAmount: number;
  payment: string;
  bt: JSX.Element;
  img: JSX.Element;
}

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
    title: "주문일시",
    dataIndex: "orderdate",
  },
  {
    title: "주문목록",
    dataIndex: "bt",
  },
  {
    title: "상품명",
    dataIndex: "items",
    render: (items: OrderItem[]) => (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.item}</li>
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
          <li key={index}>{item.itemcount}</li>
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
          <li key={index}>{item.price}</li>
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
          <li key={index}>{item.process}</li>
        ))}
      </ul>
    ),
  },
  {
    title: "반품신청",
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
            <li style={{ marginBottom: "10px", marginTop: "10px" }} key={index}>
              {item.returnbt}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    title: "주문자",
    dataIndex: "orderer",
  },
  {
    title: "수령자",
    dataIndex: "recipient",
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
      process: "처리 중",
      returnbt: <SearchButton>반품신청</SearchButton>,
    },
    {
      item: "루솔 프리미엄 이유식 2단계",
      itemcount: 1,
      price: 5000,
      process: "완료",
      returnbt: <SearchButton>반품신청</SearchButton>,
    },
  ],
  // 다른 상품 정보를 추가할 수 있음
];

const data: OrderAllDataItem[] = [];

for (let i = 0; i < 10; i++) {
  nestedData.forEach((nestedItem, index) => {
    const items: OrderItem[] = nestedItem.map((item, itemIndex) => ({
      item: item.item,
      itemcount: item.itemcount,
      price: item.price,
      process: item.process,
      returnbt: item.returnbt,
    }));

    data.push({
      key: data.length + 1,
      orderdate: `2024-12-${data.length + 1}`,
      items: items,
      orderer: "John Doe",
      recipient: "Jane Doe",
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
          <SearchButton>주문목록</SearchButton>
        </div>
      ),
      img: (
        <img
          style={{ width: "50px", height: "50px" }}
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgTv/ADKOymcIHlVQxcKME+J2GRj6702OV6KZI0kyNssjlYDPOB91e2MANvJg4cHf4gj8qsnF2lafo+oLbaWQoVCZFExkKtnvJ/AeXxMHaqVlYKuOcAY+YqliDs8oksuVjnAYD4Z2qFKjmdx3e0PlR9zmN3U7knINAluVsDp+dP8AQK2SkcEbRqy9CK8oaFsxKaVLQxoK8L3MaOEuISZAFbKnOMg9fkKQ4YvOTsvW07LPN2e5Xm8aVKvZjhh6Mh2eF7105Gu0ZF3VfaIXPxriThi6ZVLXaHlyBzBjjuz5bAUqVU+CHoZDc3D13I/NLeK7YxlsmuF4YnP+8x/wmlSorDCuhg6w4Mvbp2EMyEgdyGrTqXC95HolpDLcwp6vCS4IJJIHX8frSpV5Pm6lSKwKzFwpO2mSX5vIuaQgiIL7THcDH5+dCcPcJ3N/e3M0d3EY7dQiMASC7HYL+sbUqVY5DTWmEXnBl3LrIht5IrhInBbKnDeTbjbY5/zFXng7go6TdNd3TRO2D2aqpAUnv38OleUq5KyDeyzz6Z2l7DL2g9huYKe/Ax/OpJVx4fKvKVLGKTGlJtKzvFeMuRivKVPxQAG+0/1hMAgHocjurGeI+Dbizv7dXuYm54iMhD9liKVKuilyKxm3GiAXhyQ3DRLMnssASFOKKl4Wmt5IsXEZDAY9k7DalSpn2PGKoh9Z0GaB3JlQmNiuQDUQNOZnAMi82fOlSqsegyiqPZ9PeGZozMu3x6d1KlSpQcUf/9k="
        />
      ),
    });
  });
}
const OrderAllTable: React.FC = () => {
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#A5A5A5",
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
    </ConfigProvider>
  );
};

export default OrderAllTable;
