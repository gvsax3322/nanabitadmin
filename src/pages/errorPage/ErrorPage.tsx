import React from "react";
import { useNavigate } from "react-router";
import {
  ErrorBt,
  ErrorImg,
  ErrorLogo,
  ErrorMainTxt,
  ErrorSubTxt,
  ErrorWrap,
} from "../../styles/errorpage/errorpagestyle";
import { LoginHeader } from "../../styles/loginpage/loginpagestyle";
import useCustomLogin from "../hooks/useCustomLogin";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { isLogin, loginState } = useCustomLogin();

  const handleClickMain = () => {
    if (isLogin) {
      navigate("/admin");
      console.log("로그인됨");
      console.log(isLogin);
    } else {
      navigate("/");
      console.log("로그인 안됨");
      console.log(loginState.nm);
    }
  };
  return (
    <ErrorWrap>
      <LoginHeader style={{ height: "150px" }} />
      <ErrorImg>
        <img
          src={process.env.PUBLIC_URL + "/assets/images/ErrorImg.svg"}
          alt="error"
        />
      </ErrorImg>
      <ErrorLogo>
        <img
          src={process.env.PUBLIC_URL + "/assets/images/logo.svg"}
          alt="logo"
        />
      </ErrorLogo>
      <ErrorMainTxt>원하시는 페이지를 찾을 수 없습니다.</ErrorMainTxt>
      <ErrorSubTxt>
        찾으려는 페이지의 주소가 잘못 입력되었거나 주소의 변경 혹은 삭제로
        사용하실 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인 부탁드립니다.
      </ErrorSubTxt>
      <ErrorBt
        onClick={() => {
          handleClickMain();
        }}
      >
        홈 바로가기
      </ErrorBt>
    </ErrorWrap>
  );
};

export default ErrorPage;
