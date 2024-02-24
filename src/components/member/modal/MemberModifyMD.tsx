import styled from "@emotion/styled";
import { Radio } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { BtList, ModifyButton } from "../../../pages/admin/member/MemberModify";
import {
  BigInput,
  BigKeyword,
  Common,
  DeleteButton,
  MainTitle,
  MiddleButton,
  MiddleInput,
  SmallButton,
  SubTitle,
  TextareaStyle,
} from "../../../styles/AdminBasic";
import MyBaby from "./MyBaby";
import OrderPicker from "../../order/orderSlect/OrderPicker";

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
    <ModalOverlay>
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
        {selectedValue === 1 ? (
          <>
            <BigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left" style={{ width: "130px" }}>
                이름
              </div>
              <div className="right">
                <MiddleInput readOnly />
              </div>
              <div className="left" style={{ width: "130px" }}>
                가입일
              </div>
              <div className="right">
                <h2>2024.02.22</h2>
              </div>
            </BigKeyword>
            <BigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left" style={{ width: "130px" }}>
                아이디
              </div>
              <div className="right">
                <MiddleInput readOnly style={{ marginRight: "10px" }} />
              </div>
              <div className="left" style={{ width: "130px" }}>
                비밀번호
              </div>
              <div className="right">
                <MiddleInput />
              </div>
            </BigKeyword>
            <BigKeyword
              style={{ borderTop: `1px solid ${Common.color.primary}` }}
            >
              <div className="left" style={{ width: "130px" }}>
                전화번호
              </div>
              <div className="right">
                <MiddleInput readOnly />
              </div>
              <div className="left" style={{ width: "130px" }}>
                이메일
              </div>
              <div className="right">
                <MiddleInput readOnly />
              </div>
            </BigKeyword>
            <BigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
              }}
            >
              <div className="left" style={{ width: "70px" }}>
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
            <MyBaby />
            <BigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                marginBottom: "20px",
              }}
            >
              <div className="left" style={{ width: "65px" }}>
                관리자메모
              </div>
              <div
                className="right"
                style={{
                  width: "1450px",
                }}
              >
                <TextareaStyle />
              </div>
            </BigKeyword>
            <DeleteButton>회원 삭제</DeleteButton>
            <ModifyButton>
              <MiddleButton style={{ background: " #575757" }}>
                저장
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
          </>
        ) : (
          <div>
            <BigKeyword style={{ border: `1px solid ${Common.color.primary}` }}>
              <div className="left">기간검색</div>
              <div className="right" style={{ gap: "5px" }}>
                <OrderPicker />
                <SmallButton style={{ minWidth: "40px" }}>오늘</SmallButton>
                <SmallButton style={{ minWidth: "40px" }}>어제</SmallButton>
                <SmallButton style={{ minWidth: "40px" }}>일주일</SmallButton>
                <SmallButton style={{ minWidth: "40px" }}>지난달</SmallButton>
                <SmallButton style={{ minWidth: "40px" }}>1개월</SmallButton>
                <SmallButton style={{ minWidth: "40px" }}>3개월</SmallButton>
                <SmallButton style={{ minWidth: "40px" }}>전체</SmallButton>
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
                <Radio.Group defaultValue={0} style={{ marginRight: "10px" }}>
                  <Radio value={0}>전체</Radio>
                  <Radio value={1}>입금대기</Radio>
                  <Radio value={2}>배송준비중</Radio>
                  <Radio value={3}>배송중</Radio>
                  <Radio value={4}>배송완료</Radio>
                  <Radio value={5}>취소</Radio>
                  <Radio value={6}>반품</Radio>
                </Radio.Group>
              </div>
            </BigKeyword>
            <BtList>
              <div>
                <SmallButton style={{ marginRight: "20px" }}>
                  전체메일 발송
                </SmallButton>
                <SmallButton>엑셀 저장</SmallButton>
              </div>
            </BtList>
            <ModifyButton>
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
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default MemberModifyMD;
