import { getOChartApi } from "../../components/charts/MOrderChartView";
import { getChartApi } from "../../components/charts/MSalesChartView";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api_v2/admin`;





// http://192.168.0.144:5223/api_v2/admin/order/sales?year=2023&month=0
export const getSalesChart = async (
  year: number,
  month: number,
  successFn: (data: getChartApi) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<getChartApi>(
      `${host}/order/sales?year=${year}&month=${month}`,
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

//http://192.168.0.144:5223/api_v2/admin/order/orderCnt?year=2024&month=2
export const getOrderChart = async (
  year: number,
  month: number,
  successFn: (data: getOChartApi) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<getOChartApi>(
      `${host}/order/orderCnt?year=${year}&month=${month}`,
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
