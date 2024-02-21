import styled from "@emotion/styled";
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

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const Qa = () => {
  return (
    <>
      <Wrap>
        <MainTitle>상품 문의/후기</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            marginBottom: "20px",
          }}
        >
          <div className="left">검색어</div>
          <div className="right">
            <Select optionone={"상품명"} />
            <Select optionone={"상품명"} />
            <MiddleInput />
          </div>
        </BigKeyword>
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
      <div>
        <SmallButton style={{ marginRight: "5px" }}>선택 삭제</SmallButton>
      </div>
    </>
  );
};

export default Qa;
