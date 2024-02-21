import { useNavigate } from "react-router-dom"; // react-router-dom에서 가져옴
import BuyTable from "../../../components/main/BuyTable";
import MainTable from "../../../components/main/MainTable";
import RecentlyTable from "../../../components/main/RecentlyTable";
import SecondTable from "../../../components/main/SecondTable";
import SignTable from "../../../components/main/SignTable";
import {
  BigCard,
  LayoutMain,
  SearchButton,
  SmallCard,
  SubTitle,
} from "../../../styles/AdminBasic";
import { MainBt, MainWrap, OrderList } from "../../../styles/main/main";

// 여기서 const navigate = useNavigate();는 사용할 수 없음

const MainAdmin = () => {
  const navigate = useNavigate(); // 이 위치에서 useNavigate를 사용하거나 handleClickMove 함수 안에서 사용
  const handleClickMove = (a: string) => {
    // 클릭 핸들러 내에서 navigate 사용
    navigate(`${a}`); // 이동하길 원하는 경로로 수정
  };

  return (
    <MainWrap>
      <LayoutMain>
        <SubTitle>전체 주문통계</SubTitle>
        <MainBt>
          <SearchButton onClick={() => handleClickMove("item/all")}>
            주문내역 바로가기
          </SearchButton>
        </MainBt>
        <OrderList>
          <SmallCard>
            <MainTable />
          </SmallCard>
          <SmallCard>
            <SecondTable />
          </SmallCard>
          <SmallCard>
            <BuyTable />
          </SmallCard>
        </OrderList>
        <SubTitle>최근 주문내역</SubTitle>
        <MainBt>
          <SearchButton onClick={() => handleClickMove("item/inventory")}>
            주문내역 바로가기
          </SearchButton>
        </MainBt>
        <BigCard>
          <RecentlyTable />
        </BigCard>
        <SubTitle>최근 회원가입</SubTitle>
        <MainBt>
          <SearchButton onClick={() => handleClickMove("item/qa")}>
            회원관리 바로가기
          </SearchButton>
        </MainBt>
        <BigCard>
          <SignTable />
        </BigCard>
      </LayoutMain>
    </MainWrap>
  );
};

export default MainAdmin;
