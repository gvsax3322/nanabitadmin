import { Outlet } from "react-router";
import { LayoutMain, LayoutStyle } from "../../styles/AdminBasic";
import { MemberData } from "../../components/member/MemberData";
import Sidebar from "../../layouts/Sidebar";

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
