import { Outlet } from "react-router";
import Sidebar from "../../layouts/Sidebar";
import { LayoutMain, LayoutStyle } from "../../styles/AdminBasic";
import { ReviewIndex } from "./ReviewIndex";

const ReviewManage = () => {
  return (
    <LayoutStyle>
      {/* data={???} 넘기세요 */}
      <Sidebar data={ReviewIndex} />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};

export default ReviewManage;
