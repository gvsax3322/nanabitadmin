import { DownOutlined } from "@ant-design/icons";
import {
  ConfigProvider,
  Dropdown,
  Menu,
  Pagination,
  Table,
  message,
} from "antd";
import { ChangeEvent, Key, useEffect, useState } from "react";
import { getMemberList } from "../../../api/member/memberApi";
import DatePick from "../../../components/member/DatePick";
import MemberModifyMD from "../../../components/member/modal/MemberModifyMD";
import PostModal from "../../../components/member/modal/PostModal";
import MemberSelect from "../../../components/select/MemberSelect";
import ModifyExcel from "../../../exel/member/ModifyExcel";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
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
  totalCnt: number;
}

const MemberModify = () => {
  // 모달창 관련
  const [messageApi, contextHolder] = message.useMessage();
  const [refresh, setRefresh] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  // 멤버관련
  const [memberList, setMemberList] = useState<MemberList[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberList | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedMembersArr, setSelectedMembersArr] = useState<MemberList[]>(
    [],
  );

  // 검색관련
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchOp, setSearchOp] = useState(1);
  const [phone, setPhone] = useState<string>("");
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // 화원정보 가져오기

  const fetchData = async (page: number) => {
    const pageSize = 10;
    try {
      const successFn = (data: MemberList[] | undefined) => {
        // console.log("데이터:", data);
        if (data !== undefined && data.length > 0) {
          setMemberList(data);
          setTotalPages(Math.ceil(data[0].totalCnt / pageSize) * 10);
        }
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
        page,
        pageSize,
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };
  // 모달 닫기
  const handleModalClose = () => {
    setEditModalVisible(false);
    setPostModalVisible(false);
    setRefresh(refresh + 1);
  };
  // 회원정보수정 모달
  const handleMenuClick1 = (record: MemberList) => {
    setSelectedMember(record);
    // console.log(record);
    setEditModalVisible(true);
  };
  // 메일 보내기 모달
  const handleMenuClick2 = (record: MemberList) => {
    setSelectedMember(record);
    // console.log(record);
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
    // console.log("검색어", optionIndex);
  };
  // 검색버튼
  const handleClickSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSearchText("");
    setPhone("");
    try {
      await fetchData(currentPage);
      setSearchText("");
      setPhone("");
      const successFn = (data: MemberList[] | undefined) => {
        // console.log("데이터:", data);
        if (data !== undefined && data.length > 0) {
          setMemberList(data);
          successAl("검색성공");
        } else {
          errorAl("검색 결과가 없습니다.");
        }
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
      console.error("검색 오류:", error);
      errorAl("검색실패");
      return;
    }
    if ((memberList.length = 0)) {
      successAl("검색성공");
      // console.error("에러:", error);
    }
  };
  // 초기화 버튼
  const ResetData = async () => {
    try {
      const successFn = (data: MemberList[]) => {
        // console.log("데이터:", data);
        setMemberList(data);
        successAl("초기화 성공");
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
        errorAl("초기화 실패");
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
        errorAl("초기화 실패");
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
  // 페이지 변경
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };
  // 날짜 자르기
  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10);
  };
  // 테이블 전체선택
  const onSelectChange = (
    selectedRowKeys: React.Key[],
    selectedRows: MemberList[],
  ) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedMembersArr(selectedRows);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [refresh]);

  const columns = [
    {
      title: "번호",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (text: string, record: MemberList, index: number) => {
        const pageSize = 10;
        const pageNumber = currentPage - 1;
        const startIndex = pageNumber * pageSize;
        return startIndex + index + 1;
      },
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

  // 알람 관련
  const successAl = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };

  const errorAl = (txt: string) => {
    messageApi.open({
      type: "error",
      content: txt,
    });
  };
  return (
    <ModifyWrap>
      {contextHolder}
      <MainTitle>회원 정보관리</MainTitle>
      <SubTitle>기본검색</SubTitle>
      <ModifyInfo>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
          }}
        >
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
        <BigKeyword style={{ borderTop: "none" }}>
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
        <BigKeyword style={{ borderTop: "none" }}>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SubTitle style={{ textAlign: "center", lineHeight: "15px" }}>
          총 회원 :{" "}
          <span style={{ color: "rgb(244, 67, 54)" }}>
            {memberList[0] ? memberList[0].totalCnt : "0"}
          </span>{" "}
          명
        </SubTitle>
      </div>
      <BtList>
        <div>
          <ModifyExcel exceldata={selectedMembersArr} />
        </div>
      </BtList>
      <ListWrap>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#A5A5A5",
            },
            components: {
              Table: {
                headerBg: "#535353",
                headerColor: "#fff",
              },
            },
          }}
        >
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            columns={columns}
            dataSource={
              memberList &&
              memberList.map(member => ({
                ...member,
                key: member.iuser,
              }))
            }
            pagination={false}
            locale={{ emptyText: "데이터가 없습니다." }}
            bordered
          />
        </ConfigProvider>
      </ListWrap>
      <Pagination
        style={{ textAlign: "center" }}
        current={currentPage}
        total={totalPages}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
      {editModalVisible && (
        <MemberModifyMD
          selectedMember={selectedMember}
          onClose={handleModalClose}
          successAl={successAl}
          errorAl={errorAl}
        ></MemberModifyMD>
      )}
      {postModalVisible && (
        <PostModal
          selectedMember={selectedMember}
          onClose={handleModalClose}
          successAl={successAl}
          errorAl={errorAl}
        ></PostModal>
      )}
    </ModifyWrap>
  );
};

export default MemberModify;
