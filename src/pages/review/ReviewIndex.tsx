import { CommentOutlined } from "@ant-design/icons";
import React from "react"; // React를 임포트합니다.
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

export const ReviewIndex: MenuItem[] = [
  getItem("리뷰관리", "sub1", <CommentOutlined />, [
    getItem(<Link to={"/admin/review/search"}>리뷰 검색</Link>, "1"), // 경로 추가
    getItem(<Link to={"/admin/review/hidden"}>숨긴리뷰 관리</Link>, "2"), // 경로 추가
  ]),
];
