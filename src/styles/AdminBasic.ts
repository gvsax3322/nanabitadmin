import styled from "@emotion/styled";
import { Menu } from "antd";

//노랑
// export const Common = {
//   // 숫자가 작을수록 어두운 색
//   //실수 ;;
//   color: {
//     primary: "#ffe084",
//     p100: "#ffd966",
//     p200: "#ffdc75",
//     p300: "#ffe493",
//     p400: "#ffe8a3",
//     p500: "#ffecb2",
//     p600: "#ffefc1",
//     p700: "#fff3d1",
//     //흰색
//     p000: "#ffffff",
//   },
// };

//검정;
export const Common = {
  color: {
    primary: "#323232",
    p100: "#000000",
    p200: "#191919",
    p300: "#4c4c4c",
    p400: "#666666",
    p500: "#7f7f7f",
    p600: "#999999",
    p700: "#b2b2b2",
    p800: "#cccccc",
    p900: "#eaeaea",
    //흰색
    p000: "#ffffff",
  },
};

//보라
// export const Common = {
//   // 숫자가 작을수록 어두운 색
//   //실수 ;;
//   color: {
//     primary: "#afa3d5",
//     p100: "#8e7cc3",
//     p200: "#9989c9",
//     p300: "#bbb0db",
//     p400: "#c6bde1",
//     p500: "#d1cae7",
//     p600: "#ddd7ed",
//     p700: "#e8e4f3",
//     //흰색
//     p000: "#ffffff",
//   },
// };

// // 핑크
// export const Common = {
//   // 숫자가 작을수록 어두운 색
//   //실수 ;;
//   color: {
//     primary: "#eedae3",
//     p100: "#ead1dc",
//     p200: "#ecd5df",
//     p300: "#f0dee6",
//     p400: "#f2e3ea",
//     p500: "#f4e8ed",
//     p600: "#f6ecf1",
//     p700: "#f8f1f4",
//     //흰색
//     p000: "#ffffff",
//   },
// };

// 큰 레이아웃.
export const LayoutStyle = styled.div`
  display: flex;
  padding: 0 25px;
`;

