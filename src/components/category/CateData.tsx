import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
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

export const CateData: MenuItem[] = [
  getItem("카테고리", "sub1", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/category/all"}>카테고리</Link>, "1"),
  ]),
];
