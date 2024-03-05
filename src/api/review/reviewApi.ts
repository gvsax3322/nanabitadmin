import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/product`;

// 리뷰 검색
// http://192.168.0.144:5223/api/admin/product/searchReview?keyword=&iproduct=0&imain=0&imiddle=0&sortBy=0&page=0
export const getReview = async (
  successFn: (data: any) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  searchType: string = "searchReview",
  keyword: string = "",
  iproduct: number = 0,
  imain: number = 0,
  imiddle: number = 0,
  sortBy: number,
  page: number = 0,
) => {
  try {
    const res = await jwtAxios.get(
      `${host}/${searchType}?keyword=${keyword}&iproduct=${iproduct}&imain=${imain}&imiddle=${imiddle}&sortBy=${sortBy}&page=${page}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log(res.data);
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 리뷰 관리자메모
// http://192.168.0.144:5223/api/admin/product/reviewMemo
export const patchReview = async (
  successFn: (data: any) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  ireview: number,
  adminMemo: string = "",
) => {
  try {
    const res = await jwtAxios.patch(`${host}/reviewMemo`, {
      ireview,
      adminMemo,
    });
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 리뷰 관리자 메모
// http://192.168.0.144:5223/api/admin/product/reviewMemo?ireview=136
export const getReviewMemo = async (
  successMemo: (data: any) => void,
  failMemo: (error: string) => void,
  errorMemo: (error: string) => void,
  ireview: number = 0,
) => {
  try {
    const res = await jwtAxios.get(`${host}//reviewMemo?ireview=${ireview}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log(res.data);
      successMemo(res.data);
    } else {
      failMemo("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorMemo("목록 호출 서버 에러에요");
  }
};

// 리뷰 숨기기
// http://192.168.0.144:5223/api/admin/product/reviewTogle?ireview=136
export const putReview = async (
  putSuccessFn: (data: any) => void,
  putFailFn: (error: string) => void,
  putErrorFn: (error: string) => void,
  ireview: number,
) => {
  try {
    const res = await jwtAxios.put(`${host}/reviewTogle?ireview=${ireview}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      putSuccessFn(res.data);
    } else {
      putFailFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    putErrorFn("목록 호출 서버 에러에요");
  }
};
