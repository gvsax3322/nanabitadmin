import { Outlet } from "react-router";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";
import Sidebar from "../../../layouts/Sidebar";
import { Item } from "../../../components/datas/data";


export const ItemMain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={Item} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
