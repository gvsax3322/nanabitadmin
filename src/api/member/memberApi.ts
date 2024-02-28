import {
  MemberData,
  PersonApiResponse,
} from "../../components/member/modal/MemberModifyMD";
import { ResRegister } from "../../pages/admin/member/DailyReg";
import {
  MemberApiResponse,
  MemberList,
} from "../../pages/admin/member/MemberModify";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/user`;

// 탈퇴안한 회원정보 가져오기
export const getMemberList = async (
  successFn: (data: MemberList[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  keyword: string = "",
  keywordType: number = 0,
  before: string = "",
  after: string = "",
  phoneNumber: string = "",
  page: number = 1,
  size: number = 10,
) => {
  try {
    const res = await jwtAxios.get<MemberApiResponse>(
      `${host}?unregisteredFl=0&keyword=${keyword}&keywordType=${keywordType}&before=${before}&after=${after}&phoneNumber=${phoneNumber}&page=${page}&size=${size}&sort=string`,
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

// 탈퇴한 회원정보 가져오기
export const getExMemberList = async (
  successFn: (data: MemberList[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  keyword: string = "",
  keywordType: number = 0,
  page: number = 1,
  size: number = 10,
) => {
  try {
    const res = await jwtAxios.get<MemberApiResponse>(
      `${host}?unregisteredFl=1&keyword=${keyword}&keywordType=${keywordType}&before=&after=&phoneNumber=&page=${page}&size=${size}&sort=string`,
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

// 회원정보 하나 가져오기
export const getMember = async (
  successFn: (data: MemberData[]) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
  iuser: number,
) => {
  try {
    const res = await jwtAxios.get<PersonApiResponse>(`${host}/${iuser}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn([res.data.data]);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

export const getRegister = async (
  year: number = 2024,
  month: number = 0,
  successFn: (data: ResRegister) => void,
  failFn: (error: string) => void,
  errorFn: (error: string) => void,
) => {
  try {
    const res = await jwtAxios.get<ResRegister>(
      `${host}/signup?year=${year}&month=${month}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log(res.data);
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};
