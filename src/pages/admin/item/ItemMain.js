import React from "react";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";
import Sidebar from "../../../layouts/adminlayout/Sidebar";
import { Outlet } from "react-router";
import { CommonData } from "../../../datas/data";


export const ItemMain = () => {
  return (
    <LayoutStyle>
      <Sidebar data={CommonData}/>
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};
