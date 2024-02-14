import React, { useState } from "react";
import { Common, SidebarButton, SidebarStyle } from "../../styles/AdminBasic";

const Sidebar = ({ data }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: "20%",
        display: "flex",
      }}
    >
      <SidebarStyle
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={data}
      />
      <SidebarButton onClick={toggleCollapsed}></SidebarButton>
    </div>
  );
};

export default Sidebar;
