import axios, { AxiosResponse } from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "./util";

const jwtAxios = axios.create();

const beforeReq = (config: any) => {
  // //console.log(config);
  const memberInfo = getCookie("nm");
  if (!memberInfo) {
    return Promise.reject({ response: { data: { error: "Login 하세요." } } });
  }
  const { accessToken } = memberInfo;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
const requestFail = (err: Error) => {
  return Promise.reject(err);
};
const refreshJWT = async (accessToken: string, refreshToken: string) => {
  const host = API_SERVER_HOST;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/user/refresh-token=${refreshToken}`,
    header,
  );
  return res.data;
};
// 응답(Response) 처리 코드
// Response 전처리
const beforeRes = async (res: AxiosResponse) => {
  // //console.log(res);
  const data = res.data;
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberInfo = getCookie("nm");
    const result = await refreshJWT(
      memberInfo.accessToken,
      memberInfo.refreshToken,
    );
    memberInfo.accessToken = result.accessToken;
    memberInfo.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(memberInfo));
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }
  return res;
};
const responseFail = (err: Error) => {
  // //console.log("Response Fail Err", err);
  return Promise.reject(err);
};
// axios 인터셉터 적용
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
