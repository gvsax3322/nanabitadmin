import { Outlet } from "react-router";
import { LayoutMain, LayoutStyle } from "../../../styles/AdminBasic";
import Sidebar from "../../../layouts/Sidebar";
import { MemberData } from "../../../components/member/MemberData";

const MemberMain = () => {
  return (
    <div>
      {" "}
      <LayoutStyle>
        <Sidebar data={MemberData} />
        <LayoutMain>
          <Outlet />
        </LayoutMain>
      </LayoutStyle>
    </div>
  );
};

export default MemberMain;
