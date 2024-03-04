import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/product`;

// 리뷰 검색
// http://192.168.0.144:5223/api/admin/product/searchReview?keyword=&iproduct=0&imain=0&imiddle=0&sortBy=0&page=0
export const getReview = async (
  successFn: (data: any) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  keyword: string = "",
  iproduct: number = 0,
  imain: number = 0,
  imiddle: number = 0,
  sortBy:number=0,
  page: number = 0,
) => {
  try {
    const res = await jwtAxios.get(
      `${host}/searchReview?keyword=${keyword}&iproduct=${iproduct}&imain=${imain}&imiddle=${imiddle}&sortBy=${sortBy}&page=${page}`,
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
