import React from "react";
import { LayoutMain, LayoutStyle } from "../../styles/AdminBasic";
import Sidebar from "../../layouts/Sidebar";
import { CartsIndex } from "./ChartsIndex";
import { Outlet } from "react-router";

const ChartsPage = () => {
  return (
    <LayoutStyle>
      {/* data={???} 넘기세요 */}
      <Sidebar data={CartsIndex} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};

export default ChartsPage;
