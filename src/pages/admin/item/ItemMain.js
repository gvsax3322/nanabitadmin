import React from "react";
import { Outlet } from "react-router";
import { ItemData } from "../../../components/datas/data";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";
import Sidebar from "../../../layouts/Sidebar";

export const ItemMain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={ItemData} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
