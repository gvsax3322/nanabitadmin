import React from "react";
import { ModalContent, ModalOverlay } from "../../styles/main/main";
import {
  BigCard,
  BigKeyword,
  Common,
  MainTitle,
  SearchButton,
  SubTitle,
  TextareaStyle,
} from "../../styles/AdminBasic";

interface ResultModalProps {
  onClose: () => void;
  answer: any;
}

const ModalComm: React.FC<ResultModalProps> = ({ onClose, answer }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <MainTitle>Q&A</MainTitle>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            marginBottom: "10px",
          }}
        >
          <div className="left" style={{ fontSize: "2rem" }}>
            제목
          </div>
          <div className="right" style={{ fontSize: "2rem" }}>
            {answer.title}
          </div>
        </BigKeyword>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            marginBottom: "10px",
          }}
        >
          <div className="left" style={{ fontSize: "2rem" }}>
            작성자
          </div>
          <div className="right" style={{ fontSize: "2rem" }}>
            {answer.writerNm}
          </div>
        </BigKeyword>

        <BigCard style={{ fontSize: "1.8rem" }}>{answer.contents}</BigCard>

        <TextareaStyle />
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <SearchButton>답변하기</SearchButton>
          <SearchButton style={{ background: "red" }}>취소하기</SearchButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalComm;
