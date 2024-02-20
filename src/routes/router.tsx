import { Navigate, createBrowserRouter } from "react-router-dom";
import MainBanner from "../components/usermainmanage/MainBanner";
import MdRecommend from "../components/usermainmanage/MdRecommend";
import NewProduct from "../components/usermainmanage/NewProduct";
import PopProduct from "../components/usermainmanage/PopProduct";
import AdminBasic from "../layouts/AdminBasic";
import A from "../pages/admin/comm/A";
import B from "../pages/admin/comm/B";
import C from "../pages/admin/comm/C";
import { ItemMain } from "../pages/admin/item/ItemMain";
import LoginPage from "../pages/admin/login/LoginPage";
import MainAdmin from "../pages/admin/main/MainAdmin";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Member from "../pages/members/Member";
import { Ordermain } from "../pages/order/item/OrderMain";
import AdminNote from "../pages/order/sub/AdminNote";
import All from "../pages/order/sub/All";
import DCom from "../pages/order/sub/DCom";
import Dpst from "../pages/order/sub/Dpst";
import OrderCancel from "../pages/order/sub/OrderCancel";
import OrderReturn from "../pages/order/sub/OrderReturn";
import Preparing from "../pages/order/sub/Preparing";
import Shipping from "../pages/order/sub/Shipping";
import UsermainManage from "../pages/usermainmanage/UsermainManage";

import MemberRouter from "./member/MemberRouter";
import productAdmin from "./product";
import MemberMain from "../pages/admin/member/MemberMain";

export const routerAdmin = createBrowserRouter([
  { path: "", element: <Navigate to="/admin" />, errorElement: <ErrorPage /> },
  {
    path: "/admin",
    element: <AdminBasic />,
    children: [
      {
        index: true,
        element: <MainAdmin />,
      },
      {
        path: "login",
        element: <LoginPage />,
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
        path: "members",
        element: <Member />,
        children: [
          { path: "a", element: <A /> },
          { path: "b", element: <B /> },
          { path: "c", element: <C /> },
        ],
      },
      {
        path: "order",
        element: <Ordermain />,
        children: [
          { path: "a", element: <A /> },
          // 주문관리
          { path: "all", element: <All /> },
          { path: "deposit", element: <Dpst /> },
          { path: "preparing", element: <Preparing /> },
          { path: "shipping", element: <Shipping /> },
          { path: "completed", element: <DCom /> },
          // 취소/반품관리
          { path: "cancel", element: <OrderCancel /> },
          { path: "return", element: <OrderReturn /> },
          // 관리자메모
          { path: "memo", element: <AdminNote /> },
        ],
      },
      {
        path: "usermain",
        element: <UsermainManage />,
        children: [
          { path: "banner", element: <MainBanner /> },
          { path: "md", element: <MdRecommend /> },
          { path: "popular", element: <PopProduct /> },
          { path: "new", element: <NewProduct /> },
        ],
      },
    ], // 여기에 닫는 중괄호 추가
  }, // 여기에도 닫는 중괄호 추가
]);
