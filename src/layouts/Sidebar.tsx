import React, { useState } from "react";
import { SidebarButton, SidebarStyle } from "../styles/AdminBasic";
import { ConfigProvider } from "antd";

interface SidebarProps {
  data: any[];
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
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorPrimary: "#A5A5A5",
              itemSelectedColor: "#000",
              itemActiveBg: "#A5A5A5",
            },
          },
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
      </ConfigProvider>
    </div>
  );
};

export default Sidebar;
