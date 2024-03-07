import { ConfigProvider, Input, Rate, Table, message } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import {
  BigKeyword,
  Common,
  MainTitle,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { ReviewContents, ReviewText } from "../../styles/review/reviewstyle";
import { API_SERVER_HOST } from "../../util/util";
import { SearchReview } from "./ReviewSearch";
import { patchReview, putReview } from "../../api/review/reviewApi";

interface ResultModalProps {
  modalData: SearchReview | undefined;
  onClose: () => void;
  successEvent: (txt: string) => void;
  warningEvent: (txt: string) => void;
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

const ReviewModal: React.FC<ResultModalProps> = ({
  onClose,
  modalData,
  successEvent,
  warningEvent,
}) => {
  const [memoD, setMemoD] = useState("");
  const [refresh, setRefresh] = useState(0);
  const ireview = modalData?.ireview;

  const handleApply = () => {
    if (ireview !== undefined) {
      // console.log("ireview", ireview);
      // console.log("memoD", memoD);
      putReview(putSuccessFn, putFailFn, putErrorFn, ireview);
      patchReview(successFn, failFn, errorFn, ireview, memoD);
    } else {
      console.error("ireview가 정의되지 않았습니다.");
    }
  };

  const successFn = () => {
    onClose();
    setRefresh(refresh + 1);
    successEvent(`${modalData?.nm}님의 리뷰가 숨겨졌습니다.`);
  };
  const failFn = () => {
    warningEvent(`숨기기 실패하였습니다. 다시 시도해 주세요.`);
  };
  const errorFn = () => {
    warningEvent(`숨기기 실패하였습니다. 다시 시도해 주세요.`);
  };

  const putSuccessFn = () => {
    // console.log("등록 성공");
    setRefresh(refresh + 1);
  };
  const putFailFn = () => {
    console.log("등록 실패");
  };
  const putErrorFn = () => {
    console.log("등록 에러");
  };

  const handleInput = (e: any) => {
    setMemoD(e.target.value);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
            Input: {
              colorText: "#7f7f7f",
              colorPrimary: "#7f7f7f",
              colorPrimaryHover: "#7f7f7f",
              addonBg: "rgba(0, 0, 0, 0.01)",
              paddingBlock: 10,
              paddingInline: 15,
            },
          },
        }}
      >
        <ModalContent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          onClick={e => e.stopPropagation()}
        >
          {/* 모달 내용 */}
          <MainTitle>숨김처리</MainTitle>
          <SubTitle>리뷰 내용 </SubTitle>
          <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
            <ReviewContents>
              <img
                style={{ width: "170px", height: "170px" }}
                src={`${API_SERVER_HOST}/pic/review/${modalData?.ireview}/${modalData?.reqReviewPic}`}
                alt=""
              />
              <Rate disabled defaultValue={modalData?.productScore} />
            </ReviewContents>

            <div style={{ width: "100%", fontSize: "15px" }}>
              <BigKeyword
                style={{
                  borderTop: `1px solid ${Common.color.primary}`,
                  height: "25px",
                  width: "100%",
                }}
              >
                <div className="left" style={{ width: "130px" }}>
                  유저명
                </div>
                <div className="right">
                  <p>{modalData?.nm}</p>
                </div>
              </BigKeyword>
              <BigKeyword
                style={{
                  height: "25px",
                  width: "100%",
                }}
              >
                <div className="left" style={{ width: "130px" }}>
                  상품명
                </div>
                <div className="right">
                  <p>{modalData?.productNm}</p>
                </div>
              </BigKeyword>
              <BigKeyword
                style={{
                  height: "25px",
                  width: "100%",
                }}
              >
                <div
                  className="left"
                  style={{ width: "130px", height: "130px" }}
                >
                  리뷰
                </div>
                <ReviewText className="right" style={{ height: "130px" }}>
                  <p>{modalData?.contents}</p>
                </ReviewText>
              </BigKeyword>
            </div>
          </div>
          {/* 결과 테이블 */}
          <SubTitle>
            사유 작성{" "}
            <span style={{ fontSize: "12px", lineHeight: "12px" }}>
              숨김처리 사유가 확실하여야 합니다.
            </span>
          </SubTitle>
          <Input.TextArea
            placeholder="숨김처리 사유가 확실하여야 합니다."
            style={{ height: "300px" }}
            maxLength={500}
            onChange={e => handleInput(e)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <SearchButton onClick={handleApply}>숨김</SearchButton>
          </div>
        </ModalContent>
      </ConfigProvider>
    </ModalOverlay>
  );
};
export default ReviewModal;
