import { Pagination, Radio, RadioChangeEvent, Table } from "antd";
import React, { FC, useEffect, useState } from "react";

import styled from "styled-components";
import { getMemberOl } from "../../../api/member/memberApi";
import {
  BigKeyword,
  Common,
  MiddleButton,
  SearchButton,
  SmallButton,
} from "../../../styles/AdminBasic";
import { BtList, ModifyButton } from "../../../styles/member/memberstyle";
import TestMd from "../../order/TestMd";
import DatePick from "../DatePick";

interface OrderInfoSectionProps {
  onClose: () => void;
  memberId: number | null;
}

export interface OrderList {
  iorder: number;
  orderedAt: string;
  products: Product[];
  ordered: string;
  recipient: string;
  totalAmount: number;
  payCategory: number;
  refundFl: number;
}

export interface Product {
  repPic: string;
  productNm: string;
  cnt: number;
  processState: number;
  amount: number;
  refundFl: number;
}

const OrderInfoSection: FC<OrderInfoSectionProps> = ({ onClose, memberId }) => {
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // 검색관련
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [ratioNm, setRatioNm] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleDateChange = (dateRange: string[]) => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const successFn = (data: OrderList[]) => {
        console.log("데이터:", data);
        setOrderList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      console.log("데이터를 가져오는 중...");
      await getMemberOl(successFn, failFn, errorFn, memberId);
      console.log("데이터 가져오기 완료");
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleClickSearch = async () => {
    try {
      const successFn = (data: OrderList[]) => {
        console.log("데이터:", data);
        setOrderList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await getMemberOl(
        successFn,
        failFn,
        errorFn,
        memberId,
        startDate,
        endDate,
        ratioNm,
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      // API 호출하여 페이지에 해당하는 데이터 요청
      const successFn = (data: OrderList[]) => {
        console.log("데이터:", data);
        setOrderList(data); // 받아온 데이터로 상태 업데이트
        setCurrentPage(page); // 현재 페이지 업데이트
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      console.log(`페이지 ${page}의 데이터를 가져오는 중...`);
      await getMemberOl(
        successFn,
        failFn,
        errorFn,
        memberId,
        startDate,
        endDate,
        ratioNm,
        page, // 페이지 번호 전달
      );
      console.log(`페이지 ${page}의 데이터 가져오기 완료`);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // 테이블 관련
  const dataSource = orderList
    ? orderList.map(item => ({
        key: item.iorder,
        iorder: item.iorder,
        orderedAt: item.orderedAt,
        ordered: item.ordered,
        recipient: item.recipient,
        totalAmount: item.totalAmount,
        payCategory: item.payCategory,
        refundFl: item.refundFl,
        products: item.products.map((product, index) => ({
          repPic: product.repPic,
          productNm: product.productNm,
          cnt: product.cnt,
          processState: product.processState,
          amount: product.amount,
          refundFl: product.refundFl,
          key: `${item.iorder}_${index}`,
        })),
      }))
    : [];

  const columns: any[] = [
    {
      title: "주문일시",
      dataIndex: "orderedAt",
      key: "orderedAt",
    },
    {
      title: "주문목록",
      dataIndex: "refundFl",
      key: "refundFl",
      render: (refundFl: number) => (
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
            {refundFl === 0 && (
              <SearchButton style={{ background: "rgb(244, 67, 54)" }}>
                주문취소
              </SearchButton>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "이미지",
      dataIndex: "products",
      key: "repPic",
      render: (items: any[]) => (
        <div
          style={{
            width: "100%",
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items.map((item, index) => (
            <div>
              <img
                alt=""
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  width: "50px",
                  height: "50px",

                  // objectFit: "cover",
                }}
                // key={index}
              />
            </div>
          ))}
        </div>
      ),
    },
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
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "반품신청",
      dataIndex: "products",
      key: "refundFlProduct",
      render: (products: any[]) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {products.map((product, index) => (
              <React.Fragment key={index}>
                {product.refundFl === 0 && (
                  <SearchButton
                    style={{ marginBottom: "30px", marginTop: "30px" }}
                  >
                    반품신청
                  </SearchButton>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "주문자",
      dataIndex: "ordered",
      key: "ordered",
    },
    {
      title: "수령자",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "총주문액",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "결제수단",
      dataIndex: "payCategory",
      key: "payCategory",
      render: (payCategory: number) => (
        <ul>
          <li
            style={{ marginBottom: "30px", marginTop: "30px" }}
            key={payCategory}
          >
            {payCategory === 0 && "전체"}
            {payCategory === 2 && "무통장"}
            {payCategory === 3 && "카드"}
          </li>
        </ul>
      ),
    },
  ];

  const StyledTable = styled(Table)`
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
  // 테이블 끝

  return (
    <>
      <BigKeyword>
        <div className="left">기간검색</div>
        <div className="right" style={{ gap: "5x" }}>
          <DatePick
            onChange={handleDateChange}
            value={
              startDate && endDate
                ? [startDate, endDate]
                : [undefined, undefined]
            }
          />
        </div>
      </BigKeyword>
      <BigKeyword
        style={{
          borderLeft: `1px solid ${Common.color.primary}`,
          borderRight: `1px solid ${Common.color.primary}`,
          borderBottom: `1px solid ${Common.color.primary}`,
          height: "auto",
          marginBottom: "15px",
        }}
      >
        <div className="left">주문상태</div>
        <div
          className="right"
          style={{
            gap: "10px",
            height: "80px",
          }}
        >
          <Radio.Group
            defaultValue={0}
            style={{ marginRight: "10px" }}
            onChange={(e: RadioChangeEvent) => setRatioNm(e.target.value)}
          >
            <Radio value={0}>전체</Radio>
            <Radio value={1}>입금대기</Radio>
            <Radio value={2}>배송준비중</Radio>
            <Radio value={3}>배송중</Radio>
            <Radio value={4}>배송완료</Radio>
          </Radio.Group>
        </div>
      </BigKeyword>
      <BtList>
        <SmallButton>엑셀 저장</SmallButton>
      </BtList>
      <ModifyButton>
        <MiddleButton
          style={{ background: " #575757" }}
          onClick={handleClickSearch}
        >
          검색
        </MiddleButton>
        <MiddleButton
          style={{
            background: " #fff",
            border: "1px solid #000",
            color: "black",
          }}
          onClick={onClose}
        >
          닫기
        </MiddleButton>
      </ModifyButton>
      <StyledTable dataSource={dataSource} columns={columns} />
      <Pagination current={currentPage} onChange={handlePageChange} />
      {/* {showModal && <TestMd onClose={handleCloseModal} />} */}
    </>
  );
};

export default OrderInfoSection;
