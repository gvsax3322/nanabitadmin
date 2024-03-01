import { useNavigate } from "react-router-dom";
import MemberTable from "../../../components/common/MemberTable";
import OrderChartCom from "../../../components/common/OrderChartCom";
import SalesChartCom from "../../../components/common/SalesChartCom";
import YCancel from "../../../components/common/YCancel";
import {
  BigCard,
  LayoutMain,
  SmallCard,
  SubTitle,
} from "../../../styles/AdminBasic";
import { MainBt, MainWrap, OrderList } from "../../../styles/main/main";
import Yretrun from "../../../components/common/Yretrun";

const MainAdmin = () => {
  // const [recentUsers, setRecentUsers] = useState<UserData[] | string>("");
  // const [recentOrders, setRecentOrders] = useState<OrderData[] | string>("");
  // const [orderStatus, setOrderStatus] = useState<OrderStatistics[] | string>(
  //   "",
  // );
  // const [cancelCount, setCancelCount] = useState<MyData[] | string>("");
  // const [shoppingCart, setShoppingCart] = useState<ShoppingCart[] | string>("");
  const navigate = useNavigate();

  const handleClickMove = (path: string) => {
    navigate(path);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [
  //         recentUsersResult,
  //         recentOrdersResult,
  //         orderStatusResult,
  //         cancelCountResult,
  //         shoppingCartResult,
  //       ] = await Promise.all([
  //         getList(),
  //         getRecentList(),
  //         getOrderStatus(),
  //         getCancelCount(),
  //         getShoppingCart(),
  //       ]);

  //       setRecentUsers(recentUsersResult);
  //       setRecentOrders(recentOrdersResult);
  //       setOrderStatus(orderStatusResult);
  //       setCancelCount(cancelCountResult);
  //       setShoppingCart(shoppingCartResult);
  //     } catch (error) {
  //       alert("데이터 호출에 실패하였습니다.");
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <MainWrap>
      <LayoutMain>
        <MainBt style={{ justifyContent: "space-between" }}></MainBt>
        <OrderList style={{ marginBottom: "20px" }}>
          <SmallCard
            onClick={() => handleClickMove("member/daily")}
            style={{ cursor: "pointer" }}
          >
            <SubTitle>최근 가입통계</SubTitle>
            <MemberTable />
          </SmallCard>
          <SmallCard
            onClick={() => handleClickMove("order/cancel")}
            style={{ cursor: "pointer" }}
          >
            <SubTitle>주문 취소통계</SubTitle>
            {/* <SalesChart /> */}
            <YCancel />
          </SmallCard>
          <SmallCard
            onClick={() => handleClickMove("order/return")}
            style={{ cursor: "pointer" }}
          >
            <SubTitle>주문 반품통계</SubTitle>
            {/* <SalesChart /> */}
            <Yretrun />
          </SmallCard>
        </OrderList>
        <MainBt style={{ justifyContent: "space-between" }}></MainBt>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          {" "}
          <BigCard
            onClick={() => handleClickMove("charts/dsales")}
            style={{ cursor: "pointer" }}
          >
            <SubTitle>최근 매출통계</SubTitle>
            <SalesChartCom />
          </BigCard>
          <BigCard
            onClick={() => handleClickMove("charts/dorder")}
            style={{ cursor: "pointer" }}
          >
            <SubTitle>최근 주문내역</SubTitle>
            <OrderChartCom />
          </BigCard>
        </div>
      </LayoutMain>
    </MainWrap>
  );
};

export default MainAdmin;
