import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

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
  } as MenuItem;
}

// 데이터 만들기 예시
export const CommonData: MenuItem[] = [
  getItem(
    <Link to={"/admin/member/a"}>Option 1</Link>,
    "1",
    <PieChartOutlined />,
  ),
  getItem(
    <Link to={"/admin/member/b"}>Option 1</Link>,
    "2",
    <DesktopOutlined />,
  ),
  getItem(
    <Link to={"/admin/member/c"}>Option 1</Link>,
    "3",
    <ContainerOutlined />,
  ),

  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),

    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

export const Item: MenuItem[] = [
  getItem("전체상품관리", "sub1", <MailOutlined />, [
    getItem(
      <Link to={"/admin/item/all"}>전체상품목록</Link>,
      "1",
      <PieChartOutlined />,
    ),
    getItem(
      <Link to={"/admin/item/inventory"}>재고관리</Link>,
      "2",
      <DesktopOutlined />,
    ),
    getItem(
      <Link to={"/admin/item/qa"}>문의/</Link>,
      "3",
      <ContainerOutlined />,
    ),
  ]),
];
