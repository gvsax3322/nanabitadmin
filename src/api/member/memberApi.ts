import { ApiResponse, MemberList } from "../../pages/admin/member/MemberModify";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/user`;

// 제품 목록가져오기
export const getMemberList = async (
  successFn: (data: MemberList[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<ApiResponse>(
      `${host}?unregisteredFl=0&keyword=&keywordType=0&before=&after=&phoneNumber=`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};
