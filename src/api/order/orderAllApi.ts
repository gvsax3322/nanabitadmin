import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

import axios from "axios";

export interface OrderParam {
  processState: number;
  dateCategory: number;
  searchCategory: number;
  keyword: string;
  startDate: string;
  endDate: string;
  dateFl: number;
  payCategory: number;
  sort: number;
  page: number;
  // size: number;
}

export interface processOrder {
  iorders: number[];
  processState: number;
}

export interface detailsParam {
  iorder: number;
}

const prefix = `${API_SERVER_HOST}/api/admin`;
// const API_SERVER_HOST = "";
export const getOrderAll = async ({
  orderParam,
  successFn,
  failFn,
  errorFn,
}: {
  orderParam: OrderParam;
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/order`;
    const res = await jwtAxios.get(url, { params: orderParam });

    const resStatus = res.status.toString();
    if (resStatus.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("잘못된 요청입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 중 에러가 발생했습니다.");
  }
};

export const putOrderState = async ({
  processOrder,
  successFn,
  failFn,
  errorFn,
}: {
  processOrder: processOrder;
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/order`;
    const res = await jwtAxios.put(url, processOrder);

    const resStatus = res.status.toString();
    if (resStatus.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("잘못된 요청입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 중 에러가 발생했습니다.");
  }
};

export const getDetails = async ({
  orderParam,
  successFn,
  failFn,
  errorFn,
}: {
  orderParam: number;
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/order/details/${orderParam}`;
    const res = await jwtAxios.get(url);

    const resStatus = res.status.toString();
    if (resStatus.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("잘못된 요청입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 중 에러가 발생했습니다.");
  }
};
