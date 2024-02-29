import { motion } from "framer-motion";
import styled from "styled-components";
import { Common } from "../AdminBasic";

export const OrderList = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const MainWrap = styled.div`
  margin: 0 auto;
`;
export const MainBt = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

export const ModalContent = styled(motion.div)`
  width: 1440px;
  height: 850px;
  overflow-y: auto;
  background: #ffffff;
  padding: 20px;
`;

export const SelectCate = styled.select`
  height: 25px;
  width: 146px;
  border: 1px solid ${Common.color.p500};
  border-radius: 5px;
  margin-right: 7px;
`;

