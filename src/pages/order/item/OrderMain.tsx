import { Outlet } from "react-router";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";
import Sidebar from "../../../layouts/Sidebar";
import { OrderData } from "../../../components/datas/data";

export const Ordermain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={OrderData} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
