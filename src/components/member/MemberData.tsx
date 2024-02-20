import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
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
  
// 데이터 만들기 예시
export const MemberData: MenuItem[] = [
  getItem("회원정보", "sub1", <MailOutlined />, [
    getItem(<Link to={"/admin/member/modify"}>회원정보관리</Link>, "1"),
    getItem(<Link to={"/admin/member/delete"}>회원정보</Link>, "2"),
  ]),

  getItem("가입통계", "sub2", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/member/daily"}>일별 가입통계분석</Link>, "3"),
    getItem(<Link to={"/admin/member/monthly"}>월별 가입통계분석</Link>, "4"),
  ]),
];
