import { Table } from "antd";
import MemberSelect from "../../../components/select/MemberSelect";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import {
  ListWrap,
  ModifyButton,
  ModifyInfo,
  ModifyWrap,
} from "../../../styles/member/memberstyle";
import { useEffect, useState } from "react";
import { getExMemberList } from "../../../api/member/memberApi";

export interface ExMemberList {
  iuser: number;
  nm: string;
  email: string;
  phoneNumber: string;
  registeredAt: string;
}

const MemberDelete = () => {
  const [memberList, setMemberList] = useState<ExMemberList[]>([]);

  const fetchData = async () => {
    try {
      const successFn = (data: ExMemberList[]) => {
        console.log("데이터:", data);
        setMemberList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await getExMemberList(successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10);
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (text: string, record: ExMemberList, index: number) => index + 1,
    },
    {
      title: "회원명",
      dataIndex: "nm",
      key: "nm",
      width: "15%",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "탈퇴일",
      dataIndex: "unregisteredAt",
      key: "unregisteredAt",
      render: (text: string) => formatDate(text),
    },
  ];

  return (
    <ModifyWrap>
      <MainTitle>회원 정보관리</MainTitle>
      <SubTitle>기본검색</SubTitle>
      <ModifyInfo>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">검색어</div>
          <div className="right">
            <MemberSelect optionone={"아이디"} optiontwo={"이름"} />
            <MiddleInput />
          </div>
        </BigKeyword>
      </ModifyInfo>
      <ModifyButton>
        <SearchButton>검색</SearchButton>
        <SearchButton style={{ background: " #f44336" }}>초기화</SearchButton>
      </ModifyButton>
      <ListWrap>
        <Table
          columns={columns}
          dataSource={memberList.map(member => ({
            ...member,
            key: member.iuser,
          }))}
        />
      </ListWrap>
    </ModifyWrap>
  );
};

export default MemberDelete;
