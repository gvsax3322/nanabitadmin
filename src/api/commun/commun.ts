import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/board`;

export const getBoard = async (keyword?: string) => {
  try {
    const url = keyword ? `${host}?keyword=${keyword}` : host;
    const res = await jwtAxios.get(url);
    return res.data.data;
  } catch (error) {
    console.log("목록 호출 서버 에러에요");
  }
};

export const getAnswer = async (a: number) => {
  try {
    const res = await jwtAxios.get(`${host}/${a}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log("목록 호출 서버 에러에요");
  }
};
