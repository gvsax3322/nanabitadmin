import Select from "../../../components/select/Select";
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

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const OrderAll = () => {
  return (
    <>
      <Wrap>
        <MainTitle>전체 상품관리</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">검색어</div>
            <div className="right">
              <Select />
              <MiddleInput />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">카테고리</div>
            <div className="right">
              <Select />
              <Select />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">기간검색</div>
            <div className="right">
              <Select />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">상품가격</div>
            <div className="right">
              <Select />
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
          <SearchButton style={{ background: " #f44336" }}>
            상품 등록
          </SearchButton>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default OrderAll;
