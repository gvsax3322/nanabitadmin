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
  