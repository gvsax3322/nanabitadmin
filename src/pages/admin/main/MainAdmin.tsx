import { useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { getList, getOrderStatus, getRecentList } from "../../../api/mainApi";
import {
  OrderData,
  OrderStatistics,
  UserData,
} from "../../../api/model/resturant";

const MainAdmin = () => {
  const [recentUsers, setRecentUsers] = useState<UserData[] | string>("");
  const [recentOrders, setRecentOrders] = useState<OrderData[] | string>("");
  const [orderStatus, setOrderStatus] = useState<OrderStatistics[] | string>(
    "",
  );
  const navigate = useNavigate();

  const handleClickMove = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getList();
        setRecentUsers(result);
      } catch (error) {
        alert("데이터 호출에 실패하였습니다.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRecentList();
        setRecentOrders(result);
      } catch (error) {
        alert("데이터 호출에 실패하였습니다.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrderStatus();
        setOrderStatus(result);
      } catch (error) {
        alert("데이터 호출에 실패하였습니다.");
      }
    };
    fetchData();
  }, []);

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
