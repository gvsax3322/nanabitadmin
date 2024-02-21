import axios from "axios";
import { LoginFunctions } from "../pages/hooks/useCustomLogin";
import { API_SERVER_HOST } from "../util/util";

const host = `${API_SERVER_HOST}/api/admin`;

export const loginPost = async ({
  loginParam,
  successFn,
  failFn,
  errorFn,
}: LoginFunctions) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };

    const res = await axios.post(`${host}`, loginParam, header);

    const status = res.status.toString();

    if (status.charAt(0) === "2") {
      successFn(res.data);
      return res.data;
    } else {
      failFn("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn("에러가 발생했어요");
  }
};
