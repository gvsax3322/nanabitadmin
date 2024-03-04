import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  BigButton,
  BigKeyword,
  Common,
  SubTitle,
} from "../../../../styles/AdminBasic";

interface Props {
  handleStateChange: (stateIndex: number) => void;
}

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const OrAllFooter: React.FC<Props> = ({ handleStateChange }) => {
  const [selectedState, setSelectedState] = useState<number>(0);

  // 주문 상태 변경 핸들러
  const handleChangePocessState = (stateIndex: number) => {
    setSelectedState(stateIndex);
    handleStateChange(stateIndex); // 선택한 주문의 상태를 변경하는 함수 호출
  };

  return (
    <>
      <Wrap>
        <SubTitle style={{ marginTop: "100px" }}>주문일괄처리</SubTitle>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            height: "80px",
          }}
        >
          <div className="left">선택한 주문을</div>
          <div className="right">
            <BigButton
              style={{ marginRight: "5px" }}
              onClick={() => handleChangePocessState(2)} // 배송 준비 중 버튼 클릭 시 상태 변경
            >
              배송준비중
            </BigButton>
            <BigButton
              style={{ marginRight: "5px" }}
              onClick={() => handleChangePocessState(3)} // 배송 중 버튼 클릭 시 상태 변경
            >
              배송중
            </BigButton>
            <BigButton
              style={{ marginRight: "5px" }}
              onClick={() => handleChangePocessState(4)} // 배송 완료 버튼 클릭 시 상태 변경
            >
              배송완료
            </BigButton>
            <BigButton onClick={() => handleChangePocessState(5)}>
              주문취소
            </BigButton>
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

export default OrAllFooter;
