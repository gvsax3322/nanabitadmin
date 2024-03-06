import { Outlet } from "react-router";

import { CateData } from "../../components/category/CateData";
import Sidebar from "../../layouts/Sidebar";
import { LayoutMain, LayoutStyle } from "../../styles/AdminBasic";

export const Categorymain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={CateData} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
