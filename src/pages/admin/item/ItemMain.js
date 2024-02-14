import React from "react";
import { Outlet } from "react-router";
import { ItemData } from "../../../datas/data";
import Sidebar from "../../../layouts/adminlayout/Sidebar";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";


export const ItemMain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={ItemData}/>
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
