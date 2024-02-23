import React, { useState } from "react";
import { SidebarButton, SidebarStyle } from "../styles/AdminBasic";
import { ConfigProvider } from "antd";

interface SidebarProps {
  data: any[]; // data의 타입을 any[]로 임시로 지정합니다.
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: "20%",
      }}
    >
      <div
        style={{
          position: "fixed",
          display: "flex",
          width: "15%",
          height: "100%",
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
        </ConfigProvider>
        <SidebarButton onClick={toggleCollapsed}></SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
