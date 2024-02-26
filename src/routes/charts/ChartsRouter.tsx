import { ReactElement } from "react";
import { Navigate } from "react-router";
import DOrderChartView from "../../components/charts/DOrderChartView";
import { default as DSalesChartView } from "../../components/charts/DSalesChartView";
import MOrderChartView from "../../components/charts/MOrderChartView";
import MSalesChartView from "../../components/charts/MSalesChartView";
import YOrderChartView from "../../components/charts/YOrderChartView";
import YSalesChartView from "../../components/charts/YSalesChartView";
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
    { path: "dsales", element: <DSalesChartView /> },
    { path: "msales", element: <MSalesChartView /> },
    { path: "ysales", element: <YSalesChartView /> },
    { path: "dorder", element: <DOrderChartView /> },
    { path: "morder", element: <MOrderChartView /> },
    { path: "yorder", element: <YOrderChartView /> },
  ],
};

export default ChartsRouter;
