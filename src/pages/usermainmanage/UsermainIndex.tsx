import React from "react"; // React를 임포트합니다.
import { MailOutlined, PieChartOutlined } from "@ant-design/icons";
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

export const UsermainIndex: MenuItem[] = [
  getItem(
    <Link to={"/admin/usermain/banner"}>메인 배너</Link>,
    "banner",
    "/admin/usermain/banner", // 경로 추가
    <PieChartOutlined />,
  ),
  getItem("메인상품 진열관리", "sub1", "/admin/usermain", <MailOutlined />, [
    getItem(
      <Link to={"/admin/usermain/md"}>MD 추천상품</Link>,
      "md",
      "/admin/usermain/md",
    ), // 경로 추가
    getItem(
      <Link to={"/admin/usermain/popular"}>인기상품</Link>,
      "popular",
      "/admin/usermain/popular",
    ), // 경로 추가
    getItem(
      <Link to={"/admin/usermain/new"}>신상품</Link>,
      "new",
      "/admin/usermain/new",
    ), // 경로 추가
  ]),
];

function isActive(path: string): boolean {
  return window.location.pathname === path;
}

export default isActive;
