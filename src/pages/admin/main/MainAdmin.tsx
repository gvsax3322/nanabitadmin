import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCancelCount,
  getList,
  getOrderStatus,
  getRecentList,
  getShoppingCart,
} from "../../../api/mainApi";
import {
  MyData,
  OrderData,
  OrderStatistics,
  ShoppingCart,
  UserData,
} from "../../../api/model/resturant";
import OrderChart from "../../../components/charts/OrderChart";
import SalesChart from "../../../components/charts/SalesChart";
import {
  BigCard,
  LayoutMain,
  SearchButton,
  SmallCard,
  SubTitle,
} from "../../../styles/AdminBasic";
import { MainBt, MainWrap, OrderList } from "../../../styles/main/main";

const MainAdmin = () => {
  const [recentUsers, setRecentUsers] = useState<UserData[] | string>("");
  const [recentOrders, setRecentOrders] = useState<OrderData[] | string>("");
  const [orderStatus, setOrderStatus] = useState<OrderStatistics[] | string>(
    "",
  );
  const [cancelCount, setCancelCount] = useState<MyData[] | string>("");
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[] | string>("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCancelCount();
        setCancelCount(result);
      } catch (error) {
        alert("데이터 호출에 실패하였습니다.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getShoppingCart();
        setShoppingCart(result);
      } catch (error) {
        alert("데이터 호출에 실패하였습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <MainWrap>
      <LayoutMain>
        <MainBt style={{ justifyContent: "space-between" }}>
          <SubTitle>전체 주문통계</SubTitle>
          <SearchButton onClick={() => handleClickMove("item/all")}>
            주문내역 바로가기
          </SearchButton>
        </MainBt>
        <OrderList style={{ marginBottom: "20px" }}>
          <SmallCard>
            <SalesChart />
          </SmallCard>
          <SmallCard>
            <SalesChart />
          </SmallCard>
          <SmallCard>
            <SalesChart />
          </SmallCard>
        </OrderList>
        <MainBt style={{ justifyContent: "space-between" }}>
          <SubTitle>최근 주문내역</SubTitle>
          <SearchButton onClick={() => handleClickMove("item/inventory")}>
            주문내역 바로가기
          </SearchButton>
        </MainBt>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          {" "}
          <BigCard>
            <OrderChart />
          </BigCard>
          <BigCard>
            <OrderChart />
          </BigCard>
        </div>
      </LayoutMain>
    </MainWrap>
  );
};

export default MainAdmin;
