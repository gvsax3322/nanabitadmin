import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ChangeEvent, FC, useState } from "react";
import {
  BigInput,
  BigKeyword,
  MainTitle,
  MiddleButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import { ModifyButton } from "../../../styles/member/memberstyle";
import { MemberList } from "../../../pages/admin/member/MemberModify";
import { postMail, postMailTest } from "../../../api/mail/mailApi";

interface ResultModalProps {
  onClose: () => void;
  successAl: (txt: string) => void;
  errorAl: (txt: string) => void;
  selectedMember: MemberList | null;
}

export interface PostRes {
  code: string;
  message: string;
  data: {
    to: string[];
    subject: string;
    message: string;
  };
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

const PostModal: FC<ResultModalProps> = ({
  onClose,
  selectedMember,
  successAl,
  errorAl,
}) => {
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleClickModify = async () => {
    try {
      const successFn = (data: PostRes) => {
        console.log("데이터:", data);
        successAl("메일보내기에 성공했습니다.");
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
        errorAl("메일 보내기에 실패했습니다");
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
        errorAl("메일 보내기에 실패했습니다");
      };

      await postMail(
        successFn,
        failFn,
        errorFn,
        selectedMember?.email || "",
        title,
        message,
      );
    } catch (error) {
      console.error("에러:", error);
    }
    onClose();
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
        <MainTitle>메일 보내기</MainTitle>
        <SubTitle>
          고객명 : {selectedMember?.nm} ( {selectedMember?.email} )
        </SubTitle>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
            />
          </div>
        </BigKeyword>
        <ModifyButton>
          <MiddleButton
            style={{ background: " #575757" }}
            onClick={handleClickModify}
          >
            전송
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
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostModal;
