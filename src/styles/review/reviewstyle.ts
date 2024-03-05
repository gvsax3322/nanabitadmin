import styled from "styled-components";
import { Common } from "../AdminBasic";

export const ReviewContents = styled.div`
  display: flex;
  justify-content: left;
  align-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 200px;
  width: 170px;
  gap: 10px;
`;

export const ReviewText = styled.div`
  p {
    white-space: inherit;
    word-break: break-all;
  }
`;
export const ChangeRate = styled.div`
  span {
    font-size: 10px;
  }
`;

export const FlexJADiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
