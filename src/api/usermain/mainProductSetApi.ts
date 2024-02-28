import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/product`;

export interface MainProRc {
  repPic: string;
  productNm: string;
  price: number;
  iproduct: number;
}

// 진열관리_MD 추천상품 조회
//http://192.168.0.144:5223/api/admin/product/productRc
export const getMainProRc = async (
  successFn: (data: MainProRc[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<MainProRc[]>(`${host}/productRc`);
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

// 진열관리_MD 추천상품 등록해제
// http://192.168.0.144:5223/api/admin/product/productRcDel?iproduct=50
export const putMainProRc = async (
  iproduct: number,
  successFn: (data: any) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.put(`${host}/productRcDel?iproduct=${iproduct}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log(res.data);
      successFn(res);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 진열관리_인기상품 조회
//http://192.168.0.144:5223/api/admin/product/productPop
export const getMainProPop = async (
  successFn: (data: MainProRc[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<MainProRc[]>(`${host}/productPop`);
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

//진열관리_신상품 조회
//http://192.168.0.144:5223/api/admin/product/productNew
export const getMainProNew = async (
  successFn: (data: MainProRc[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<MainProRc[]>(`${host}/productNew`);
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
