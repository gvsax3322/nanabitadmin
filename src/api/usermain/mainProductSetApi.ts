import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/product`;

export interface MainProRc {
  repPic: string;
  productNm: string;
  price: number;
  iproduct: number;
}

export interface SearchPsend {
  keyword: string;
  iproduct: number;
  imain: number;
  imiddle: number;
  page: number;
}
export interface SearchProduct {
  productNm: string;
  iproduct: number;
  price: number;
  repPic: string;
  status: number;
}

// MD 추천상품 조회
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

// MD 추천상품 등록해제
// http://192.168.0.144:5223/api/admin/product/toggleRcProduct?iproduct=52
// http://192.168.0.144:5223/api/admin/product/togglePopProduct?iproduct=54
// http://192.168.0.144:5223/api/admin/product/toggleNewProduct?iproduct=54
export const putMainProRc = async (
  toggleType:string="",
  iproduct: number,
  putSuccessFn: (data: any) => void,
  putFailFn: (error: string) => void,
  putErrorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.put(
      `${host}/${toggleType}?iproduct=${iproduct}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log(res.data);
      putSuccessFn(res);
    } else {
      putFailFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    putErrorFn("목록 호출 서버 에러에요");
  }
};

// MD 추천 상품검색
// http://192.168.0.144:5223/api/admin/product/searchRcProduct?keyword=&iproduct=0&imain=0&imiddle=0&page=0
export const getMdSearch = async (
  successFn: (data: SearchProduct[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  searchType: string = "",
  keyword: string = "",
  iproduct: number = 0,
  imain: number = 0,
  imiddle: number = 0,
  page: number = 0,
) => {
  try {
    const res = await jwtAxios.get<SearchProduct[]>(
      `${host}/${searchType}?keyword=${keyword}&iproduct=${iproduct}&imain=${imain}&imiddle=${imiddle}&page=${page}`,
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
//=====================================================================================================

// 인기상품 조회
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

//신상품 조회
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
