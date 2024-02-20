import MainTable from "../../../components/main/MainTable";
import {
  BigCard,
  LayoutMain,
  SearchButton,
  SmallCard,
  SubTitle,
} from "../../../styles/AdminBasic";
import { MainBt, MainWrap, OrderList } from "../../../styles/main/main";

const MainAdmin = () => {
  return (
    <MainWrap>
      <LayoutMain>
        <SubTitle>전체 주문통계</SubTitle>
        <MainBt>
          <SearchButton>주문내역 바로가기</SearchButton>
        </MainBt>
        <OrderList>
          <SmallCard>
            <MainTable title={"전체 주문현황"} />
          </SmallCard>
          <SmallCard>
            <MainTable title={"주문상태 현황"} />
          </SmallCard>
          <SmallCard>
            <MainTable title={"구매확정/클래임 현황"} />
          </SmallCard>
        </OrderList>
        <SubTitle>최근 주문내역</SubTitle>
        <MainBt>
          <SearchButton>주문내역 바로가기</SearchButton>
        </MainBt>
        <BigCard>
          <MainTable title={"최근 주문내역"} />
        </BigCard>
        <SubTitle>최근 회원가입</SubTitle>
        <MainBt>
          <SearchButton>회원관리 바로가기</SearchButton>
        </MainBt>
        <BigCard>
          <MainTable title={"최근 회원가입"} />
        </BigCard>
      </LayoutMain>
    </MainWrap>
  );
};

export default MainAdmin;
