import { Outlet } from "react-router";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";
import Sidebar from "../../../layouts/Sidebar";
import { CommonData } from "../../../components/datas/data";

export const ItemMain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={CommonData} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
