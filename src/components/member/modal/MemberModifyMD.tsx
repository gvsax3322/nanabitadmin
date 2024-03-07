import styled from "@emotion/styled";
import { Radio } from "antd";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { getMember } from "../../../api/member/memberApi";
import { MemberList } from "../../../pages/admin/member/MemberModify";
import { MainTitle, SubTitle } from "../../../styles/AdminBasic";
import MemberInfoSection from "./MemberInfoSection";
import OrderInfoSection from "./OrderInfoSection";

interface ResultModalProps {
  selectedMember: MemberList | null;
  onClose: () => void;
  successAl: (txt: string) => void;
  errorAl: (txt: string) => void;
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
    background-color: #666;
    color: #000 !important;
  }
`;

interface Address {
  zipCode: string;
  address: string;
  addressDetail: string;
}
interface Child {
  ichildAge: number;
  gender: string;
}

export interface MemberData {
  nm: string;
  registeredAt: string;
  uid: string;
  phoneNumber: string;
  email: string;
  addresses: Address[];
  children: Child[];
  adminMemo: string | null;
}

export interface PersonApiResponse {
  code: string;
  message: string;
  data: MemberData;
}

const MemberModifyMD: FC<ResultModalProps> = ({
  selectedMember,
  onClose,
  successAl,
  errorAl,
}) => {
  // 데이터 관련
  const [selectedValue, setSelectedValue] = useState(1);
  const [memberInfo, setMemberInfo] = useState<MemberData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedMember) return;

        const successFn = (data: MemberData[]) => {
          //console.log("데이터:", data);
          setMemberInfo(data);
        };

        const failFn = (error: string) => {
          console.error("목록 호출 오류:", error);
        };

        const errorFn = (error: string) => {
          console.error("목록 호출 서버 에러:", error);
        };

        await getMember(successFn, failFn, errorFn, selectedMember.iuser);
      } catch (error) {
        console.error("에러:", error);
      }
    };

    fetchData();
  }, [selectedMember]);

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
                boxShadow: "none",
                color: selectedValue === 1 ? "#fff" : "#000",
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
                boxShadow: "none",
                color: selectedValue === 2 ? "#fff" : "#000",
              }}
            >
              주문내역
            </Radio.Button>
          </Radio.Group>
        </MenuList>
        <SubTitle>기본정보</SubTitle>
        {selectedValue === 1 ? (
          <MemberInfoSection
            memberInfo={memberInfo}
            onClose={onClose}
            successAl={successAl}
            errorAl={errorAl}
            memberId={selectedMember && selectedMember.iuser}
          />
        ) : (
          <OrderInfoSection
            onClose={onClose}
            memberId={selectedMember && selectedMember.iuser}
            successAl={successAl}
            errorAl={errorAl}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default MemberModifyMD;