//메인 레이아읏 여기에 작업 하면됩니다.
export const LayoutMain = styled.div`
  background: #f1f1f1;
  width: 100%;
  min-height: 700px;
  padding: 50px;
  border-radius: 30px;
`;
// 해더 스타일
export const HeaderStyle = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${Common.color.p000};
  color: black;
  .header-top {
    padding: 20px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${Common.color.primary};
    height: 100px;
  }
  .header-top-left {
    display: flex;
    color: ${Common.color.primary};
  }
  .header-top-rigth {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .header-bottom {
    width: 100%;
    ul {
      padding: 20px;
      display: flex;
      justify-content: start;
      gap: 20px;
      li {
        display: flex;
        font-size: 1.5rem;
        padding: 10px;
        cursor: pointer;
        transition: all 300ms ease;
        border: 1px solid ${Common.color.primary};
        border-radius: 10px;
        &:hover {
          background: ${Common.color.p700};
        }
        &:active {
          background: ${Common.color.p100};
          color: ${Common.color.p000};
        }
      }
    }
  }
`;

// 사이드바
export const SidebarStyle = styled(Menu)`
  :where(.css-dev-only-do-not-override-17sses9).ant-menu-light
    .ant-menu-submenu-selected
    > .ant-menu-submenu-title,
  :where(.css-dev-only-do-not-override-17sses9).ant-menu-light
    > .ant-menu
    .ant-menu-submenu-selected
    > .ant-menu-submenu-title {
    color: ${Common.color.p100};
    font-size: 1.5rem;
    font-weight: 700;
  }
  .ant-menu-item-selected {
    background-color: ${Common.color.p700};
    color: white;
    &:active {
      background: ${Common.color.p300} !important;
      color: white;
    }
  }
  .ant-menu-item-only-child {
    &:active {
      background: ${Common.color.p300} !important;
      color: white !important;
    }
  }
`;

//사이드바 버튼
export const SidebarButton = styled.button`
  background: ${Common.color.p700};
  border: none;
  width: 10px;
  height: 30px;
`;

//로그아웃 버튼
export const LogoutButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 50px;
  &:hover {
    background: ${Common.color.p700};
  }
  &:active {
    background: ${Common.color.p100};
    color: ${Common.color.p000};
  }
`;

//아이콘 버튼
export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 50px;
  height: 30px;
  &:hover {
    background: ${Common.color.p700};
  }
  &:active {
    background: ${Common.color.p100};
    color: ${Common.color.p000};
  }
`;

// 큰 버튼
export const BigButton = styled.button`
  background: ${Common.color.p000};
  border: 2px solid ${Common.color.primary};
  border-radius: 10px;
  cursor: pointer;
  border-radius: 10px;
  min-width: 100px;
  height: 50px;
  &:hover {
    background: ${Common.color.p700};
  }
  &:active {
    background: ${Common.color.p100};
    color: ${Common.color.p000};
  }
`;
// 중간 버튼
export const MiddleButton = styled.button`
  background: ${Common.color.p000};
  border: 2px solid ${Common.color.primary};
  border-radius: 10px;
  cursor: pointer;
  border-radius: 9px;
  min-width: 70px;
  height: 40px;
  &:hover {
    background: ${Common.color.p700};
  }
  &:active {
    background: ${Common.color.p100};
    color: ${Common.color.p000};
  }
`;
//작은버튼
export const SmallButton = styled.button`
  background: ${Common.color.p000};
  border: 2px solid ${Common.color.primary};
  border-radius: 10px;
  cursor: pointer;
  border-radius: 7px;
  min-width: 50px;
  height: 30px;
  &:hover {
    background: ${Common.color.p700};
  }
  &:active {
    background: ${Common.color.p100};
    color: ${Common.color.p000};
  }
`;
//삭제버튼
export const DeleteButton = styled.button`
  background: #f44336;
  color: ${Common.color.p000};
  border: 2px solid #f44336;
  border-radius: 10px;
  cursor: pointer;
  border-radius: 7px;
  min-width: 70px;
  height: 40px;
`;
// 검색버튼
export const SearchButton = styled.button`
  background: ${Common.color.primary};
  color: ${Common.color.p000};
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  border-radius: 9px;
  min-width: 50px;
  height: 30px;
  padding: 10px;
`;
// 큰 인풋태그
export const BigInput = styled.input`
  width: 700px;
  height: 25px;
  border-radius: 5px;
  padding: 0 10px;
  border: 2px solid ${Common.color.p500};
`;
// 중간 인풋태그
export const MiddleInput = styled.input`
  width: 300px;
  height: 25px;
  border-radius: 5px;
  padding: 0 10px;
  border: 2px solid ${Common.color.p500};
`;
// 작은 인풋태크
export const SmallInput = styled.input`
  width: 100px;
  height: 25px;
  border-radius: 5px;
  padding: 0 10px;
  border: 2px solid ${Common.color.p500};
`;
export const BigCard = styled.div`
  width: 100%;
  min-height: 450px;
  border-radius: 15px;
  border: 2px solid ${Common.color.primary};
  background: ${Common.color.p000};
  padding: 20px;
  box-shadow: 5px 5px 10px ${Common.color.primary};
  margin-bottom: 20px;
`;

// 중간 카드
export const MiddleCard = styled.div`
  width: 45%;
  min-height: 250px;
  border-radius: 15px;
  border: 2px solid ${Common.color.primary};
  background: ${Common.color.p000};
  padding: 20px;
  box-shadow: 5px 5px 10px ${Common.color.primary};
  margin-bottom: 20px;
`;
//작은 카드
export const SmallCard = styled.div`
  width: 30%;
  min-height: 150px;
  border-radius: 15px;
  border: 2px solid ${Common.color.primary};
  background: ${Common.color.p000};
  padding: 20px;
  box-shadow: 5px 5px 10px ${Common.color.primary};
  margin-bottom: 20px;
`;
// 메인제목
export const MainTitle = styled.div`
  height: 45px;
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;
// 서브제목
export const SubTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px; /* 예시 간격 */
  position: relative;
  margin-left: 10px;
  font-weight: 500;
  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: -10px; /* 예시 위치 */
    transform: translateY(-50%);
    width: 5px;
    height: 30px;
    background: ${Common.color.p100};
  }
`;

// 큰 키워드
export const BigKeyword = styled.div`
  display: flex;
  height: 35px;
  .left {
    width: 10%;
    border-bottom: 1px solid ${Common.color.primary};

    background: ${Common.color.p800};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 500;
  }
  .right {
    width: 90%;
    border-bottom: 1px solid ${Common.color.primary};

    display: flex;
    align-items: center;
    padding-left: 20px;
  }
`;

// 작은 키워드

/* <SmallKeyword>
        <div className="left">왼쪽</div>
        <div className="right">오른쪽</div>
      </SmallKeyword> */

export const SmallKeyword = styled.div`
  display: flex;
  width: 50%;
  height: 35px;
  .left {
    width: 20%;
    border-bottom: 1px solid ${Common.color.primary};

    background: ${Common.color.p700};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    font-weight: 600;
  }
  .right {
    width: 80%;
    border-bottom: 1px solid ${Common.color.primary};

    display: flex;
    align-items: center;
    padding-left: 20px;
  }
`;

// select 스타일
export const SelectStyle = styled.select`
  height: 25px;
  width: 70px;
  border: 2px solid ${Common.color.p500};
  border-radius: 5px;
  margin-right: 7px;
`;
