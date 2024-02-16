import styled from "styled-components";

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

export const ErrorWrap = styled.div`
  width: 760px;
  height: 50vh;
  margin: 0 auto;
`;

export const ErrorImg = styled.div`
  position: absolute;
  display: inline-block;
  /* z-index: -1; */
  img {
    width: 281px;
    height: 300px;
    z-index: -1;
  }
`;

export const ErrorLogo = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 415px;
    height: 140px;
  }
`;

export const ErrorMainTxt = styled.h2`
  color: ${Common.color.p700};
  text-align: center;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 25px;
`;

export const ErrorSubTxt = styled.h3`
  height: 83px;
  color: ${Common.color.p700};
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
`;

export const ErrorBt = styled.button`
  display: flex;
  width: 759px;
  height: 90px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${Common.color.p700};
  border-radius: 10px;
  border: none;
  font-size: 40px;
  color: #fff;
  cursor: pointer;
`;
