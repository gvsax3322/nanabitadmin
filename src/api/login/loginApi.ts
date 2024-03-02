import axios from "axios";
import { LoginParam, LoginRes } from "../../pages/admin/login/LoginPage";
import { API_SERVER_HOST } from "../../util/util";
const host = `${API_SERVER_HOST}/api/admin`;



export const loginPost = async ({
  loginParam,
  successFn,
  failFn,
  errorFn,
}: {
  loginParam: LoginParam;
  successFn: (data: LoginRes) => void;
  failFn: (error: string) => void;
  errorFn: (error: string) => void;
}) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };
    const formData = new FormData();
    formData.append("uid", loginParam.uid);
    formData.append("upw", loginParam.upw);
    const res = await axios.post(host, formData, header);
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
    errorFn("목록 호출 서버 에러에요");
  }
};
