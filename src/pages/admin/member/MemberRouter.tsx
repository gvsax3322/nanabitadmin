import { Navigate } from "react-router";
import MemberModify from "../../../routes/member/MemberRouter";
import MemberDelete from "../../../routes/member/MemberDelete ";

const memberRouter = () => {
  return [
    { path: "", element: <Navigate to="member" /> },
    {
      path: "",
      element: <MemberModify />,
    },
    {
      path: "delete",
      element: <MemberDelete />,
    },
  ];
};
export default memberRouter;
