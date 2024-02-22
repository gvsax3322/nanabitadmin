import styled from "@emotion/styled";
import { Radio } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  BigInput,
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SubTitle,
} from "../../styles/AdminBasic";

interface ResultModalProps {
  onClose: () => void;
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

const MemberModifyMD: React.FC<ResultModalProps> = ({ onClose }) => {
  const [selectedValue, setSelectedValue] = useState(1);
  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: -1000, rotate: 360 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        onClick={e => e.stopPropagation()}
      >
        {/* 모달 내용 */}
        <MainTitle>회원정보수정</MainTitle>
        <MenuList>
          <Radio.Group
            value={selectedValue}
            onChange={handleRadioChange}
            style={{ marginRight: "10px" }}
          >
            <Radio.Button
              value={1}
              style={{
                height: "40px",
                borderRadius: "0px",
                border: "1px solid #000",
                background: "#d9d9d9",
              }}
            >
              회원정보수정
            </Radio.Button>
            <Radio.Button
              value={2}
              style={{
                height: "40px",
                borderRadius: "0px",
                border: "1px solid #000",
                background: "#d9d9d9",
              }}
            >
              주문내역
            </Radio.Button>
          </Radio.Group>
        </MenuList>
        <SubTitle>기본정보</SubTitle>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">이름</div>
          <div className="right">
            <MiddleInput readOnly />
          </div>
          <div className="left">가입일</div>
          <div className="right">
            <h2>2024.02.22</h2>
          </div>
        </BigKeyword>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">아이디</div>
          <div className="right">
            <MiddleInput readOnly style={{ marginRight: "10px" }} />
          </div>
          <div className="left">비밀번호</div>
          <div className="right">
            <MiddleInput readOnly />
          </div>
        </BigKeyword>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">전화번호</div>
          <div className="right">
            <MiddleInput readOnly />
          </div>
          <div className="left">이메일</div>
          <div className="right">
            <MiddleInput readOnly />
          </div>
        </BigKeyword>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
          }}
        >
          <div className="left" style={{ width: "75px" }}>
            주소
          </div>
          <div
            className="right"
            style={{
              width: "1450px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <BigInput readOnly />
          </div>
        </BigKeyword>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            height: "60px",
          }}
        >
          <div className="left">아이정보</div>
          <div className="right" style={{ gap: "10px" }}>
            <Radio.Group value={2} disabled style={{ marginRight: "10px" }}>
              <Radio.Button value={1}>임신/출산</Radio.Button>
              <Radio.Button value={2}>신생아</Radio.Button>
              <Radio.Button value={3}>베이비</Radio.Button>
              <Radio.Button value={4}>완료기</Radio.Button>
            </Radio.Group>
          </div>

          <div className="left">아이성별</div>
          <div className="right">
            <Radio.Group value={"W"} disabled style={{ marginRight: "10px" }}>
              <Radio.Button value={"M"}>남자</Radio.Button>
              <Radio.Button value={"W"}>여자</Radio.Button>
            </Radio.Group>
          </div>
        </BigKeyword>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MemberModifyMD;
