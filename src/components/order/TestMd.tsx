import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  BigCard,
  BigInput,
  BigKeyword,
  Common,
  DeleteButton,
  DetailBigKeyword,
  MainTitle,
  MiddleCard,
  MiddleInput,
  SearchButton,
  SmallCard,
  SubTitle,
  TextBigKeyword,
  TextareaStyle,
} from "../../styles/AdminBasic";
import { ConfigProvider, Flex, Radio, Table } from "antd";
import { CardFont, DeBigCard, DeMiddleCard, FontSize } from "./DetaileStyle";
import { detailsParam, getDetails } from "../../api/order/orderAllApi";
import { number } from "yup";

interface ResultModalProps {
  onClose: () => void;
  iOrder: number;
}

const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  width: 1440px;
  height: 850px;
  overflow-y: auto;
  background: #ffffff;
  padding: 20px;
`;
const MenuList = styled.div`
  height: 40px;
  border-bottom: 1px solid #000;
  display: flex;
  margin-bottom: 21px;
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)
    .ant-radio-button,
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)
    .ant-radio-button:hover {
    background-color: #666; /* 선택됐을 때의 배경색 */
    color: #000 !important; /* 선택됐을 때의 글자색 */
  }
`;
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
      line-height: 30px;
    }
  }
`;
export interface products {
  iproduct: number;
  repPic: string;
  productNm: string;
  cnt: number;
  processState: number;
  amount: number;
  refundFl: number;
}

const initState = {
  products: [
    {
      iproduct: number,
      repPic: "e31bdfe9-6cfc-48e6-842e-0f9d36bc14a5.jpg",
      productNm: "휴대용 멀티 소독 ",
      cnt: 2,
      processState: 4,
      amount: 75000,
      refundFl: 0,
    },
  ],
  productAmount: 150000,
  deleteAmount: 0,
  refundAmount: 0,
  totalAmount: 150000,
  iorder: 102148,
  orderedAt: "2022-03-10T00:00",
  payCategory: 3,
  processState: 4,
  ordered: "김재완",
  orderedEmail: "jaewan@gmail.com",
  orderedPhoneNumber: "010-2215-1234",
  recipient: "김재완",
  recipientPhoneNumber: "010-2215-1234",
  address: "서울특별시 관악구 관악로 145",
  adminMemo: null,
};

