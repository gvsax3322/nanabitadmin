import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import {
  MainTitle,
  MiddleButton,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import MainUsermodal from "./MainUsermodal";

// type InputRef = GetRef<typeof Input>;
// type FormInstance<T> = GetRef<typeof Form<T>>;

// const EditableContext = React.createContext<FormInstance<any> | null>(null);

// 이게뭘까
// interface EditableRowProps {
//   index: number;
// }
const CenteredHeaderTable = styled(Table)`
  &&& {
    .ant-table-thead > tr > th {
      text-align: center;
    }
    .ant-table-tbody > tr > td {
      text-align: center;
    }
  }
`;

const NewProduct: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleProductAdd = () => {
    console.log("나와라고오");
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  interface IDataItem {
    key: number;
    img: JSX.Element;
    pnum: string;
    pname: string;
    price: number;
    deletebt: JSX.Element;
  }
  const columns = [
    {
      title: "번호",
      dataIndex: "key",
      width: "50px",
    },
    {
      title: "미리보기",
      dataIndex: "img",
      width: "100px",
    },
    {
      title: "상품코드",
      dataIndex: "pnum",
    },
    {
      title: "상품명",
      dataIndex: "pname",
    },
    {
      title: "가격",
      dataIndex: "price",
      render: (price: number) => <span>{price.toLocaleString()}</span>,
    },
    {
      title: "삭제",
      dataIndex: "deletebt",
      width: "80px",
    },
  ];

  // 이미지 설정 설정
  const defaultImgUrl = `${process.env.PUBLIC_URL}/assets/images/defaultitemimg.svg`;

  const handleDelete = () => {
    console.log("삭제할거라능");
  };

  const [data, setData] = useState<IDataItem[]>(() => {
    const initialData: IDataItem[] = [];
    for (let i = 0; i < 2; i++) {
      initialData.push({
        key: i + 1,
        img: (
          <img
            style={{ width: "66px", height: "66px", objectFit: "cover" }}
            src={defaultImgUrl}
            alt=""
            className="diaryadd-img-before"
          />
        ),
        pnum: "pnum",
        pname: "pname",
        price: 100000,
        deletebt: (
          <>
            <SearchButton
              style={{
                background: "rgb(244, 67, 54)",
              }}
              onClick={handleDelete}
            >
              삭제
            </SearchButton>
          </>
        ),
      });
    }
    return initialData;
  });

  return (
    <>
      {isOpen && <MainUsermodal onClose={handleCloseModal} />}
      <MainTitle>MD 추천상품</MainTitle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SubTitle style={{ textAlign: "center", lineHeight: "15px" }}>
          노출될 상품 <span style={{ color: "rgb(244, 67, 54)" }}>4</span> 건 |{" "}
          <span style={{ fontSize: "12px" }}>* 최소 1개 , 최대 8개 </span>
        </SubTitle>
        <MiddleButton
          onClick={handleProductAdd}
          style={{ marginBottom: 16, fontSize: "12px" }}
        >
          상품 등록
        </MiddleButton>
      </div>
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
        <CenteredHeaderTable
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </ConfigProvider>
    </>
  );
};

export default NewProduct;
