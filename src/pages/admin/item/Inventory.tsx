import styled from "@emotion/styled";
import OrderAllSelect from "../../../components/order/orderSlect/OrderAllSelect";
import OrderPicker from "../../../components/order/orderSlect/OrderPicker";
import ItemTable from "../../../components/table/ItemTable";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SmallInput,
  SubTitle,
} from "../../../styles/AdminBasic";
import ResultModal from "../../../components/common/Modal";
import { useState } from "react";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const Inventory = () => {
  // ResultModal을 표시할지 여부를 결정하는 상태
  const [showModal, setShowModal] = useState(false);
  const [dataFromChild, setDataFromChild] = useState("");

  // ResultModal을 보여주는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  const handleClcikRemove = () => {
    //console.log(dataFromChild);
  };
  return (
    <>
      <Wrap>
        <MainTitle>상품 재고관리</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">검색어</div>
            <div className="right">
              <OrderAllSelect
                option1="주문번호"
                option2="일련번호"
                option3="회원아이디"
                option4="주문자명"
                option5="입금자명"
                option6="수령자명"
                option7="수령자 핸드폰"
              />
              <MiddleInput />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">카테고리</div>
            <div className="right">
              <OrderAllSelect
                option1="기간검색"
                option2="입금완료일"
                option3="배송완료일"
                option4="상품취소일"
                option5="상품반품일"
              />
              <OrderAllSelect
                option1="기간검색"
                option2="입금완료일"
                option3="배송완료일"
                option4="상품취소일"
                option5="상품반품일"
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
              />
              <OrderPicker />
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                오늘
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                어제
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                일주일
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                지난달
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                1개월
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                3개월
              </SmallButton>
              <SmallButton style={{ marginRight: "5px", minWidth: "40px" }}>
                전체
              </SmallButton>
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">상품가격</div>
            <div className="right">
              <OrderAllSelect
                option1="기간검색"
                option2="입금완료일"
                option3="배송완료일"
                option4="상품취소일"
                option5="상품반품일"
              />{" "}
              <SmallInput />원 이상~
              <SmallInput />원 이하
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
          <SearchButton>검색</SearchButton>
          <SearchButton style={{ background: " #f44336" }}>초기화</SearchButton>
        </div>
        <SubTitle>재고 설정</SubTitle>
        <BigKeyword
          style={{
            borderTop: `2px solid ${Common.color.primary}`,
            marginBottom: "20px",
          }}
        >
          <div className="left">일괄</div>
          <div className="right">
            <div style={{ marginRight: "10px" }}>재고수량 :</div>
            <MiddleInput />
            <SmallButton style={{ marginRight: "5px", height: "25px" }}>
              적용하기
            </SmallButton>
          </div>
        </BigKeyword>
      </Wrap>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <SmallButton style={{ marginRight: "5px" }}>선택 삭제</SmallButton>
          <SmallButton>엑셀 저장</SmallButton>
        </div>
        <div>
          <SearchButton
            style={{ background: " #f44336" }}
            onClick={handleShowModal}
          >
            상품 등록
          </SearchButton>
        </div>
      </div>
      <div>
        {/* <ItemTable tableNum={handleClickTableuum} /> */}
        {/* {showModal && <ResultModal onClose={handleCloseModal} />} */}
      </div>
    </>
  );
};

export default Inventory;
