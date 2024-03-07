import { ReactElement } from "react";
import { Ordermain } from "../../pages/order/item/OrderMain";
import OrderAllPage from "../../pages/order/sub/OrderAllPage";
import DpstPage from "../../pages/order/sub/DpstPage";
import PreparingPage from "../../pages/order/sub/PreparingPage";
import ShippingPage from "../../pages/order/sub/ShippingPage";
import DComPage from "../../pages/order/sub/DComPage";
import OrderCancel from "../../pages/order/sub/OrderCancel";
import OrderReturn from "../../pages/order/sub/OrderReturn";
import AdminNote from "../../pages/order/sub/AdminNote";
import { Navigate } from "react-router";
import OrAllHeader from "../../pages/order/item/OrAllHeader";

export interface OrderAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}

const OrderRouter: OrderAdmin = {
  path: "order",
  element: <Ordermain />,
  children: [
    // 주문관리
    { path: "", element: <Navigate to="all" /> },
    { path: "all", element: <OrderAllPage /> },
    // { path: "all", element: <OrAllHeader /> },
    { path: "deposit", element: <DpstPage /> },
    { path: "preparing", element: <PreparingPage /> },
    { path: "shipping", element: <ShippingPage /> },
    { path: "completed", element: <DComPage /> },
    // 취소/반품관리
    { path: "cancel", element: <OrderCancel /> },
    { path: "return", element: <OrderReturn /> },
    // 관리자메모
    { path: "memo", element: <AdminNote /> },
  ],
};
export default OrderRouter;
