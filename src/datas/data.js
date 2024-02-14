import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// 데이터 만들기 예시
export const CommonData = [
  getItem("주문관리", "sub1", <MailOutlined />, [
    getItem(<Link to="/admin/member/a">주문리스트</Link>, "1"),
    getItem(<Link to="/admin/member/b">입금대기</Link>, "2"),
    getItem(<Link to="/admin/member/c">입금완료</Link>, "3"),
    getItem("배송준비", "4"),
  ]),
  getItem("취소/교환/반품/환불", "sub2", <AppstoreOutlined />, [
    getItem("입급전 취소", "5"),
    getItem("배송전 환불", "6"),
    getItem("배송후 반품", "7"),
    getItem("배송후 교환", "8"),
  ]),
  getItem("기타관리", "sub3", null, [getItem("관리자메모", "9")]),
];

// 상품관리 사이드바
export const ItemData = [
  getItem("상품관리", "sub1", <MailOutlined />, [
    getItem(<Link to="/admin/item/all">전체 상품관리</Link>, "1"),
    getItem(<Link to="/admin/member/b">입금대기</Link>, "2"),
    getItem(<Link to="/admin/member/c">입금완료</Link>, "3"),
    getItem("배송준비", "4"),
  ]),
  getItem("", "sub2", <AppstoreOutlined />, [
    getItem("입급전 취소", "5"),
    getItem("배송전 환불", "6"),
    getItem("배송후 반품", "7"),
    getItem("배송후 교환", "8"),
  ]),
  getItem("기타관리", "sub3", null, [getItem("관리자메모", "9")]),
];