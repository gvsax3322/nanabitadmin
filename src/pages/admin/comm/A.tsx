import React from "react";
import {
  BigButton,
  BigCard,
  BigInput,
  DeleteButton,
  MiddleButton,
  MiddleCard,
  MiddleInput,
  SearchButton,
  SmallButton,
  SmallCard,
  SmallInput,
} from "../../../styles/AdminBasic";
import { motion } from "framer-motion";

const A = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.7,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      여기서 작업 하세여
      <BigButton>큰버튼</BigButton>
      <MiddleButton>중간버튼</MiddleButton>
      <SmallButton>작은버튼</SmallButton>
      <DeleteButton>삭제버튼</DeleteButton>
      <SearchButton>검색</SearchButton>
      <br />
      <div>큰 Input</div>
      <BigInput type="text" />
      <div>중간 Input</div>
      <br />
      <MiddleInput type="text" />
      <div>작은 Input</div>
      <br />
      <SmallInput type="text" />
      <br />
      <div>중간 카드</div>
      <MiddleCard>중간 카드</MiddleCard>
      <div>작은 카드</div>
      <SmallCard>#f1f1f1작은카드</SmallCard>
      <div>큰 카드</div>
      <BigCard>큰 카드</BigCard>
    </motion.div>
  );
};

export default A;
