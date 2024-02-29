import { ConfigProvider, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MainTitle,
  MiddleButton,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import MainUsermodal from "./MainUsermodal";
import {
  MainProRc,
  getMainProRc,
  putMainProRc,
} from "../../api/usermain/mainProductSetApi";
import { API_SERVER_HOST } from "../../util/util";

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

const MdRecommend: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<MainProRc[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [refresh, setRefresh] = useState(0);

  const success = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "글 넣으삼",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "등록된 상품이 8개를 넘을 수 없습니다.",
    });
  };

  useEffect(() => {
    // 데이터를 불러오는 비동기 함수
    const fetchData = async () => {
      try {
        const successFn = (data: MainProRc[]) => {
          setData(data);
          // console.log("데이터:", resMonth);
        };
        const failFn = (error: string) => {
          console.error("목록 호출 오류:", error);
        };
        const errorFn = (error: string) => {
          console.error("목록 호출 서버 에러:", error);
        };
        await getMainProRc(successFn, failFn, errorFn);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 컴포넌트가 마운트될 때 데이터를 불러오도록 호출
    fetchData();
  }, [refresh]);

  const handleProductAdd = () => {
    console.log("data.length :", data.length);
    if (data.length > 9) {
      warning();
    } else if (data.length < 9) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDelete = (iproduct: number) => {
    console.log("삭제할거라능", iproduct);
    putMainProRc(iproduct, putSuccessFn, putFailFn, putErrorFn);
  };

  const putSuccessFn = () => {
    console.log("성공!");
    success("삭제 완료하였습니다.");
    setRefresh(refresh + 1);
    console.log("리프레시값", refresh);
  };
  const putFailFn = () => {
    console.log("실패!");
  };

  const putErrorFn = () => {
    console.log("에러!");
  };

  const columns: any[] = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "50px",
    },
    {
      title: "미리보기",
      dataIndex: "repPic",
      key: "iproduct",
      width: "100px",
      render: (repPic: string) => (
        <img
          style={{ width: "66px", height: "66px", objectFit: "cover" }}
          src={repPic}
          alt=""
        />
      ),
    },
    {
      title: "상품코드",
      dataIndex: "iproduct",
      key: "iproduct",
    },
    {
      title: "상품명",
      dataIndex: "productNm",
      key: "productNm",
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      width: "100px",
      render: (price: number) => <span>{price.toLocaleString()} 원</span>,
    },
    {
      title: "삭제",
      dataIndex: "iproduct",
      key: "iproduct",
      width: "80px",
      render: (record: any) => (
        <>
          {/* {console.log(record)} */}
          <SearchButton
            style={{
              background: "rgb(244, 67, 54)",
            }}
            onClick={() => handleDelete(record)}
          >
            삭제
          </SearchButton>
        </>
      ),
    },
  ];

  const dataSource = data.map((item, index) => ({
    key: (index + 1).toString(),
    repPic: `${API_SERVER_HOST}/pic/product/${item.iproduct}/${item.repPic}`,
    productNm: item.productNm,
    price: item.price,
    iproduct: item.iproduct,
  }));

  return (
    <>
      {contextHolder}
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
          dataSource={dataSource}
          pagination={false}
          bordered
        />
      </ConfigProvider>
    </>
  );
};

export default MdRecommend;
