import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../util/util";

const host = `${API_SERVER_HOST}/api/admin/board`;

export const getBoard = async (keyword?: string) => {
  try {
    const url = keyword ? `${host}?keyword=${keyword}` : host;
    const res = await jwtAxios.get(url);
    return res.data.data;
  } catch (error) {
    // //console.log("목록 호출 서버 에러에요");
  }
};

export const getAnswer = async (a: number) => {
  try {
    const res = await jwtAxios.get(`${host}/${a}`);
    // //console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    // //console.log("목록 호출 서버 에러에요");
  }
};

export const postDabbyeon = async (n: number, board: any) => {
  try {
    const res = await jwtAxios.post(`${host}/${n}`, board);
    return res.data;
  } catch (error) {
    // //console.log(error);
  }
};

export const DeldelDabbyeon = async (n: number, board: number) => {
  try {
    const res = await jwtAxios.delete(`${host}/${n}?icomment=${board}`);
    return res.data;
  } catch (error) {
    // //console.log(error);
  }
};

export const DeldelBoard = async (board: any) => {
  try {
    const res = await jwtAxios.delete(`${host}?iboard=${board}`);
    return res.data;
  } catch (error) {
    // //console.log(error);
  }
};
