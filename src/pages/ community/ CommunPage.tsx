import React from "react";
import { LayoutMain, LayoutStyle } from "../../styles/AdminBasic";
import Sidebar from "../../layouts/Sidebar";
import { Commun } from "../../components/datas/data";
import Community from "../../components/community/Community";

const CommunPage = () => {
  return (
    <LayoutStyle>
      <Sidebar data={Commun} />
      <LayoutMain>
        <Community />
      </LayoutMain>
    </LayoutStyle>
  );
};

export default CommunPage;
