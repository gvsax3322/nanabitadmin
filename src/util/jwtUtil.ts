import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "./util";

const jwtAxios = axios.create();
const beforeReq = (config: any) => {
  const memberInfo = getCookie("nm");
  if (!memberInfo) {
    return Promise.reject({ response: { data: { error: "Login 하세요." } } });
  }
  const { accessToken } = memberInfo;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
// fail Request 요청보내서 실패했을 때
const requestFail = (err: Error) => {
  // console.log("요청후 실패시 .... ", err);
  return Promise.reject(err);
};
// Refresh Token
// 액세스 요청 실패시 무조건 시도해 봄
const refreshJWT = async (accessToken: string, refreshToken: string) => {
  // console.log("!!!!! 리프레쉬 토큰 호출 시작", refreshToken);
  const host = API_SERVER_HOST;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  // API 백엔드 Refresh 해줄 주소(URI)를 요청
  const res = await axios.get(
    `${host}/api/user/refresh-token=${refreshToken}`,
    header,
  );
  // console.log("!!!!! 1. refreshToken 토큰 요청");
  // 새로 만든 AccessToken 과 RefereshToken 리턴
  // console.log("!!!!! 2. 백엔드에서 새로 준 값", res.data);
  return res.data;
};
// 응답(Response) 처리 코드
// Response 전처리
const beforeRes = async (res: any) => {
  // console.log("Response 전처리 ....", res);
  const data = res.data;
  // console.log("1. Response 오기전 서버 전달해준 데이터", data);
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    // console.log("2. 일반적 오류가 아닌 액세스 토큰 에러!! 입니다. ");
    // console.log("3. 새로운 토큰을 요청해야 합니다. ");
    // console.log("4. 쿠키에 있는 정보를 읽어서, 다시 시도합니다.");
    const memberInfo = getCookie("nm");
    // console.log("5. 쿠키 토큰 정보 AccessToken ", memberInfo.accessToken);
    // console.log("6. 쿠키 토큰 정보 RefreshToken ", memberInfo.refreshToken);
    // console.log("7. 위의 정보로 새로운 토큰을 요청합니다.");
    const result = await refreshJWT(
      memberInfo.accessToken,
      memberInfo.refreshToken,
    );
    // console.log("8. 요청 이후 되돌아와서 새로운 정보로 쿠키를 업데이트 ");
    memberInfo.accessToken = result.accessToken;
    memberInfo.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(memberInfo));
    // console.log("9. 데이터 요청하던 API 재 요청");
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }
  return res;
};
// Response Fail 처리
const responseFail = (err: Error) => {
  console.log("Response Fail Err", err);
  return Promise.reject(err);
};
// axios 인터셉터 적용
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
