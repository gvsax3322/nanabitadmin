import { ReactElement } from "react";
import DailyReg from "../../pages/admin/member/DailyReg";
import MemberDelete from "../../pages/admin/member/MemberDelete ";
import MemberMain from "../../pages/admin/member/MemberMain";
import MemberModify from "../../pages/admin/member/MemberModify";
import MonthlyReg from "../../pages/admin/member/MonthlyReg";

export interface MemberAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}
const MemberRouter: MemberAdmin = {
  path: "member/",
  element: <MemberMain />,
  children: [
    { path: "modify", element: <MemberModify /> },
    { path: "delete", element: <MemberDelete /> },
    { path: "daily", element: <DailyReg /> },
    { path: "monthly", element: <MonthlyReg /> },
  ],
};

export default MemberRouter;
