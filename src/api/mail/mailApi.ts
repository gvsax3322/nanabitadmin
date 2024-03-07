import { PostRes } from "../../components/member/modal/PostModal";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/mail`;
// 메일 보내기
export const postMail = async (
  successFn: (data: PostRes) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  to: string | undefined,
  subject: string | undefined = "",
  message: string | undefined,
) => {
  const params = {
    to: [to],
    subject,
    message,
  };
  try {
    const res = await jwtAxios.post<PostRes>(`${host}`, params);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // //console.log(res.data);
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 메일 보내기 테스트
export const postMailTest = async (
  successFn: (data: PostRes) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  to: string | undefined,
  subject: string | undefined = "",
  message: string | undefined,
) => {
  const params = {
    to: [to],
    subject,
    message,
  };
  try {
    const res = await jwtAxios.post<PostRes>(`${host}/console-test`, params);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // //console.log(res.data);
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};
