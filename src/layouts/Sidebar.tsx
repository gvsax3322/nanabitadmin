import React, { useState } from "react";
import { SidebarButton, SidebarStyle } from "../styles/AdminBasic";

interface SidebarProps {
  data: any[]; // 적절한 타입으로 변경해야 합니다.
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false); // collapsed의 타입을 boolean으로 명시합니다.

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
