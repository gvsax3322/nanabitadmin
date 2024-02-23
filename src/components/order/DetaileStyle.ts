import styled from "@emotion/styled";
import { Common } from "../../styles/AdminBasic";

export const FontSize = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  p,
  b {
    /* margin: 10px; */

    font-size: 18px;
  }
`;
export const CardFont = styled.div`
  position: relative;

  li,
  div {
    display: flex;
  }
  li,
  p,
  b {
    margin-bottom: 10px;
    font-size: 15px;
  }
  b {
    margin-left: auto; /* 기존에 있던 margin-left 속성을 제거하고 */
    text-align: right;
  }
`;

export const DeBigCard = styled.div`
  width: 100%;
  min-height: 200px;
  /* border-radius: 15px; */
  border-top: 2px solid ${Common.color.primary};
  background: ${Common.color.p000};
  padding: 20px;
  /* box-shadow: 5px 5px 10px ${Common.color.primary}; */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

// 중간 카드
export const DeMiddleCard = styled.div`
  width: 45%;
  min-height: 200px;
  /* border-radius: 15px; */
  border: 2px solid #cccccc;
  background: ${Common.color.p000};
  padding: 20px;
  /* box-shadow: 5px 6px 10px ${Common.color.primary}; */
  margin-bottom: 20px;
`;
