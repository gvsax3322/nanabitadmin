import {
  FireOutlined,
  HeartOutlined,
  PicCenterOutlined,
  PieChartOutlined,
  TagsOutlined,
} from "@ant-design/icons";
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

export const UsermainIndex: MenuItem[] = [
  getItem(
    <Link to={"/admin/usermain/banner"}>메인 배너</Link>,
    "1",
    <PicCenterOutlined />,
  ),
  getItem("MD추천상품 진열관리", "sub1", <HeartOutlined />, [
    getItem(<Link to={"/admin/usermain/md"}>조회</Link>, "2"), // 경로 추가
    getItem(<Link to={"/admin/usermain/mdregist"}>등록하기</Link>, "3"), // 경로 추가
  ]),
  getItem("인기상품 진열관리", "sub2", <FireOutlined />, [
    getItem(<Link to={"/admin/usermain/pop"}>조회</Link>, "4"), // 경로 추가
    getItem(<Link to={"/admin/usermain/popregist"}>등록하기</Link>, "5"), // 경로 추가
  ]),
  getItem("신상품 진열관리", "sub3", <TagsOutlined />, [
    getItem(<Link to={"/admin/usermain/new"}>조회</Link>, "6"), // 경로 추가
    getItem(<Link to={"/admin/usermain/newregist"}>등록하기</Link>, "7"), // 경로 추가
  ]),
];
