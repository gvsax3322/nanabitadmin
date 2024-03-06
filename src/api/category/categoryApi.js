import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const prefix = `${API_SERVER_HOST}/api/admin`;
// const API_SERVER_HOST = "";
export const getCategory = async ({ successFn, failFn, errorFn }) => {
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

export const deleleCateMain = async ({ imain, successFn, failFn, errorFn }) => {
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
  candidateKey,
  successFn,
  failFn,
  errorFn,
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
export const postAddCate = async ({ mainAdd, successFn, failFn, errorFn }) => {
  try {
    const url = `${prefix}/category/main?main_category=${mainAdd}`;
    const res = await jwtAxios.post(url);

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
