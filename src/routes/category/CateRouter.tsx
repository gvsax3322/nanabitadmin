import { ReactElement } from "react";
import { Navigate } from "react-router";
import CatePage from "../../pages/category/CatePage";
import { Categorymain } from "../../pages/category/Categorymain";

export interface CategoryAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}

const CateRouter: CategoryAdmin = {
  path: "category",
  element: <Categorymain />,
  children: [
    // 주문관리
    { path: "", element: <Navigate to="all" /> },
    { path: "all", element: <CatePage /> },
  ],
};
export default CateRouter;
