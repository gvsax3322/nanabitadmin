import { ReactElement } from "react";

interface ChartAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}

const ChartsRouter: ChartAdmin = {
  path: "charts/",
  element: <></>,
  children: [],
};

export default ChartsRouter;