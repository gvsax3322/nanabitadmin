import { Outlet } from "react-router";
import Sidebar from "../../layouts/Sidebar";
import { LayoutMain, LayoutStyle } from "../../styles/AdminBasic";
import { UsermainIndex } from "./UsermainIndex";

const UsermainManage = () => {
  console.log(window.location.pathname);
  return (
    <LayoutStyle>
      {/* data={???} 넘기세요 */}
      <Sidebar data={UsermainIndex} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};

export default UsermainManage;
