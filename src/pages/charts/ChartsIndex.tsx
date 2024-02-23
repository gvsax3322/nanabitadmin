import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  path: string; // 경로 추가
  children?: MenuItem[];
  type?: "group";
};

function getItem(
  label: React.ReactNode,
  key: string,
  path: string, // 경로 추가
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path,
    type,
  };
}

export const CartsIndex: MenuItem[] = [
  getItem("매출 및 통계", "sub1", "/admin/charts", <RadarChartOutlined />, [
    getItem(
      <Link to={"/admin/charts/sales"}>매출통계</Link>,
      "sales",
      "/admin/charts/sales",
      <LineChartOutlined />,
    ),
    getItem(
      <Link to={"/admin/charts/order"}>주문통계</Link>,
      "order",
      "/admin/charts/order",
      <BarChartOutlined />,
    ),
  ]),
];
