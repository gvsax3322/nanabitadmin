import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import {
  BigKeyword,
  Common,
  MainTitle,
  SubTitle,
  TextareaStyle,
} from "../../styles/AdminBasic";
import { TableTicket } from "../main/TableTicket";
import { SeletCt } from "../select/SeletCt";

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

const ResultModal: React.FC<ResultModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        {/* 모달 내용 */}
    
        <MainTitle>신규 상품등록</MainTitle>
        <SubTitle>카테고리</SubTitle>
        <div style={{marginBottom:"15px"}}>
        <SeletCt /> 
        <SeletCt />
        </div>
        <TableTicket title="기본정보" />
        <TableTicket title="가격 및 재고" />
        <TableTicket title="상품이미지 및 상세정보" />
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            marginBottom: "20px",
          }}
        >
          <div className="left">관리자메모</div>
          <div className="right">
            <TextareaStyle name="notes" id="notes"></TextareaStyle>
          </div>
        </BigKeyword>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;
