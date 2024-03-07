import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

export interface detailsListParam {
  processState?: number;
  searchCategory: number;
  keyword: string;
  startDate: string;
  endDate: string;
  dateFl: number;
  payCategory: number;
  page: number;
  sort: number;
  // size: number;
}

export interface imain {
  imain: number;
}

export interface candidateKey {
  candidateKey: number;
}

export interface mainAdd {
  main_category: string;
}

export interface subAdd {
  imain: number;
  main_category: string;
}

const prefix = `${API_SERVER_HOST}/api/admin`;
// const API_SERVER_HOST = "";
export const getCategory = async ({
  successFn,
  failFn,
  errorFn,
}: {
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/category`;
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

export const deleleCateMain = async ({
  imain: imain,
  successFn,
  failFn,
  errorFn,
}: {
  imain: number;
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/category/main/${imain}`;
    const res = await jwtAxios.delete(url);

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

export const deleleCateSub = async ({
  candidateKey: candidateKey,
  successFn,
  failFn,
  errorFn,
}: {
  candidateKey: number;
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/category/middle/${candidateKey}`;
    const res = await jwtAxios.delete(url);

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

// ==============================추가
export const postAddCate = async ({
  mainAdd: mainAdd,
  successFn,
  failFn,
  errorFn,
}: {
  mainAdd: mainAdd;
  successFn: (data: any) => void;
  failFn: (message: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const url = `${prefix}/category/main`;
    const res = await jwtAxios.post(url, mainAdd);

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
