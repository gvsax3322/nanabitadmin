// Main API 최근 가입 유저
export interface UserData {
  createdAt: string;
  email: string;
  uid: string;
  nm: string;
}
// Main API 최근 주문 내역
export interface OrderData {
  iorder: number;
  nm: string;
  addressNm: string;
  phoneNumber: string;
  processState: number;
  totalPrice: number;
  createdAt: string;
}
// Main API 주문상태현황
export interface OrderStatistics {
  processState: string;
  count: number;
}
// Main API 주문취소현황
export interface MyData {
  deleteFl: number;
  refundFl: number;
}
// 주문 총 수 & 가격
export interface ShoppingCart {
  totalPrice: number;
  count: number;
}

// 상품등록
export interface DTO {
  imain?: number;
  imiddle?: number;
  productNm: string;
  price?: number;
  remainedCount?: number;
  recommendedAge?: number;
  adminMemo: string;
  newFl: number;
  popFl: number;
}

export interface Product {
  pics: string[];
  productDetails: string;
  dto: DTO;
}


export interface getRetrunApi {
  code: string;
  message: string;
  data: RetrunData[];
}

export interface RetrunData {
  date: string;
  registerCnt: number;
  registerRate: string;
  totalRegisterCnt: number;
}
