import {
  BigButton,
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import styled from "@emotion/styled";
import OrderAllSelect from "../../../components/order/orderSlect/OrderAllSelect";
import React, { useEffect, useState } from "react";
import OrPicker from "../../../components/order/orderSlect/OrPicker";
import { Dayjs } from "dayjs";
import {
  getDetailList,
  getMemoList,
  getReturnList,
  putOrderState,
} from "../../../api/order/orderAllApi";

import { ConfigProvider, Pagination, Table } from "antd";
import TestMd from "../../../components/order/TestMd";
import { API_SERVER_HOST } from "../../../util/util";
import { useNavigate } from "react-router";
import { FlexJADiv } from "../../../styles/review/reviewstyle";

// import OrAllFooter from "./footer/OrAllFooter";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

export interface AllOrderData {
  idk: number;
  iorder: number;
  orderedAt: string;
  ordered: string;
  processState: number;
  memo: string;
  totalCount: string;
}

const initState = {
  idk: 0,
  iorder: 0,
  orderedAt: "",
  ordered: "",
  processState: 0,
  memo: "",
  totalCount: 0,
};

interface OrAllHeaderProps {
  fetchData: (data: any) => void;
  tableNum: (selectedRowKeys: React.Key[]) => void;
}
const NoteHeader: React.FC<OrAllHeaderProps> = ({ tableNum }) => {
  const [orderData, setOrderData] = useState([initState]);
  const [periodBt, setPeriodBt] = useState(0); // 선택된 기간 상태 버튼관리
  const [prdOp, setPrdOp] = useState(0);
  const [stateOp, setStateOp] = useState(0); //  주문상태 옵션관리
  const [searchOp, setSearchOp] = useState(0); // 검색어 상태 옵션관리
  const [paymentOp, setPaymentOp] = useState(0); //  결제수단 상태 옵션관리
  const [selectedDate, setSelectedDate] = useState<string[]>([
    // "2024-03-04",
    // "2024-03-04",
  ]); // Date picker 관리

  // const [userSearchActive, setUserSearchActive] = useState(true); // 검색버튼 옵션관리
  const [searchText, setSearchText] = useState(""); //  검색어텍스트 관리

  const [showModal, setShowModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 리스트  출력 순서 정렬
  const [sortBy, setSortBy] = useState(0); // 기본값으로 최신순(0)을 설정

  // 일괄처리 버튼 컨트롤
  const [procesStateBt, setProcesStateBt] = useState(0);

  // 현재 선택된 iOrder 값을 보관하는 state
  const [selectIorder, setSelectIorder] = useState(0);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  // ----------------------------------------------------------------------------

  const dataSource = orderData.map((item, index) => ({
    key: item.iorder, // iorder를 key로 사용
    idk: (currentPage - 1) * 10 + index + 1,
    iorder: item.iorder,
    orderedAt: item.orderedAt,
    ordered: item.ordered,
    processState: item.processState,
    memo: item.memo,
    totalCount: item.totalCount,
    sampleData: [item.iorder],
  }));
  // ----------------------------------------------------------------------------

  // 기간버튼 핸들러
  const handlePeriodBt = (BTIndex: number) => {
    setPeriodBt(BTIndex);
    // 선택된 기간에 따른 동작 수행
    //console.log("선택된 기간:", BTIndex);
  };

  // DATE picker 범위 업데이트
  const handleDateChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => {
    setSelectedDate(dateStrings);
  };

  // 검색어 작성
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 검색어 셀렉함수
  const handleSearchOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        // 주문상태 전체보기에 대한 동작 수행
        setSearchOp(0);
        break;
      case 1:
        // 입금대기에 대한 동작 수행
        setSearchOp(1);
        break;
      case 2:
        // 배송준비중에 대한 동작 수행
        setSearchOp(2);
        break;
      case 3:
        // 배송중에 대한 동작 수행
        setSearchOp(3);
        break;
      case 4:
        // 배송완료에 대한 동작 수행
        setSearchOp(4);
        break;
      case 5:
        // 취소에 대한 동작 수행
        setSearchOp(5);
        break;
      case 6:
        // 반품에 대한 동작 수행
        setSearchOp(6);
        break;
      default:
        break;
    }
    //console.log("검색어", optionIndex);
  };

  // 기간검색 셀렉함수
  const handlePrdOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        setPrdOp(0);
        break;
      case 1:
        setPrdOp(1);
        break;
      case 2:
        setPrdOp(2);
        break;
      case 3:
        setPrdOp(3);
        break;
      case 4:
        setPrdOp(4);
        break;
      case 5:
        setPrdOp(5);
        break;
      case 6:
        setPrdOp(6);
        break;
      default:
        break;
    }
    //console.log("기간검색", optionIndex);
  };
  const handlePaymentOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        setPaymentOp(0);
        break;
      case 1:
        setPaymentOp(2);
        break;
      case 2:
        setPaymentOp(3);
        break;
      default:
        break;
    }
    //console.log("결제수단", handlePaymentOp);
  };

  useEffect(() => {
    //console.log("paymentOp 변경됨", paymentOp);
  }, [paymentOp]);

  // 페이지 변경
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchData(page); // 페이지 번호를 전달하여 fetchData 호출
  };
  // 검색 버튼 클릭시 처리
  const handleClickSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    //console.log("================= 버튼 클릭 ");
    // setUserSearchActive(true);
    fetchData(currentPage);

    // //console.log(
    //   "검색버튼눌렀어융",
    //   periodBt,
    //   searchOp,
    //   prdOp,
    //   paymentOp,
    //   stateOp,
    //   // userSearchActive,
    //   searchText,
    //   selectedDate,
    // );
  };

  const handleSearchreset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setPeriodBt(0);
    setSearchOp(0);
    setPrdOp(0);
    setPaymentOp(0);
    setStateOp(1);
    setSearchText("");
    setSelectedDate([""]);
    setSelectedDate([""]);

    fetchData(currentPage);

    // //console.log(
    //   "초기화버튼눌렀어융",
    //   periodBt,
    //   searchOp,
    //   prdOp,
    //   paymentOp,
    //   stateOp,
    //   // userSearchActive,
    //   searchText,
    //   selectedDate,
    // );
  };

  useEffect(() => {
    //console.log("================= 전체 최초 검색");
    fetchData(currentPage); // 페이지가 처음 렌더링될 때 데이터를 호출합니다.
  }, [currentPage]);
  // 서버연동
  const fetchData = (page: number) => {
    // 검색 버튼 클릭시만 API 날리기
    // if (userSearchActive) {
    // 결과가 오기 전까지는 무효화
    // setUserSearchActive(false);
    getMemoList({
      detailsListParam: {
        // processState: 0,
        searchCategory: searchOp,
        keyword: searchText,
        startDate: selectedDate[0] !== undefined ? selectedDate[0] : "",
        endDate: selectedDate[1] !== undefined ? selectedDate[1] : "",
        dateFl: periodBt,
        payCategory: paymentOp,
        sort: 0,
        page: page,
        // size: 1,
      },
      successFn: successFn_AllOrder,
      failFn: failFn_AllOrder,
      errorFn: errorFn_AllOrder,
    });
    // }
  };

  const successFn_AllOrder = (data: any) => {
    // //console.log("반품신청 successFn : ", data);

    // setUserSearchActive(false);
    setOrderData(data);
  };

  const failFn_AllOrder = (data: any) => {
    // //console.log("failFn : ", data);
    alert("failFn오더all : 데이터 호출에 실패하였습니다.");
  };

  const errorFn_AllOrder = (data: any) => {
    // //console.log("errorFn : ", data);
    alert("오더all!!! 서버상태 불안정 그래서, 데모테스트했음.");
    setOrderData(data);
  };

  // ResultModal을 보여주는 함수
  const handleShowModal = (_iorder: number) => {
    //console.log("받은값 : ", _iorder);
    //console.log("받은값2 : ", handleShowModal);
    // 선택된 제품의 iOrder 값을 기록을 해둠.
    setSelectIorder(_iorder);
    setShowModal(true);
  };

  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //console.log("selectedRowKeys changed이거라: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
    tableNum(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: any[] = [
    {
      title: "No",
      dataIndex: "idk",
      key: "idk",
    },
    {
      title: "주문일시",
      dataIndex: "orderedAt",
      key: "orderedAt",
    },

    {
      title: "주문목록",
      dataIndex: "sampleData",
      key: "sampleData",
      render: (items: any[]) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <SearchButton
              style={{ marginBottom: "12px" }}
              onClick={() => handleShowModal(items[0])}
            >
              주문목록
            </SearchButton>
          </div>
        </div>
      ),
    },
    {
      title: "주문자",
      dataIndex: "ordered",
      key: "ordered",
    },
    {
      title: "처리상태",
      dataIndex: "processState",
      key: "processState",
      render: (processState: number) => (
        <ul>
          <li style={{ marginBottom: "30px", marginTop: "30px" }}>
            {processState === 1 && "입금대기"}
            {processState === 2 && "배송준비중"}
            {processState === 3 && "배송중"}
            {processState === 4 && "배송완료"}
            {processState === 5 && "주문취소"}
          </li>
        </ul>
      ),
    },
    {
      title: "메모",
      dataIndex: "memo",
      key: "memo",
    },
  ];
  const Aaa = styled(Table)`
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
      .ant-table-tbody
      .ant-table-row.ant-table-row-selected
      > .ant-table-cell {
      background-color: ${Common.color.p800};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${Common.color.p600};
      border-color: ${Common.color.p800};
    }
    .ant-checkbox-wrapper-checked:hover .ant-checkbox-inner,
    .ant-checkbox-checked:hover .ant-checkbox-inner {
      border-color: rgba(40, 40, 40, 0.8) !important;
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: #d9d9d9 !important;
    }
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-checkbox-indeterminate
      .ant-checkbox-inner:after {
      background-color: ${Common.color.p800};
    }
    &&& {
      .ant-table-thead > tr > th {
        text-align: center;
      }
      .ant-table-tbody > tr > td {
        text-align: center;
      }
    }
  `;

  return (
    <>
      <Wrap>
        <MainTitle>관리자 메모</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">검색어</div>
            <div className="right">
              <OrderAllSelect
                option1="전체보기"
                option2="주문번호"
                option3="일련번호"
                option4="회원아이디"
                option5="주문자명"
                option6="입금자명"
                option7="수령자명"
                option8="수령자 핸드폰"
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
          <BigKeyword>
            <div className="left">기간검색</div>
            <div className="right">
              <OrderAllSelect
                option1="기간검색"
                option2="입금완료일"
                option3="배송완료일"
                option4="상품취소일"
                option5="상품반품일"
                onClick={handlePrdOp}
              />
              <OrPicker onDateChange={handleDateChange} />
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(0)}
              >
                오늘
              </SmallButton>
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(1)}
              >
                어제
              </SmallButton>
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(2)}
              >
                일주일
              </SmallButton>
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(3)}
              >
                지난달
              </SmallButton>
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(4)}
              >
                1개월
              </SmallButton>
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(5)}
              >
                3개월
              </SmallButton>
              <SmallButton
                style={{ marginRight: "5px", minWidth: "40px" }}
                onClick={() => handlePeriodBt(6)}
              >
                전체
              </SmallButton>
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">결제수단</div>
            <div className="right">
              <OrderAllSelect
                option1="결제수단"
                option2="무통장"
                option3="카드"
                onClick={handlePaymentOp}
              />
            </div>
          </BigKeyword>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <SearchButton onClick={e => handleClickSearch(e)}>검색</SearchButton>
          <SearchButton
            style={{ background: " #f44336" }}
            onClick={e => handleSearchreset(e)}
          >
            초기화
          </SearchButton>
        </div>
      </Wrap>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <SmallButton style={{ marginRight: "5px" }}>
            전체메일 발송
          </SmallButton>
          <SmallButton>엑셀 저장</SmallButton>
        </div>
      </div>
      <div>
        {/* <OrderAllTable
          tableNum={handleClickTableuum}
          serverData={orderData}
          // columns={columns}
          // dataSource={orderData}
        /> */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#a5a5a5",
            },
            components: {
              Table: {
                headerBg: "#535353",
                headerColor: "#fff",
              },
            },
          }}
        >
          <Aaa
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            // dataSource={orderData}
            pagination={false}
          />
          {showModal && (
            <TestMd onClose={handleCloseModal} iOrder={selectIorder} />
          )}
        </ConfigProvider>

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
          <FlexJADiv style={{ marginTop: "20px" }}>
            <Pagination
              style={{ textAlign: "center" }}
              current={currentPage}
              total={Math.ceil(dataSource[0].totalCount / 15)}
              onChange={handlePageChange}
              showSizeChanger={false}
              showTotal={(total, range) => ""}
            />
          </FlexJADiv>
        </ConfigProvider>
      </div>
    </>
  );
};

export default NoteHeader;
