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

export const OrderData: MenuItem[] = [
  getItem("주문관리", "sub1", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/order/all"}>전체리스트</Link>, "1"),
    getItem(<Link to={"/admin/order/deposit"}>입금대기</Link>, "2"),
    getItem(<Link to={"/admin/order/preparing"}>배송준비중</Link>, "3"),
    getItem(<Link to={"/admin/order/shipping"}>배송중</Link>, "4"),
    getItem(<Link to={"/admin/order/completed"}>배송완료</Link>, "5"),
  ]),
  getItem("취소/반품 관리", "sub2", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/order/cancel"}>주문취소</Link>, "6"),
    getItem(<Link to={"/admin/order/return"}>반품신청</Link>, "7"),
  ]),
  getItem("기타관리", "sub3", <MailOutlined />, [
    getItem(<Link to={"/admin/order/memo"}>관리자 메모</Link>, "8"),
  ]),
];
