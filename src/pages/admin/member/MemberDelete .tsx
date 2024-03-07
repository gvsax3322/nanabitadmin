import { DownOutlined } from "@ant-design/icons";
import {
  ConfigProvider,
  Dropdown,
  Menu,
  Pagination,
  Table,
  message,
} from "antd";
import { ChangeEvent, Key, useEffect, useMemo, useState } from "react";
import { deleteMember, getExMemberList } from "../../../api/member/memberApi";
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
  BtList,
  ListWrap,
  ModifyButton,
  ModifyInfo,
  ModifyWrap,
} from "../../../styles/member/memberstyle";
import DeleteExcel from "../../../exel/member/DeleteExcel";
import DatePick from "../../../components/member/DatePick";
export interface ExMemberList {
  iuser: number;
  nm: string;
  email: string;
  phoneNumber: string;
  unregisteredAt?: string;
  totalCnt: number;
}
const MemberDelete = () => {
  // 멤버관련
  const [memberList, setMemberList] = useState<ExMemberList[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedMembersArr, setSelectedMembersArr] = useState<ExMemberList[]>(
    [],
  );
  //검색관련
  const [searchText, setSearchText] = useState<string>("");
  const [searchOp, setSearchOp] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  // 알람관련
  const [messageApi, contextHolder] = message.useMessage();
  const [refresh, setRefresh] = useState(0);
  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // 전회원 가져오기
  const fetchData = async (page: number) => {
    const pageSize = 10;
    try {
      const successFn = (data: ExMemberList[] | undefined) => {
        // console.log("데이터:", data);
        if (data !== undefined && data.length > 0) {
          setMemberList(data);
          setTotalPages(Math.ceil(data[0].totalCnt / pageSize) * 10);
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
      await getExMemberList(
        successFn,
        failFn,
        errorFn,
        searchText,
        searchOp,
        startDate,
        endDate,
        page,
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };
  // 초기화하기
  const ResetData = async () => {
    try {
      const successFn = (data: ExMemberList[]) => {
        // console.log("데이터:", data);
        setMemberList(data);
        setSearchText("");
        successAl("초기화 완료");
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
        errorAl("초기화 실패");
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
        errorAl("초기화 실패");
      };
      await getExMemberList(successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  // 날짜 자르기
  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10);
  };
  // 회원 복원
  const handleClickrestore = async (record: ExMemberList) => {
    try {
      const successFn = (data: any) => {
        // console.log("데이터:", data);
        successAl("유저를 복구했습니다");
        setRefresh(refresh + 1);
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
        errorAl("복구에 실패하였습니다");
        setRefresh(refresh + 1);
      };
      await deleteMember(successFn, failFn, errorFn, record.iuser);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  // 페이지 변경
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };
  // 날짜 변경
  const handleDateChange = (dateRange: string[]) => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };
  // 전체 회원선택
  const onSelectChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ExMemberList[],
  ) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedMembersArr(selectedRows);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [refresh]);
  // 성공 알람
  const successAl = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };
  // 실패알람
  const errorAl = (txt: string) => {
    messageApi.open({
      type: "error",
      content: txt,
    });
  };
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
    try {
      setSearchText("");
      const successFn = (data: ExMemberList[] | undefined) => {
        // console.log("데이터:", data);
        if (data !== undefined && data.length > 0) {
          setMemberList(data);
          successAl("검색성공");
        } else {
          errorAl("검색 결과가 없습니다");
        }
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getExMemberList(
        successFn,
        failFn,
        errorFn,
        searchText,
        searchOp,
        startDate,
        endDate,
      );
    } catch (error) {
      console.error("에러:", error);
      errorAl("검색실패");
      errorAl("검색 결과가 없습니다.");
      return;
    }
  };
  // const handleClickSearch = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   e.preventDefault();
  //   try {
  //     await fetchData(currentPage);
  //     setSearchText("");
  //   } catch (error) {
  //     console.error("검색 오류:", error);
  //     errorAl("검색실패");
  //     return;
  //   }
  // };
  const columns = [
    {
      title: "번호",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (text: string, record: ExMemberList, index: number) => {
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
      render: (text: string, record: ExMemberList) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleClickrestore(record)}>
                아이디 복구
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
      title: "탈퇴일",
      dataIndex: "unregisteredAt",
      key: "unregisteredAt",
      render: (text: string) => formatDate(text),
    },
  ];
  return (
    <ModifyWrap>
      {contextHolder}
      <MainTitle>회원 탈퇴내역</MainTitle>
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
              value={searchText}
              onChange={handleInputChange}
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
      </ModifyInfo>
      <ModifyButton>
        <SearchButton onClick={handleClickSearch}>검색</SearchButton>
        <SearchButton style={{ background: " #F44336" }} onClick={ResetData}>
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
            {memberList[0] ? memberList[0].totalCnt : ""}
          </span>{" "}
          명
        </SubTitle>
      </div>
      <BtList>
        <DeleteExcel exceldata={selectedMembersArr} />
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
    </ModifyWrap>
  );
};
export default MemberDelete;