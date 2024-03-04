import { ConfigProvider, Rate, Table } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import {
  BigInput,
  MainTitle,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { SearchReview } from "./ReviewSearch";
import { API_SERVER_HOST } from "../../util/util";
import { ReviewContents } from "../../styles/review/reviewstyle";

interface ResultModalProps {
  onClose: () => void;
  modalData: SearchReview | undefined;
}

const ModalOverlay = styled.div`
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

const ModalContent = styled(motion.div)`
  width: 80%;
  height: 80%;
  overflow-y: auto;
  background: #ffffff;
  padding: 20px;
`;
const CenteredHeaderTable = styled(Table)`
  &&& {
    .ant-table-thead > tr > th {
      text-align: center;
    }
    .ant-table-tbody > tr > td {
      text-align: center;
    }
  }
`;

const ReviewModal: React.FC<ResultModalProps> = ({ onClose, modalData }) => {
  interface IDataItem {
    img: JSX.Element;
    pnum: string;
    pname: string;
    price: number;
    deletebt: JSX.Element;
  }
  const columns = [
    {
      title: "미리보기",
      dataIndex: "img",
      width: "100px",
    },
    {
      title: "상품코드",
      dataIndex: "pnum",
    },
    {
      title: "상품명",
      dataIndex: "pname",
    },
    {
      title: "가격",
      dataIndex: "price",
      render: (price: number) => <span>{price.toLocaleString()}</span>,
    },
    {
      title: "삭제",
      dataIndex: "deletebt",
      width: "80px",
    },
  ];
  // 이미지 설정 설정
  const defaultImgUrl = `${process.env.PUBLIC_URL}/assets/images/defaultitemimg.svg`;
  const handleApply = () => {
    console.log("등록할거라능");
  };

  const dataSource = (modalData: SearchReview) => ({
    item: modalData,
    nm: modalData.nm,
    reqReviewPic: `${API_SERVER_HOST}/pic/review/${modalData.ireview}/${modalData.reqReviewPic}`,
    iproduct: modalData.iproduct,
    productNm: modalData.productNm,
    contents: modalData.contents,
    productScore: modalData.productScore,
    delFl: modalData.delFl,
  });

  return (
    <ModalOverlay onClick={onClose}>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorText: "#d9d9d9",
              colorPrimary: "#7f7f7f",
              colorLink: "#7f7f7f",
              colorLinkActive: "#7f7f7f",
              colorPrimaryActive: "#7f7f7f",
              colorPrimaryBorder: "#7f7f7f",
              colorPrimaryHover: "#7f7f7f",

              /* here is your component tokens */
            },
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      >
        <ModalContent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          onClick={e => e.stopPropagation()}
        >
          {/* 모달 내용 */}
          <MainTitle>숨김처리</MainTitle>
          <SubTitle>리뷰 내용</SubTitle>
          <div style={{ marginBottom: "20px" }}>
            <ReviewContents>
              <img
                style={{ width: "170px", height: "170px" }}
                src={`${API_SERVER_HOST}/pic/review/${modalData?.ireview}/${modalData?.reqReviewPic}`}
                alt=""
              />
              <Rate disabled defaultValue={modalData?.productScore} />
            </ReviewContents>
          </div>
          {/* 결과 테이블 */}
          <SubTitle>사유 작성</SubTitle>
          <BigInput />
        </ModalContent>
      </ConfigProvider>
    </ModalOverlay>
  );
};
export default ReviewModal;
