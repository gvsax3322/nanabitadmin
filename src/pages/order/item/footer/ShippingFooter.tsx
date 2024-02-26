import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  BigButton,
  BigKeyword,
  Common,
  DeleteButton,
  MainTitle,
  MiddleInput,
  SubTitle,
} from "../../../../styles/AdminBasic";
import OrderAllSelect from "../../../../components/order/orderSlect/OrderAllSelect";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const ShippingFooter = () => {
  return (
    <>
      <Wrap>
        {/* <MainTitle>주문일괄처리</MainTitle> */}
        <SubTitle style={{ marginTop: "100px" }}>주문일괄처리</SubTitle>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            height: "80px",
          }}
        >
          <div className="left">선택한 주문을</div>
          <div className="right">
            <BigButton style={{ marginRight: "5px" }}>배송완료</BigButton>
            {/* <MiddleInput /> */}
          </div>
        </BigKeyword>
      </Wrap>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      ></div>
      <div></div>
    </>
  );
};

export default ShippingFooter;
