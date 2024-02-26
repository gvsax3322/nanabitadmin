import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FC } from "react";
import { ModifyButton } from "../../../pages/admin/member/MemberModify";
import {
  BigInput,
  BigKeyword,
  MainTitle,
  MiddleButton
} from "../../../styles/AdminBasic";

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
  height: 540px;
  overflow-y: auto;
  background: #ffffff;
  padding: 20px;
`;

const PostModal: FC<ResultModalProps> = ({ onClose }) => {
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

        <BigKeyword
          style={{
            border: "1px solid #000",
            height: "90px",
          }}
        >
          <div className="left" style={{ fontSize: "20px" }}>
            제목
          </div>
          <div className="right">
            <BigInput
              style={{ width: "95%", height: "50px", fontSize: "20px" }}
            />
          </div>
        </BigKeyword>
        <BigKeyword
          style={{
            height: "200px",
            borderLeft: "1px solid #000",
            borderRight: "1px solid #000",
            marginBottom: "40px",
          }}
        >
          <div className="left" style={{ fontSize: "20px" }}>
            내용
          </div>
          <div className="right">
            <BigInput
              style={{
                width: "95%",
                height: "160px",
                fontSize: "20px",
              }}
            />
          </div>
        </BigKeyword>
        <ModifyButton>
          <MiddleButton style={{ background: " #575757" }}>저장</MiddleButton>
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
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostModal;
