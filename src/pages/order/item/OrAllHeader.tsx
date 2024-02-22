import React, { useState } from "react";

import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import styled from "@emotion/styled";
import OrderAllSelect from "../../../components/order/orderSlect/OrderAllSelect";
import OrderPicker from "../../../components/order/orderSlect/OrderPicker";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const OrAllHeader = () => {
  return (
    <>
      <Wrap>
        <MainTitle>전체리스트</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">검색어</div>
            <div className="right">
              <OrderAllSelect
                option1="주문번호"
                option2="일련번호"
                option3="회원아이디"
                option4="주문자명"
                option5="입금자명"
                option6="수령자명"
                option7="수령자 핸드폰"
              />
              <MiddleInput />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">기간검색</div>
            <div className="right">
              <OrderAllSelect
                option1="기간검색"
                option2="입금완료일"
                option3="배송완료일"
                option4="상품취소일"
                option5="상품반품일"
              />
              <OrderPicker />
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                오늘
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                어제
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                일주일
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                지난달
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                1개월
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                3개월
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                전체
              </SmallButton>
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">결제수단</div>
            <div className="right">
              <OrderAllSelect
                option1="결제수단"
                option2="무통장"
                option3="카드"
              />
              <OrderAllSelect
                option1="주문상태"
                option2="입금대기"
                option3="배송준비중"
                option4="배송중"
                option5="배송완료"
                option6="취소"
                option7="반품"
              />
            </div>
          </BigKeyword>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <SearchButton>검색</SearchButton>
          <SearchButton style={{ background: " #f44336" }}>초기화</SearchButton>
        </div>
      </Wrap>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <SmallButton style={{ marginRight: "5px" }}>
            전체메일 발송
          </SmallButton>
          <SmallButton>엑셀 저장</SmallButton>
        </div>
        <div style={{ textAlign: "right" }}>
          <OrderAllSelect
            option1="주문일 역순"
            option2="처리일 역순"
            option3="처리일 순"
            option4="주문자명"
          />
        </div>
      </div>

      <div></div>
    </>
  );
};

export default OrAllHeader;
