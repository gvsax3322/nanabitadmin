import { GetProduct, ProductGetList } from "../pages/admin/item/ItemAll";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../util/util";
import { Product } from "./model/resturant";

const host = `${API_SERVER_HOST}/api/admin/product`;

// 상품삭제
export const getDeldel = async (iproductList: number[]) => {
  try {
    const res = await jwtAxios.get(`${host}/deldel?iproduct=${iproductList}`, {
      data: {
        iproductList: iproductList,
      },
    });
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 상품수정
export const productPatch = async (iproduct: number) => {
  try {
    const res = await jwtAxios.patch(`${host}/product?iproduct=${iproduct}`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "잘못된 정보를 전달함.";
    }
  } catch (error) {
    console.log(error);
    return "네트워크 오류 발생.";
  }
};

// 상품등록
export const postProduct = async ({
  product,
}: any): Promise<Product[] | string> => {
  console.log("product", product);
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post<Product[]>(
      `${host}/product`,
      product,
      header,
    );
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

// 상품검색

export const getProductlist = async (
  successPr: (data: GetProduct[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  keyword: string = "",
  iproduct: number = 0,
  imain: number = 0,
  imiddle: number = 0,
  minPrice: number = 0,
  maxPrice: number = 0,
  dateFl: number = 0,
  searchStartDate: string = "",
  searchEndDate: string = "",
  page: number = 1,
) => {
  try {
    const res = await jwtAxios.get<ProductGetList>(
      `${host}/productSearch?keyword=${keyword}&iproduct=${iproduct}&imain=${imain}&imiddle=${imiddle}&minPrice=${minPrice}&maxPrice=${maxPrice}&dateFl=${dateFl}&searchStartDate=${searchStartDate}&searchEndDate=${searchEndDate}&page=${page}`,
    );

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successPr(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

//주문통계

export interface StatisticsData {
  date: ReturnType[];
  totalOrders: number;
  totalSales: number;
  // 다른 통계 데이터 필드들을 여기에 추가
}
export interface ReturnType {
  data: any;
  date: string;
  registerCnt: number;
  registerRate: string;
  totalRegisterCnt: number;
}

export const getProductReturn = async (
  year: number,
  month: number,
  successFn: (data: ReturnType) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<ReturnType>(
      `${host}/return?year=${year}&month=${month}`,
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

// 취소통계

export interface CancelChartData {
  data: any;
  //날짜
  registerCnt: number; //반품수
  registerRate: string; //반품비율
  totalRegisterCnt: number; // 총 반품수
}

// export const getProductCancel = async (
//   year: number,
//   month: number,
// ): Promise<StatisticsData[]> => {
//   try {
//     const response = await jwtAxios.get(
//       `${host}/product/cancel?year=${year}&month=${month}`,
//     ); // API 엔드포인트에 맞게 수정
//     return response.data; // API에서 받은 데이터 반환
//   } catch (error) {
//     console.error("통계 데이터를 가져오는 중 오류 발생:", error);
//     return []; // 오류 발생 시 빈 배열 반환
//   }
// };

export const getProductCancel = async (
  year: number,
  month: number,
  successFn: (data: CancelChartData) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<CancelChartData>(
      `${host}/cancel?year=${year}&month=${month}`,
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
