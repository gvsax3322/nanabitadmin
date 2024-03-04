import { ReactElement } from "react";
import MainBanner from "../../components/usermainmanage/MainBanner";
import MdRecommend from "../../components/usermainmanage/MdRecommend";
import NewProduct from "../../components/usermainmanage/NewProduct";
import PopProduct from "../../components/usermainmanage/PopProduct";
import PutMd from "../../components/usermainmanage/PutMd";
import PutNew from "../../components/usermainmanage/PutNew";
import PutPop from "../../components/usermainmanage/PutPop";
import UsermainManage from "../../pages/usermainmanage/UsermainManage";

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
    { path: "banner", element: <MainBanner /> },
    { path: "md", element: <MdRecommend /> },
    { path: "mdregist", element: <PutMd /> },
    { path: "pop", element: <PopProduct /> },
    { path: "popregist", element: <PutPop /> },
    { path: "new", element: <NewProduct /> },
    { path: "newregist", element: <PutNew /> },
  ],
};
export default UsermainRouter;
