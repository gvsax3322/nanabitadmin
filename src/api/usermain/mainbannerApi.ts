import { BannerData, PostBannerData } from "../../components/usermainmanage/MainBanner";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin`;

// 배너 조회 /api/admin/product/banner
// http://192.168.0.144:5223/api/admin/product/banner
export const getBanner = async (
  successFn: (data: BannerData[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<BannerData[]>(`${host}/product/banner`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log("나와야하는데 ?", res.data);
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 배너 삭제 (ibanner 키값을 보내서 삭제 요청으로 수정해야함)
//
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

// 배너 등록 (수정해야함) 에러남 ㅠㅠ
// http://112.222.157.156:5223/api/admin/product/banner
export const postBanner = async (bannerData: PostBannerData)=>{
  try {
    const res = await jwtAxios.post(`${host}/product/banner`,bannerData);
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
}

// 배너 수정 (수정해야함) 에러남
// http://112.222.157.156:5223/api/admin/product/banner?ibanner=1
export const patchBanner = async (ibanner:number)=>{
  try {
    const res = await jwtAxios.patch(`${host}/product/banner?ibanner=${ibanner}`);
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
}