import React from "react";
import { Outlet } from "react-router";
import { CommonData } from "../../datas/data";
import Sidebar from "../../layouts/adminlayout/Sidebar";
import {
  LayoutMain,
  LayoutStyle
} from "../../styles/AdminBasic";

const Member = () => {
  return (
    <LayoutStyle>
      {/* data={???} 넘기세요 */}
      <Sidebar data={CommonData} />
      <LayoutMain>
        {/* 여기서 작업 하세여
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
        <SmallCard>작은카드</SmallCard>
        <div>큰 카드</div>
        <BigCard>큰 카드</BigCard> */}
        <Outlet />
      </LayoutMain>
    </LayoutStyle>
  );
};

export default Member;
