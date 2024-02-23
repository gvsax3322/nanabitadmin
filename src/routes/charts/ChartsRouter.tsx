import { ReactElement } from "react";
import { Navigate } from "react-router";
import OrderChartView from "../../components/charts/OrderChartView";
import SalesChartView from "../../components/charts/SalesChartView";
import ChartsPage from "../../pages/charts/ChartsPage";

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
  element: <ChartsPage></ChartsPage>,
  children: [
    { path: "", element: <Navigate to="all" /> },
    { path: "sales", element: <SalesChartView /> },
    { path: "order", element: <OrderChartView /> },
  ],
};

export default ChartsRouter;
