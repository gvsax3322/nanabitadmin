import { ReactElement } from "react";
import UsermainManage from "../../pages/usermainmanage/UsermainManage";
import { Navigate } from "react-router";
import NewProduct from "../../components/usermainmanage/NewProduct";
import PopProduct from "../../components/usermainmanage/PopProduct";
import MdRecommend from "../../components/usermainmanage/MdRecommend";
import MainBanner from "../../components/usermainmanage/MainBanner";

interface UsermainAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}

const UsermainRouter: UsermainAdmin = {
  path: "usermain/",
  element: <UsermainManage />,
  children: [
    { path: "", element: <Navigate to="all" /> },
    { path: "banner", element: <MainBanner /> },
    { path: "md", element: <MdRecommend /> },
    { path: "popular", element: <PopProduct /> },
    { path: "new", element: <NewProduct /> },
  ],
};
export default UsermainRouter;
