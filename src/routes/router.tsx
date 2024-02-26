import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminBasic from "../layouts/AdminBasic";
import { ItemMain } from "../pages/admin/item/ItemMain";
import LoginPage from "../pages/admin/login/LoginPage";
import MainAdmin from "../pages/admin/main/MainAdmin";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { Ordermain } from "../pages/order/item/OrderMain";
import AdminNote from "../pages/order/sub/AdminNote";

import DpstPage from "../pages/order/sub/DpstPage";
import PreparingPage from "../pages/order/sub/PreparingPage";

import OrderCancel from "../pages/order/sub/OrderCancel";
import OrderReturn from "../pages/order/sub/OrderReturn";

import MemberMain from "../pages/admin/member/MemberMain";
import ChartsPage from "../pages/charts/ChartsPage";
import OrderAllPage from "../pages/order/sub/OrderAllPage";
import UsermainManage from "../pages/usermainmanage/UsermainManage";
import ChartsRouter from "./charts/ChartsRouter";
import MemberRouter from "./member/MemberRouter";
import productAdmin from "./product";
import UsermainRouter from "./usermainmanage/usermainrouter";

import useCustomLogin from "../hooks/useCustomLogin";
import CommunPage from "../pages/ community/ CommunPage";
import DComPage from "../pages/order/sub/DComPage";
import ShippingPage from "../pages/order/sub/ShippingPage";

const RouteComponent = () => {
  const { isLogin } = useCustomLogin();
  if (isLogin) {
    return <Navigate to="/admin" />;
  }

  return <LoginPage />;
};
export const routerAdmin = createBrowserRouter([
  {
    path: "",
    element: <RouteComponent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminBasic />,
    children: [
      {
        index: true,
        element: <MainAdmin />,
      },
      {
        path: "item",
        element: <ItemMain />,
        children: productAdmin.children,
      },
      {
        path: "member/",
        element: <MemberMain />,
        children: MemberRouter.children,
      },
      {
        path: "order",
        element: <Ordermain />,
        children: [
          // 주문관리
          { path: "", element: <Navigate to="all" /> },
          { path: "all", element: <OrderAllPage /> },
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
      },
      {
        path: "usermain/",
        element: <UsermainManage />,
        children: UsermainRouter.children,
      },
      {
        path: "charts/",
        element: <ChartsPage />,
        children: ChartsRouter.children,
      },
      {
        path: "community",
        element: <CommunPage />,
      },
    ], // 여기에 닫는 중괄호 추가
  }, // 여기에도 닫는 중괄호 추가
]);
