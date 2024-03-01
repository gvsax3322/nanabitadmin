import React, { ChangeEvent, FC, useState } from "react";
import {
  BigInput,
  BigKeyword,
  Common,
  DeleteButton,
  MiddleButton,
  MiddleInput,
  TextareaStyle,
} from "../../../styles/AdminBasic";
import MyBaby from "./MyBaby";
import { ModifyButton } from "../../../styles/member/memberstyle";
import { MemberData } from "./MemberModifyMD";
import { modifyMember } from "../../../api/member/memberApi";

interface MemberInfoSectionProps {
  memberInfo: MemberData[];
  onClose: () => void;
  memberId: number | null;
}

export interface ResModify {
  code: string;
  message: string;
}

const MemberInfoSection: FC<MemberInfoSectionProps> = ({
  memberInfo,
  onClose,
  memberId,
}) => {
  const addresses = memberInfo[0]?.addresses;
  const children = memberInfo[0]?.children;
  console.log(memberId);

  const [password, setpassword] = useState<string>();
  const [memo, setmemo] = useState<string>();

  const handleClickModify = async () => {
    try {
      const successFn = (data: ResModify) => {
        console.log("데이터:", data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await modifyMember(successFn, failFn, errorFn, memberId, password, memo);
    } catch (error) {
      console.error("에러:", error);
    }
    onClose();
  };

  return (
    <>
      <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
        <div className="left" style={{ width: "130px" }}>
          이름
        </div>
        <div className="right">
          <h2>{memberInfo[0] && memberInfo[0].nm}</h2>
        </div>
        <div className="left" style={{ width: "130px" }}>
          가입일
        </div>
        <div className="right">
          {memberInfo[0] && (
            <h2>
              {new Date(memberInfo[0].registeredAt).toISOString().split("T")[0]}
            </h2>
          )}
        </div>
      </BigKeyword>
      <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
        <div className="left" style={{ width: "130px" }}>
          아이디
        </div>
        <div className="right">
          <h2>{memberInfo[0] && memberInfo[0].uid}</h2>
        </div>
        <div className="left" style={{ width: "130px" }}>
          비밀번호
        </div>
        <div className="right">
          <MiddleInput
            style={{ fontSize: "15px" }}
            placeholder="특수문자를 포함한 8~16자리"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setpassword(e.target.value)
            }
          />
        </div>
      </BigKeyword>
      <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
        <div className="left" style={{ width: "130px" }}>
          전화번호
        </div>
        <div className="right">
          <h2>{memberInfo[0] && memberInfo[0].phoneNumber}</h2>
        </div>
        <div className="left" style={{ width: "130px" }}>
          이메일
        </div>
        <div className="right">
          <h2>{memberInfo[0] && memberInfo[0].email}</h2>
        </div>
      </BigKeyword>

      <BigKeyword
        style={{
          borderTop: `1px solid ${Common.color.primary}`,
          height: "auto",
        }}
      >
        <div className="left" style={{ width: "65px", height: "auto" }}>
          주소
        </div>
        <div>
          {addresses &&
            addresses.map((address, index) => (
              <div
                key={index}
                style={{ display: "flex", padding: "3px", marginLeft: "14px" }}
              >
                <BigInput
                  style={{
                    fontSize: "15px",
                    margin: "4px",
                  }}
                  value={`[${address.zipCode}] ${address.address} ${address.addressDetail}`}
                  readOnly
                />
              </div>
            ))}
        </div>
      </BigKeyword>
      {children &&
        children.map((child, index) => (
          <div key={index}>
            <MyBaby childData={[child]} childIndex={index + 1} />
          </div>
        ))}
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
            paddingLeft: "10px",
          }}
        >
          <TextareaStyle
            style={{ margin: "10px", padding: "0px" }}
            defaultValue={memberInfo[0]?.adminMemo || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setmemo(e.target.value)
            }
          />
        </div>
      </BigKeyword>
      <DeleteButton>회원 삭제</DeleteButton>
      <ModifyButton>
        <MiddleButton
          style={{ background: " #575757" }}
          onClick={handleClickModify}
        >
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
  );
};

export default MemberInfoSection;
