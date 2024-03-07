import {
  BannerData,
  PostBannerData,
} from "../../components/usermainmanage/MainBanner";
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
      // //console.log("나와야하는데 ?", res.data);
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 배너 삭제
// http://192.168.0.144:5223/api/admin/product/0/
export const deletBanner = async (ibanner: number) => {
  try {
    const res = await jwtAxios.delete(`${host}/product/banner/${ibanner}`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "이거 아님";
    }
  } catch (error) {
    // //console.log(error);
    return "500임";
  }
};

// 배너 등록
// http://112.222.157.156:5223/api/admin/product/banner
export const postBanner = async (bannerData: PostBannerData) => {
  try {
    // 이미지 데이터를 Blob으로 만들어 FormData에 추가
    const formData = new FormData();
    const response = await fetch(bannerData.pic);
    const blob = await response.blob();
    const currentDate = new Date();
    const seconds = Math.floor(currentDate.getTime() / 1000);
    const file = new File([blob], `image${seconds}.jpg`, {
      type: "image/jpeg",
    });
    formData.append("pic", file);
    formData.append(
      "dto",
      new Blob(
        [
          JSON.stringify({
            bannerUrl: bannerData.dto.bannerUrl,
            target: bannerData.dto.target,
            status: bannerData.dto.status,
          }),
        ],
        {
          type: "application/json",
        },
      ),
    );
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await jwtAxios.post(`${host}/product/banner`, formData, header);

    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "이거 아님";
    }
  } catch (error) {
    // //console.log(error);
    return "500임";
  }
};
// 배너 수정 (수정해야함)
// http://112.222.157.156:5223/api/admin/product/banner?ibanner=1
export const patchBanner = async (
  ibanner: number,
  bannerData: PostBannerData,
) => {
  try {
    const formData = new FormData();
    const response = await fetch(bannerData.pic);
    const blob = await response.blob();
    const currentDate = new Date();
    const seconds = Math.floor(currentDate.getTime() / 1000);
    const file = new File([blob], `image${seconds}.jpg`, {
      type: "image/jpeg",
    });
    formData.append("pic", file);
    formData.append(
      "dto",
      new Blob(
        [
          JSON.stringify({
            bannerUrl: bannerData.dto.bannerUrl,
            target: bannerData.dto.target,
            status: bannerData.dto.status,
          }),
        ],
        {
          type: "application/json",
        },
      ),
    );
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.patch(
      `${host}/product/banner?ibanner=${ibanner}`,
      formData,
      header,
    );
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "이거 아님";
    }
  } catch (error) {
    // //console.log(error);
    return "500임";
  }
};
