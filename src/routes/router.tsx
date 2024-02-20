import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminBasic from "../layouts/AdminBasic";
import A from "../pages/admin/comm/A";
import B from "../pages/admin/comm/B";
import C from "../pages/admin/comm/C";
import ItemAll from "../pages/admin/item/ItemAll";
import { ItemMain } from "../pages/admin/item/ItemMain";
import LoginPage from "../pages/admin/login/LoginPage";
import MainAdmin from "../pages/admin/main/MainAdmin";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Member from "../pages/members/Member";

import MemberDelete from "./member/MemberDelete ";
import MemberMain from "./member/MemberRouter";
import MemberModify from "./member/MemberModify";
import DailyReg from "./member/DailyReg";
import MonthlyReg from "./member/MonthlyReg";

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
        children: [{ path: "all", element: <ItemAll /> }],
      },
      {
        path: "member/",
        element: <MemberMain />,
        children: [
          { path: "modify", element: <MemberModify /> },
          { path: "delete", element: <MemberDelete /> },
          { path: "daily", element: <DailyReg /> },
          { path: "monthly", element: <MonthlyReg /> },
        ],
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
    ],
  },
]);
