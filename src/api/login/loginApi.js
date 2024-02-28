import axios from "axios";
import { API_SERVER_HOST } from "../../util/util";
const host = `${API_SERVER_HOST}/api/admin`;
// 로그인 하기 위한 정보보내기
// 결과 성공시 RTK 에 업데이트하기
// 일반적으로 post 로 전송합니다.
export const loginPost = async ({ loginParam, successFn, failFn, errorFn }) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };
    const formData = new FormData();
    formData.append("uid", loginParam.uid);
    formData.append("upw", loginParam.upw);
    const res = await axios.post(`${host}`, loginParam, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      const responseData = res.data;
      if (responseData.hasOwnProperty("code")) {
        successFn(responseData.data);
        return responseData.data;
      } else {
        successFn(responseData);
        return responseData;
      }
    } else {
      failFn("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn(error);
  }
};
