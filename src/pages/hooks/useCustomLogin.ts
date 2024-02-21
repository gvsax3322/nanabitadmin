import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, loginPostAsync, logout } from "../../redux/loginSlice";
import { LoginParams } from "../admin/login/LoginPage";

export interface LoginFunctions {
  loginParam: LoginParams;
  successFn: (data: any) => void;
  failFn: (error: string) => void;
  errorFn: (error: string) => void;
}

export interface ApiResponse {
  code: string;
  message: string;
  data: {
    nm: string;
    result: number;
    accessToken: string;
  };
}

const useCustomLogin = () => {
  // 패스 이동하기
  const navigate = useNavigate();

  // RTK 상태값 업데이트
  const dispatch = useDispatch();

  // RTK 상태값 읽기
  const loginState = useSelector((state: RootState) => state.loginSlice);

  // 로그인 상태값 파악
  const isLogin = !!loginState.nm; // nm 값이 존재할 때 true를 반환하도록 수정

  const doLogin = async ({
    loginParam,
    successFn,
    failFn,
    errorFn,
  }: LoginFunctions) => {
    // try {
    //   const res = await dispatch(
    //     loginPostAsync({ loginParam, successFn, failFn, errorFn }),
    //   );
    //   return res;
    // } catch (error) {
    //   errorFn("에러가 발생했어요");
    // }
  };
  // 로그아웃 기능
  const doLogout = () => {
    dispatch(logout());
  };

  // 패스이동 기능
  const moveToPath = (path: string) => {
    // 패스로 이동 후에 replace: true 를 적용하여 이전 페이지 기록을 남기지 않음
    navigate(path, { replace: true });
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
  };
};

export default useCustomLogin;
