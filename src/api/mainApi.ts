import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../util/util";
import {
  MyData,
  OrderData,
  OrderStatistics,
  Product,
  ShoppingCart,
  UserData,
} from "./model/resturant";

const host = `${API_SERVER_HOST}/api/admin`;

// 최근 가입유저
export const getList = async (): Promise<UserData[] | string> => {
  try {
    const res = await jwtAxios.get<UserData[]>(`${host}/product/recentUsers`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as UserData[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 최근 주문내역
export const getRecentList = async (): Promise<OrderData[] | string> => {
  try {
    const res = await jwtAxios.get<OrderData[]>(`${host}/product/recentOrders`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as OrderData[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 주문상태현황
export const getOrderStatus = async (): Promise<OrderStatistics[] | string> => {
  try {
    const res = await jwtAxios.get<OrderStatistics[]>(
      `${host}/product/OrderStatus`,
    );
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as OrderStatistics[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 반품/취소 수
export const getCancelCount = async (): Promise<MyData[] | string> => {
  try {
    const res = await jwtAxios.get<MyData[]>(
      `${host}/product/OrderCancelCount`,
    );
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as MyData[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 전체 가격/ 수
export const getShoppingCart = async (): Promise<ShoppingCart[] | string> => {
  try {
    const res = await jwtAxios.get<ShoppingCart[]>(
      `${host}/product/Total Price & count`,
    );
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as ShoppingCart[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 상품삭제
export const getDeldel = async (): Promise<MyData[] | string> => {
  try {
    const res = await jwtAxios.get<MyData[]>(
      `${host}/product/deldel?iproduct=50`,
    );
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as MyData[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 상품등록
export const postProduct = async (): Promise<Product[] | string> => {
  try {
    const res = await jwtAxios.post<Product[]>(`${host}/product/Product`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as Product[];
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};
