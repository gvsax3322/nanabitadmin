import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import {
  BigCard,
  BigInput,
  BigKeyword,
  Common,
  TextareaStyle,
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

        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            marginBottom: "20px",
          }}
        >
          <div className="left">검색어</div>
          <div className="right">
            <TextareaStyle name="notes" id="notes"></TextareaStyle>
          </div>
        </BigKeyword>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;
