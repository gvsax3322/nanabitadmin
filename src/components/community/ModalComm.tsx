import React, { useState } from "react";
import {
  BigCard,
  BigKeyword,
  Common,
  MainTitle,
  SearchButton,
  TextareaStyle,
} from "../../styles/AdminBasic";
import { ModalContent, ModalOverlay } from "../../styles/main/main";
import { DeldelDabbyeon, postDabbyeon } from "../../api/commun/commun";
import { motion } from "framer-motion";

interface ResultModalProps {
  onClose: () => void;
  answer: any;
}

const ModalComm: React.FC<ResultModalProps> = ({ onClose, answer }) => {
  const [aaa, setAaa] = useState();
  const handlechage = (e: any) => {
    setAaa(e.target.value);
  };

  const handleDeleteComment = (n: number) => {
    DeldelDabbyeon(answer.iboard, n);
  };

  const handleClikCancel = () => {
    onClose();
  };

  const handleClikPost = () => {
    let asd = {
      iboard: answer.iboard,
      comment: aaa,
    };
    console.log(asd);
    postDabbyeon(answer.iboard, asd);
    onClose();
  };

  console.log(answer.commentList);

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {answer.commentList?.map((item: any, index: number) => (
            <motion.div
              key={item.icomment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                padding: 10,
                borderRadius: 10,
                border: `1px solid ${Common.color.primary}`,
                marginBottom: 10,
                alignItems: "center",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
              }}
            >
              <div
                style={{
                  width: "20%",
                  backgroundColor: "#ddd",
                  padding: 8,
                  borderRadius: "8px 0 0 8px",
                  textAlign: "center",
                }}
              >
                관리자
              </div>
              <div style={{ width: "70%", padding: 8 }}>{item.comment}</div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "10%",
                  padding: "8px 12px",
                  border: "none",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "0 8px 8px 0",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteComment(item.icomment)}
              >
                삭제
              </motion.button>
            </motion.div>
          ))}
        </div>

        <TextareaStyle
          onChange={e => {
            handlechage(e);
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <SearchButton onClick={handleClikPost}>답변하기</SearchButton>
          <SearchButton
            style={{ background: "red" }}
            onClick={handleClikCancel}
          >
            취소하기
          </SearchButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalComm;
