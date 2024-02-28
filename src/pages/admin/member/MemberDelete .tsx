import { Table } from "antd";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getExMemberList } from "../../../api/member/memberApi";
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

export interface ExMemberList {
  iuser: number;
  nm: string;
  email: string;
  phoneNumber: string;
  registeredAt: string;
}

export interface PostExMember {
  keyword: string;
  keywordType: number;
}

const MemberDelete = () => {
  const [memberList, setMemberList] = useState<ExMemberList[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchOp, setSearchOp] = useState(0);

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

      await getExMemberList(successFn, failFn, errorFn, searchText, searchOp);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const ResetData = async () => {
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

  const handleInputChange = useMemo(() => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };
  }, []);

  const handleSearchOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        setSearchOp(1);
        break;
      case 1:
        setSearchOp(2);
        break;
    }
    // console.log("검색어", optionIndex);
  };

  const handleClickSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      await fetchData();
    } catch (error) {
      console.error("검색 오류:", error);
    }
  };

  return (
    <ModifyWrap>
      <MainTitle>회원 정보관리</MainTitle>
      <SubTitle>기본검색</SubTitle>
      <ModifyInfo>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">검색어</div>
          <div className="right">
            <MemberSelect
              option2={"이메일"}
              option3={"이름"}
              onClick={handleSearchOp}
            />
            <MiddleInput
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={searchText}
              onChange={handleInputChange}
            />
          </div>
        </BigKeyword>
      </ModifyInfo>
      <ModifyButton>
        <SearchButton onClick={handleClickSearch}>검색</SearchButton>
        <SearchButton style={{ background: " #f44336" }} onClick={ResetData}>
          초기화
        </SearchButton>
      </ModifyButton>
      <ListWrap>
        <Table
          columns={columns}
          dataSource={
            memberList &&
            memberList.map(member => ({
              ...member,
              key: member.iuser,
            }))
          }
        />
      </ListWrap>
    </ModifyWrap>
  );
};

export default MemberDelete;
