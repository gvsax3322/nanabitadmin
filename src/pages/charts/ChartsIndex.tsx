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
  getItem("매출 및 통계", "sub1", "/admin/charts", <LineChartOutlined />, [
    getItem(
      <Link to={"/admin/charts/dsales"}>일별</Link>,
      "dsales",
      "/admin/charts/dsales",
    ),
    getItem(
      <Link to={"/admin/charts/msales"}>월별</Link>,
      "msales",
      "/admin/charts/msales",
    ),
    getItem(
      <Link to={"/admin/charts/ysales"}>년별</Link>,
      "ysales",
      "/admin/charts/ysales",
    ),
  ]),
  getItem("주문통계", "sub1", "/admin/charts", <BarChartOutlined />, [
    getItem(
      <Link to={"/admin/charts/dorder"}>일별</Link>,
      "dorder",
      "/admin/charts/dorder",
    ),
    getItem(
      <Link to={"/admin/charts/morder"}>월별</Link>,
      "morder",
      "/admin/charts/morder",
    ),
    getItem(
      <Link to={"/admin/charts/yorder"}>년별</Link>,
      "yorder",
      "/admin/charts/yorder",
    ),
  ]),
];
