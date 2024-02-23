import { useNavigate } from "react-router-dom";
export const useCustomMove = () => {
  // navigate (패스이동 hook)
  const navigate = useNavigate();
  // 뒤로가기
  const moveToPrev = () => {
    navigate(-1);
  };
  // 메인으로 이동
  const moveToMain = () => {
    navigate("/");
  };
  // 로그인으로 이동
  const moveToLogin = () => {
    navigate("/login");
  };
  // 화원가입으로 이동
  const moveToSignUp = () => {
    navigate("/signUp");
  };
  // 커뮤니티로 이동
  const moveToCommu = () => {
    navigate("/commu");
  };
  // 주문조회로 이동
  const moveToOl = () => {
    navigate("/ol");
  };
  //마이페이지로 이동
  const moveToMypage = () => {
    navigate("/mypage");
  };

  const sortBy = () => {};
  return {
    sortBy,
    moveToPrev,
    moveToMain,
    moveToLogin,
    moveToSignUp,
    moveToCommu,
    moveToMypage,

    moveToOl,

    navigate,
  };
};
export default useCustomMove;
