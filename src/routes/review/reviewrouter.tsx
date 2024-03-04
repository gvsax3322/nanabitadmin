import { ReactElement } from "react";
import HiddenReview from "../../components/review/HiddenReview";
import ReviewSearch from "../../components/review/ReviewSearch";
import ReviewManage from "../../pages/review/ReviewManage";

interface UsermainAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}

const ReviewRouter: UsermainAdmin = {
  path: "review/",
  element: <ReviewManage />,
  children: [
    { path: "search", element: <ReviewSearch /> },
    { path: "hidden", element: <HiddenReview /> },
  ],
};
export default ReviewRouter;
