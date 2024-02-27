import {
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
import { useState } from "react";
import OrPicker from "../../../components/order/orderSlect/OrPicker";
import { Dayjs } from "dayjs";
import { getOrderAll } from "../../../api/order/orderAllApi";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const initState = {
  iorder: "",
  orderedAt: "2024-06-13T14:31:23",
  products: [
    {
      repPic: "",
      productNm: "led보온분유",
      cnt: 6,
      processState: 1,
      amount: 29900,
      refundFl: 0,
    },
  ],
  ordered: "이강인",
  recipient: "이강인",
  totalAmount: 357200,
  payCategory: 2,
  refundFl: 0,
};

interface OrAllHeaderProps {}
const OrAllHeader: React.FC<OrAllHeaderProps> = () => {
  const [orderData, setOrderData] = useState([initState]);
  const [periodBt, setPeriodBt] = useState(0); // 선택된 기간 상태 버튼관리
  const [prdOp, setPrdOp] = useState(0);
  const [stateOp, setStateOp] = useState(0); //  주문상태 옵션관리
  const [searchOp, setSearchOp] = useState(0); // 검색어 상태 옵션관리
  const [paymentOp, setPaymentOp] = useState(0); //  결제수단 상태 옵션관리
  const [selectedDate, setSelectedDate] = useState<string[]>([]); // Date picker 관리
  const [userSearchActive, setUserSearchActive] = useState(false); // 검색버튼 옵션관리
  const [searchText, setSearchText] = useState(""); //  검색어텍스트 관리

  // 기간버튼 핸들러
  const handlePeriodBt = (BTIndex: number) => {
    setPeriodBt(BTIndex);
    // 선택된 기간에 따른 동작 수행
    console.log("선택된 기간:", BTIndex);
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
    console.log("기간검색", optionIndex);
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
    console.log("검색어", optionIndex);
  };
  // 주문상태 셀렉함수
  const handleStateOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        setStateOp(0);
        break;
      case 1:
        setStateOp(1);
        break;
      case 2:
        setStateOp(2);
        break;
      case 3:
        setStateOp(3);
        break;
      case 4:
        setStateOp(4);
        break;
      case 5:
        setStateOp(5);
        break;
      case 6:
        setStateOp(6);
        break;
      default:
        break;
    }
    console.log("주문상태", optionIndex);
  };

  // 결제수단 셀렉함수
  const handlePaymentOp = (optionIndex: number): void => {
    switch (optionIndex) {
      case 0:
        setPaymentOp(0);
        break;
      case 1:
        setPaymentOp(1);
        break;
      case 2:
        setPaymentOp(2);
        break;
      default:
        break;
    }
    console.log("결제수단", optionIndex);
  };
  // 검색 버튼 클릭시 처리
  const handleClickSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    // setPeriodBt(0);
    // setSearchOp(0);
    // setPrdOp(0);
    // setPaymentOp(0);
    // setStateOp(0);
    // 사용자는 검색을 했다.
    setUserSearchActive(true);
    fetchData();
    console.log(
      "검색버튼눌렀어융",
      periodBt,
      searchOp,
      prdOp,
      paymentOp,
      stateOp,
      userSearchActive,
      searchText,
      selectedDate,
    );
  };

  const handleSearchreset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setPeriodBt(0);
    setSearchOp(0);
    setPrdOp(0);
    setPaymentOp(0);
    setStateOp(0);
    setSearchText("");
    setSelectedDate([""]);
    setSelectedDate([""]);

    // 사용자는 검색을 했다.
    setUserSearchActive(true);
    fetchData();

    console.log(
      "초기화버튼눌렀어융",
      periodBt,
      searchOp,
      prdOp,
      paymentOp,
      stateOp,
      userSearchActive,
      searchText,
      selectedDate,
    );
  };

  // 서버연동
  const fetchData = () => {
    // 검색 버튼 클릭시만 API 날리기
    if (userSearchActive) {
      // 결과가 오기 전까지는 무효화
      setUserSearchActive(false);
      getOrderAll({
        orderParam: {
          processState: stateOp,
          dateCategory: prdOp,
          searchCategory: searchOp,
          keyword: searchText,
          startDate: selectedDate[0],
          endDate: selectedDate[1] !== undefined ? selectedDate[1] : "",
          dateFl: periodBt,
          payCategory: paymentOp,
          sort: 0,
        },
        successFn: successFn_AllOrder,
        failFn: failFn_AllOrder,
        errorFn: errorFn_AllOrder,
      });
    }
  };

  const successFn_AllOrder = (data: any) => {
    // console.log("반품신청 successFn : ", data);

    setUserSearchActive(false);
    setOrderData(data);
  };

  const failFn_AllOrder = (data: any) => {
    // console.log("failFn : ", data);
    alert("failFn오더all : 데이터 호출에 실패하였습니다.");
  };

  const errorFn_AllOrder = (data: any) => {
    // console.log("errorFn : ", data);
    alert("오더all!!! 서버상태 불안정 그래서, 데모테스트했음.");
    setOrderData(data);
  };

  return (
    <>
      <Wrap>
        <MainTitle>배송준비중</MainTitle>
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
              <OrderAllSelect
                option1="주문상태"
                option2="입금대기"
                option3="배송준비중"
                option4="배송중"
                option5="배송완료"
                onClick={handleStateOp}
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
      <div></div>
    </>
  );
};

export default OrAllHeader;
