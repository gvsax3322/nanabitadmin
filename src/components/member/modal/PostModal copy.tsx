import styled from "@emotion/styled";
import { Radio } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { MainTitle, SubTitle } from "../../../styles/AdminBasic";

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

const PostModal: React.FC<ResultModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: -1000, rotate: 360 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        onClick={e => e.stopPropagation()}
      >
        <MainTitle>메일 보내기</MainTitle>
        <MenuList>
          <Radio.Group style={{ marginRight: "10px" }}>
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
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostModal;
