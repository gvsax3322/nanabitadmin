import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin`;

// Main API 최근 주문 내역
export interface BannerData {
  ibanner: number;
  target: number;
  status: number; // 노출여부
  bannerUrl: "string";
  bannerPic: "string";
}

// 배너 조회
export const getBanner = async (): Promise<BannerData[] | string> => {
  try {
    const res = await jwtAxios.get<BannerData[]>(`${host}/product/banner`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data as BannerData[];
    } else {
      return "이거 아님";
    }
  } catch (error) {
    console.log(error);
    return "500임";
  }
};

// 배너 삭제 (ibanner 키값을 보내서 삭제 요청으로 수정해야함)
export const deletBanner = async (): Promise<BannerData[] | string> => {
  try {
    const res = await jwtAxios.delete<BannerData[]>(`${host}/product/banner`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "이거 아님";
    }
  } catch (error) {
    console.log(error);
    return "500임";
  }
};
