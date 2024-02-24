import {
  CommentOutlined,
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
      <Link to={"/admin/item/qa"}>문의/후기</Link>,
      "3",
      <ContainerOutlined />,
    ),
  ]),
];

export const Commun: MenuItem[] = [
  getItem(
    <Link to={"/admin/community"}>게시판 관리</Link>,
    "1",
    <CommentOutlined />,
  ),
];