const TestMd: React.FC<ResultModalProps> = ({ onClose, iOrder }) => {
  const [detailSource, setDetailSource] = useState([initState]);
  const dataSource = detailSource.map(item => ({
    products: item.products.map((product, index) => ({
      iproduct: product.iproduct,
      repPic: product.repPic,
      productNm: product.productNm,
      cnt: product.cnt,
      processState: product.processState,
      amount: product.amount,
      refundFl: product.refundFl,
      key: `${item.iorder}_${index}`, // 상품마다 고유한 key 생성
    })),
    productAmount: item.productAmount, // iorder를 key로 사용
    deleteAmount: item.deleteAmount,
    refundAmount: item.refundAmount,
    totalAmount: item.totalAmount,
    iorder: item.iorder,
    orderedAt: item.orderedAt,
    payCategory: item.payCategory,
    processState: item.processState,
    ordered: item.ordered,
    orderedEmail: item.orderedEmail,
    orderedPhoneNumber: item.orderedPhoneNumber,
    recipient: item.recipient,
    recipientPhoneNumber: item.recipientPhoneNumber,
    address: item.address,
    adminMemo: item.adminMemo,
    // sampleData: [item.refundFl, item.iorder],
    // products 배열을 반복하면서 각 상품 정보를 키로 추가합니다.
  }));
  // --
  useEffect(() => {
    // console.log("===================== TestMd : iOrder : ", iOrder);
    // `http://192.168.0.144:5223/api/admin/order/details/${iOrder}`
    getDetails({ orderParam: iOrder, successFn, failFn, errorFn });
  }, [iOrder]);

  const successFn = (result: any) => {
    console.log(result);
  };
  const failFn = (result: string) => {
    console.log(result);
  };
  const errorFn = (result: string) => {
    console.log(result);
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "iproduct",
      key: "iproduct",
    },
    // {
    //   title: "이미지",
    //   dataIndex: "repPic",
    //   key: "repPic",
    //   render: (record: products) => (
    //     <img src={record.repPic} alt="Product" style={{ width: "50px" }} />
    //   ),
    // },
    {
      title: "주문상품",
      dataIndex: "productNm",
      key: "productNm",
    },
    {
      title: "처리상태",
      dataIndex: "processState",
      key: "processState",
    },
    {
      title: "수량",
      dataIndex: "cnt",
      key: "cnt",
    },
    // {
    //   title: "상품금액",
    //   dataIndex: "amount",
    //   key: "amount",
    //   render: (record: products) => (
    //     <span>{record.amount.toLocaleString()}</span>
    //   ),
    // },
    {
      title: "실결제액",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
  ];
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex" style={{ display: "flex" }}>
          <div style={{ width: "80%" }}>
            <MainTitle>주문상세페이지</MainTitle>
            <SubTitle>주문상품 개</SubTitle>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#A5A5A5",
                },
                components: {
                  Table: {
                    // background: ${Common.color.p800};
                    headerBg: "#cccccc",
                    // headerColor: "#aaa",
                  },
                },
              }}
            >
              <Aaa
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                style={{ marginBottom: "50px" }}
              />
            </ConfigProvider>

            <SubTitle>결제 정보</SubTitle>
            <DetailBigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left">주문번호</div>
              <div className="right">
                <h2>2024-02-23234234</h2>
              </div>
              <div className="left">주문일시</div>
              <div className="right">
                <h2>2024-02-23</h2>
              </div>
            </DetailBigKeyword>
            <DetailBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                marginBottom: "50px",
              }}
            >
              <div className="left">결제수단</div>
              <div className="right">
                <h2>카드</h2>
              </div>
              <div className="left">결제상태</div>
              <div className="right">
                <h2>결제완료</h2>
              </div>
            </DetailBigKeyword>

            <SubTitle>주문자/ 수령자 정보</SubTitle>
            <DetailBigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left">주문자명</div>
              <div className="right">
                <h2>죽겟따</h2>
              </div>
              <div className="left" style={{ background: "none" }}></div>
              <div className="right"></div>
            </DetailBigKeyword>
            <DetailBigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left">주문자 이메일</div>
              <div className="right">
                <h2>aaa@naver.com</h2>
              </div>
              <div className="left">주문자 연락처</div>
              <div className="right">
                <h2>010-4444-4444</h2>
              </div>
            </DetailBigKeyword>
            <DetailBigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left">수령자명</div>
              <div className="right">
                <h2>김옥찌</h2>
              </div>
              <div className="left">수령자 연락처</div>
              <div className="right">
                <h2>010-4444-4444</h2>
              </div>
            </DetailBigKeyword>
            <TextBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                marginBottom: "20px",
              }}
            >
              <div className="left">배송지</div>
              <div className="right">
                <TextareaStyle name="notes" id="notes"></TextareaStyle>
                <SearchButton
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  수정
                </SearchButton>
              </div>
            </TextBigKeyword>
            {/* <MenuList></MenuList> */}
            <SubTitle>관리자 메모</SubTitle>
            <TextBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                marginBottom: "20px",
              }}
            >
              <div className="left">관리자 메모</div>
              <div className="right">
                <TextareaStyle name="notes" id="notes"></TextareaStyle>
                <SearchButton
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  수정
                </SearchButton>
              </div>
            </TextBigKeyword>
          </div>
          <div>
            <DeBigCard
              style={{
                margin: "41px",
                width: "250px",
                background: "#E9E9E9",
              }}
            >
              <DeMiddleCard style={{ width: "100%" }}>
                <CardFont>
                  <li>
                    <p>상품금액</p>
                    <b>200,000 원</b>
                  </li>
                  <li>
                    <p>취소금액</p>
                    <b>0 원</b>
                  </li>
                  <li>
                    <p>반품금액</p>
                    <b>0 원</b>
                  </li>
                </CardFont>
              </DeMiddleCard>
              <FontSize>
                <p>총 주문금액</p>
                <b>200,000원</b>
              </FontSize>
            </DeBigCard>
          </div>
        </div>

        <div style={{ textAlign: "center", alignItems: "center" }}>
          <DeleteButton onClick={onClose}>닫기</DeleteButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TestMd;
