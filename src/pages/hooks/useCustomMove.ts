import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const useCustomMove = () => {
  const navigate = useNavigate();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  let page: number = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page") as string)
    : 1;
  let size: number = urlSearchParams.get("size")
    ? parseInt(urlSearchParams.get("size") as string)
    : 10;

  const queryStrDefault = createSearchParams({
    page: String(page),
    size: String(size),
  }).toString();

  const moveToList = (pageParam?: { page?: number; size?: number }) => {
    let queryStr = "";
    if (pageParam) {
      page = pageParam.page ?? page;
      size = pageParam.size ?? size;

      queryStr = createSearchParams({
        page: String(page),
        size: String(size),
      }).toString();
    } else {
      queryStr = queryStrDefault;
    }
    navigate({ pathname: "../member/modify", search: queryStr });
  };

  const moveToPrev = () => {
    navigate(-1);
  };

  const moveToMain = () => {
    navigate("/");
  };

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signUp");
  };

  const moveToCommu = () => {
    navigate("/commu");
  };

  const moveToOl = () => {
    navigate("/ol");
  };

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
    moveToList,
    navigate,
  };
};

export default useCustomMove;
