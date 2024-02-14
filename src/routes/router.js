import React from "react";
import { createBrowserRouter } from "react-router-dom";

import AdminBasic from "../layouts/adminlayout/AdminBasic";
import A from "../pages/admin/comm/A";
import B from "../pages/admin/comm/B";
import C from "../pages/admin/comm/C";
import { ItemMain } from "../pages/admin/item/ItemMain";
import MainAdmin from "../pages/admin/main/MainAdmin";
import Member from "../pages/members/Member";

export const routerAdmin = createBrowserRouter([
  {
    path: "/Admin",
    element: <AdminBasic />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainAdmin />,
      },
      {
        path: "item",
        element: <ItemMain />,
      },
      {
        path: "member",
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
