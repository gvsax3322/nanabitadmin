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
  size: number;
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

// api/admin/order?&processState=0&dateCategory=0&searchCategory=0&keyword=&startDate=2024-02-08&endDate=2024-03-20&dateFl=0&payCategory=0&sort=0
// api/admin/order?processState=1&dateCategory=2&searchCategory=3&keyword=&startDate=&endDate=&dateFl=1&payCategory=2&sort=0

// processState: 3
// dateCategory: 4
// searchCategory: 4
// keyword: 주영님 저 어케요
// startDate: 2024-02-01
// endDate: 2024-03-04
// dateFl: 0
// payCategory: 1
// sort: 0

// // {
//     "iorder": 100061,
//     "orderedAt": "2024-06-13T14:31:23",
//     "products": [
//         {
//             "repPic": "0cc58111-4d0f-46ad-aaa8-103ca7af9c5f.jpg",
//             "productNm": "led보온분유",
//             "cnt": 6,
//             "processState": 1,
//             "amount": 29900,
//             "refundFl": 0
//         },
//     ],
//     "ordered": "이강인",
//     "recipient": "이강인",
//     "totalAmount": 357200,
//     "payCategory": 2,
//     "refundFl": 0
// },
