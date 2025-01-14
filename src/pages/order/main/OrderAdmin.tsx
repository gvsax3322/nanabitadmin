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
            <MainTable />
          </SmallCard>
          <SmallCard>
            <MainTable />
          </SmallCard>
          <SmallCard>
            <MainTable />
          </SmallCard>
        </OrderList>
        <SubTitle>최근 주문내역</SubTitle>
        <MainBt>
          <SearchButton>주문내역 바로가기</SearchButton>
        </MainBt>
        <BigCard>
          <MainTable />
        </BigCard>
        <SubTitle>최근 회원가입</SubTitle>
        <MainBt>
          <SearchButton>회원관리 바로가기</SearchButton>
        </MainBt>
        <BigCard>
          <MainTable />
        </BigCard>
      </LayoutMain>
    </MainWrap>
  );
};

export default MainAdmin;
