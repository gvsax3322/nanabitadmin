import axios from "axios";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/user/sign-in`;

export const loginPost = async ({ loginParam, successFn, failFn, errorFn }) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };
    const formData = new FormData();
    formData.append("uid", loginParam.uid);
    formData.append("upw", loginParam.upw);

    const res = await axios.post(`${host}`, loginParam, header);

    const status = res.status.toString();

    if (status.charAt(0) === "2") {
      successFn(res.data);

      return res.data;
    } else {
      failFn("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn(error);
  }
};
