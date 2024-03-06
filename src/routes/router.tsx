import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminBasic from "../layouts/AdminBasic";
import { ItemMain } from "../pages/admin/item/ItemMain";
import LoginPage from "../pages/admin/login/LoginPage";
import MainAdmin from "../pages/admin/main/MainAdmin";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { Ordermain } from "../pages/order/item/OrderMain";

import useCustomLogin from "../hooks/useCustomLogin";
import TestPage from "../pages/TestPage";
import MemberMain from "../pages/admin/member/MemberMain";
import ChartsPage from "../pages/charts/ChartsPage";
import CommunPage from "../pages/community/CommunPage";

import ReviewManage from "../pages/review/ReviewManage";
import UsermainManage from "../pages/usermainmanage/UsermainManage";
import ChartsRouter from "./charts/ChartsRouter";
import MemberRouter from "./member/MemberRouter";
import productAdmin from "./product";
import ReviewRouter from "./review/reviewrouter";
import UsermainRouter from "./usermainmanage/usermainrouter";
import OrderRouter from "./order/OrderRouter";
import { Categorymain } from "../pages/category/Categorymain";
import CateRouter from "./category/CateRouter";

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
        path: "category/",
        element: <Categorymain />,
        children: CateRouter.children,
      },
      {
        path: "order/",
        element: <Ordermain />,
        children: OrderRouter.children,
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
        path: "review/",
        element: <ReviewManage />,
        children: ReviewRouter.children,
      },
      {
        path: "community",
        element: <CommunPage />,
      },
    ], // 여기에 닫는 중괄호 추가
  }, // 여기에도 닫는 중괄호 추가
]);
