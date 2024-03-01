import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Table } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { getMemberList } from "../../../api/member/memberApi";
import DatePick from "../../../components/member/DatePick";
import MemberModifyMD from "../../../components/member/modal/MemberModifyMD";
import PostModal from "../../../components/member/modal/PostModal";
import MemberSelect from "../../../components/select/MemberSelect";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import {
  BtList,
  ListWrap,
  ModifyButton,
  ModifyInfo,
  ModifyWrap,
} from "../../../styles/member/memberstyle";

export interface MemberApiResponse {
  code: string;
  message: string;
  data: MemberList[];
}

export interface MemberList {
  iuser: number;
  nm: string;
  email: string;
  phoneNumber: string;
  registeredAt: string;
}

const MemberModify = () => {
  // 모달창 관련
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  // 멤버관련
  const [selectedMember, setSelectedMember] = useState<MemberList | null>(null);
  const [memberList, setMemberList] = useState<MemberList[]>([]);
  // 검색관련
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchOp, setSearchOp] = useState(1);
  const [phone, setPhone] = useState<string>("");
  // 화원정보 가져오기
  const fetchData = async () => {
    try {
      const successFn = (data: MemberList[]) => {
        console.log("데이터:", data);
        setMemberList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await getMemberList(
        successFn,
        failFn,
        errorFn,
        searchText,
        searchOp,
        startDate,
        endDate,
        phone,
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // 모달 닫기
  const handleModalClose = () => {
    setEditModalVisible(false);
    setPostModalVisible(false);
  };
  // 회원정보수정 모달
  const handleMenuClick1 = (record: MemberList) => {
    setSelectedMember(record);
    console.log(record);
    setEditModalVisible(true);
  };
  // 메일 보내기 모달
  const handleMenuClick2 = (record: MemberList) => {
    setSelectedMember(record);
    console.log(record);
    setPostModalVisible(true);
  };
  // 옵션 선택
  const handleSearchOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        setSearchOp(1);
        break;
      case 1:
        setSearchOp(2);
        break;
    }
    console.log("검색어", optionIndex);
  };
  // 검색버튼
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
  // 초기화 버튼
  const ResetData = async () => {
    try {
      const successFn = (data: MemberList[]) => {
        console.log("데이터:", data);
        setMemberList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await getMemberList(successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  // 날짜 변경
  const handleDateChange = (dateRange: string[]) => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10);
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (text: string, record: MemberList, index: number) => index + 1,
    },
    {
      title: "회원명",
      dataIndex: "nm",
      key: "nm",
      width: "15%",
      render: (text: string, record: MemberList) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleMenuClick1(record)}>
                회원정보수정
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleMenuClick2(record)}>
                메일 보내기
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {text} <DownOutlined />
          </span>
        </Dropdown>
      ),
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
      title: "가입일",
      dataIndex: "registeredAt",
      key: "registeredAt",
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
            <MemberSelect
              option1={"이메일"}
              option2={"이름"}
              onClick={handleSearchOp}
            />
            <MiddleInput
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={searchText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
            />
          </div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">기간검색</div>
          <div className="right" style={{ gap: "5x" }}>
            <DatePick
              onChange={handleDateChange}
              value={
                startDate && endDate
                  ? [startDate, endDate]
                  : [undefined, undefined]
              }
            />
          </div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">전화번호</div>
          <div className="right">
            <MiddleInput
              type="text"
              placeholder="전화번호를 입력하세요"
              autoFocus
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
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
      <BtList>
        <div>
          <SmallButton>엑셀 저장</SmallButton>
        </div>
      </BtList>
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
      {editModalVisible && (
        <MemberModifyMD
          selectedMember={selectedMember}
          onClose={handleModalClose}
        ></MemberModifyMD>
      )}
      {postModalVisible && (
        <PostModal
          selectedMember={selectedMember}
          onClose={handleModalClose}
        ></PostModal>
      )}
    </ModifyWrap>
  );
};

export default MemberModify;
