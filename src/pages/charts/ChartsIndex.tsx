import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
  type?: "group";
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const CartsIndex: MenuItem[] = [
  getItem("매출 및 통계", "sub1", <LineChartOutlined />, [
    getItem(<Link to={"/admin/charts/dsales"}>일별</Link>, "1"),
    getItem(<Link to={"/admin/charts/msales"}>월별</Link>, "2"),
    getItem(<Link to={"/admin/charts/ysales"}>년별</Link>, "3"),
  ]),

  getItem("주문통계", "sub2", <BarChartOutlined />, [
    getItem(<Link to={"/admin/charts/dorder"}>일별</Link>, "4"),
    getItem(<Link to={"/admin/charts/morder"}>월별</Link>, "5"),
    getItem(<Link to={"/admin/charts/yorder"}>년별</Link>, "6"),
  ]),
];
