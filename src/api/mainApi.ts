import axios from "axios";
import { API_SERVER_HOST } from "../util/util";
import { OrderData, OrderStatistics, UserData } from "./model/resturant";

const host = `${API_SERVER_HOST}/api/admin`;

export const getList = async (): Promise<UserData[] | string> => {
  try {
    const res = await axios.get<UserData[]>(`${host}/product/recentUsers`);
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

export const getRecentList = async (): Promise<OrderData[] | string> => {
  try {
    const res = await axios.get<OrderData[]>(`${host}/product/recentOrders`);
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

export const getOrderStatus = async (): Promise<OrderStatistics[] | string> => {
  try {
    const res = await axios.get<OrderStatistics[]>(
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
