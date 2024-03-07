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
import {
  detailsParam,
  getDetails,
  patchMemoState,
} from "../../api/order/orderAllApi";
import { number } from "yup";
import { API_SERVER_HOST } from "../../util/util";

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
      iproduct: 0,
      repPic: "",
      productNm: "",
      cnt: 0,
      processState: 0,
      amount: 0,
      refundFl: 0,
    },
  ],
  iproduct: 0,
  repPic: "",
  productNm: "",
  cnt: 0,
  processState: 0,
  amount: 0,
  refundFl: 0,
  productAmount: 0,
  deleteAmount: 0,
  refundAmount: 0,
  totalAmount: 0,
  iorder: 0,
  orderedAt: "",
  payCategory: 0,
  // processState: 0,
  ordered: "0",
  orderedEmail: "",
  orderedPhoneNumber: "",
  recipient: "",
  recipientPhoneNumber: "",
  address: "",
  adminMemo: "",
};

const TestMd: React.FC<ResultModalProps> = ({ onClose, iOrder }) => {
  const [detailSource, setDetailSource] = useState([initState]);
  const [putMemo, setPutMemo] = useState("");
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

  // 메모 작성
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPutMemo(e.target.value);
  };

  const handleMemoApi = (iorder: number, adminMemo?: string | null) => {
    // console.log(
    //   "일괄처리 API 호출, 주문번호:",
    //   iorder,
    //   "메모적어용:",
    //   adminMemo,
    // );

    // memo가 undefined나 null일 경우 빈 문자열로 처리
    setPutMemo(adminMemo || "");

    if (adminMemo === undefined || adminMemo === null) {
      alert("메모를 작성해주세요");
      return; // 메모가 없으면 함수 종료
    }

    // 주문 상태 변경을 위한 데이터를 준비합니다.
    const requestData = {
      iorder: iorder, // 주문 번호를 배열에 담음
      adminMemo: putMemo, // 상태 번호
    };

    // API를 호출하여 주문 상태를 변경합니다.
    patchMemoState({
      detailsParam: requestData,
      successFn: () => {
        // 성공적으로 메모가 업데이트된 후에 데이터를 다시 불러와서 화면을 업데이트합니다.
        getDetails({
          orderParam: iOrder,
          successFn: updateDetails,
          failFn,
          errorFn,
        });
      },
      failFn,
      errorFn,
    });
  };
  const updateDetails = (result: any) => {
    // 성공적으로 데이터를 불러온 후에 상태를 업데이트합니다.
    setDetailSource(result);
  };

  useEffect(() => {
    // //console.log("===================== TestMd : iOrder : ", iOrder);
    // `http://192.168.0.144:5223/api/admin/order/details/${iOrder}`
    getDetails({ orderParam: iOrder, successFn, failFn, errorFn });
    //console.log("detailSource", detailSource[0].products);
  }, [iOrder]);

  const successFn = (result: any) => {
    //console.log(result);
    setDetailSource(result);
  };
  const failFn = (result: string) => {
    //console.log(result);
  };
  const errorFn = (result: string) => {
    //console.log(result);
  };

  const columns = [
    // {
    //   title: "상품 번호",
    //   dataIndex: "iproduct",
    //   key: "iproduct",
    // },
    // {
    //   title: "이미지",
    //   dataIndex: "products",
    //   key: "repPic",
    //   render: (items: any[]) => (
    //     <div
    //       style={{
    //         width: "100%",
    //         // display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       {items.map((item, index) => (
    //         <div>
    //           <img
    //             src={`${API_SERVER_HOST}/pic/product/${item.iproduct}/${item.repPic}`}
    //             alt=""
    //             style={{
    //               marginBottom: "10px",
    //               marginTop: "10px",
    //               width: "50px",
    //               height: "50px",
    //             }}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      title: "상품명",
      dataIndex: "products",
      key: "productNm",
      render: (items: any[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.productNm}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "처리상태",
      dataIndex: "products",
      key: "processState",
      render: (items: any[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.processState === 1 && "입금대기"}
              {item.processState === 2 && "배송준비중"}
              {item.processState === 3 && "배송중"}
              {item.processState === 4 && "배송완료"}
              {item.processState === 5 && "주문취소"}
            </li>
          ))}
        </ul>
      ),
    },

    {
      title: "수량",
      dataIndex: "products",
      key: "cnt",
      render: (items: any[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.cnt}
            </li>
          ))}
        </ul>
      ),
    },

    {
      title: "상품금액",
      dataIndex: "products",
      key: "amount",
      render: (items: any[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.amount}
            </li>
          ))}
        </ul>
      ),
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
                <h2>{detailSource[0].iorder}</h2>
              </div>

              <div className="left">주문일시</div>
              <div className="right">
                <h2>{detailSource[0].orderedAt}</h2>
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
                <h2>
                  {/* {detailSource[0].payCategory} */}
                  {detailSource[0].payCategory === 0 && "전체"}
                  {detailSource[0].payCategory === 2 && "무통장"}
                  {detailSource[0].payCategory === 3 && "카드"}
                </h2>
              </div>
              <div className="left">결제상태</div>
              <div className="right">
                <h2>
                  {/* {detailSource[0].processState} */}
                  {detailSource[0].processState === 0 ? "결제완료" : "미결제"}
                  {/* {detailSource[0].payCategory === 3 && "카드"} */}
                </h2>
              </div>
            </DetailBigKeyword>

            <SubTitle>주문자/ 수령자 정보</SubTitle>
            <DetailBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
              }}
            >
              <div className="left">주문자명</div>
              <div className="right">
                <h2>{detailSource[0].ordered}</h2>
              </div>
              <div className="left" style={{ background: "none" }}></div>
              <div className="right"></div>
            </DetailBigKeyword>
            <DetailBigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left">주문자 이메일</div>
              <div className="right">
                <h2>{detailSource[0].orderedEmail}</h2>
              </div>
              <div className="left">주문자 연락처</div>
              <div className="right">
                <h2>{detailSource[0].orderedPhoneNumber}</h2>
              </div>
            </DetailBigKeyword>
            <DetailBigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left">수령자명</div>
              <div className="right">
                <h2>{detailSource[0].recipient}</h2>
              </div>
              <div className="left">수령자 연락처</div>
              <div className="right">
                <h2>{detailSource[0].recipientPhoneNumber}</h2>
              </div>
            </DetailBigKeyword>
            <DetailBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                marginBottom: "50px",
              }}
            >
              <div className="left">배송지</div>
              <div className="right">
                <h2>{detailSource[0].address}</h2>
              </div>
              <div className="left" style={{ background: "none" }}></div>
              <div className="right">
                <h2></h2>
              </div>
            </DetailBigKeyword>
            {/* <TextBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                // marginBottom: "20px",
              }}
            >
              <div className="left">배송지</div>
              <div className="right">
                <h2>{detailSource[0].address}</h2>

                <TextareaStyle name="notes" id="notes">
                  {detailSource[0].address}
                </TextareaStyle>

                <SearchButton
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  수정
                </SearchButton>
              </div>
            </TextBigKeyword> */}
            <SubTitle>관리자 메모</SubTitle>
            <TextBigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                // marginBottom: "20px",
                marginBottom: "50px",
              }}
            >
              <div className="left">관리자 메모</div>
              <div className="right">
                <TextareaStyle
                  name="notes"
                  id="notes"
                  value={putMemo || detailSource[0].adminMemo}
                  onChange={handleInputChange}
                >
                  {detailSource[0].adminMemo}
                </TextareaStyle>
                <SearchButton
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                  onClick={() => handleMemoApi(detailSource[0].iorder, putMemo)}
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
                    <b>{detailSource[0].productAmount}원</b>
                  </li>
                  <li>
                    <p>취소금액</p>
                    <b>{detailSource[0].deleteAmount}원</b>
                  </li>
                  <li>
                    <p>반품금액</p>
                    <b>{detailSource[0].refundAmount}원</b>
                  </li>
                </CardFont>
              </DeMiddleCard>
              <FontSize
                style={{ justifyContent: "space-between", width: "200px" }}
              >
                <p>총 주문금액</p>
                <b>{detailSource[0].totalAmount}원</b>
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
