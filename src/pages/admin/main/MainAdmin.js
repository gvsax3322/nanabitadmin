import React from "react";
import {
  BigCard,
  LayoutMain,
  SmallCard,
  SubTitle,
} from "../../../styles/AdminBasic";
import styled from "@emotion/styled";

const OrderList = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MainWrap = styled.div`
  margin: 0 auto;
`;

const MainAdmin = () => {
  return (
    <MainWrap>
      <LayoutMain>
        <SubTitle>전체 주문통계</SubTitle>
        <OrderList>
          <SmallCard></SmallCard>
          <SmallCard></SmallCard>
          <SmallCard></SmallCard>
        </OrderList>
        <SubTitle>최근 주문내역</SubTitle>
        <BigCard></BigCard>
        <SubTitle>최근 회원가입</SubTitle>
        <BigCard></BigCard>
      </LayoutMain>
    </MainWrap>
  );
};

export default MainAdmin;
