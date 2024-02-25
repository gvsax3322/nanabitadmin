import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  BigKeyword,
  Common,
  MainTitle,
  SubTitle,
  TextareaStyle,
} from "../../styles/AdminBasic";
import { TableTicket } from "../main/TableTicket";
import { SeletCt } from "../select/SeletCt";
import { Button, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";

interface ResultModalProps {
  onClose: () => void;
}

const initState = [
  {
    reviewPics: [""], // 리뷰 사진
    dto: {
      idetails: 0, //   주문상세 KEY
      iorder: 0, //   주문 PK
      contents: "", //   리뷰 내용
      productScore: 0, //   리뷰 별점
    },
  },
];

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

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
  width: 1440px;
  height: 850px;
  overflow-y: auto;
  background: #ffffff;
  padding: 20px;
`;
const LoadBt = styled(Button)`
  background: ${Common.color.primary};
  color: ${Common.color.p000};
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  border-radius: 20px;
  min-width: 50px;
  height: 30px;
  padding: 10px;
`;
const ResultModal: React.FC<ResultModalProps> = ({ onClose }) => {
  // ================ 파일 업로드
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  // 업로드할 이미지 모음
  const [uploadFileList, setUploadFileList] = useState([]);
  const [uploadImgFile, setUploadImgFile] = useState(null);

  const handleSubmit = async (value: any) => {
    const formData = new FormData();
    const dto = new Blob();
    // [
    //   JSON.stringify({
    //     idetails: idetails,
    //     iorder: iorder,
    //     contents: value.contents,
    //     productScore: value.start,
    //   }),
    // ],
    // // JSON 형식으로 설정
    // { type: "application/json" },

    formData.append("dto", dto);
    const imagePromises = uploadFileList.map(async (image, index) => {
      const response = await fetch(image);
      const blob = await response.blob();
      const currentDate = new Date();
      const seconds = Math.floor(currentDate.getTime() / 1000);
      const file = new File([blob], `image${seconds}.jpg`, {
        type: "image/jpeg",
      });
      formData.append("reviewPics", file);
    });
    await Promise.all(imagePromises);

    // 아래에서 전송코드 실행
    // postReviewList(iproduct, {
    //   paramData: formData,
    //   successFn: successFnPost,
    //   failFn: failFnPost,
    //   errorFn: errorFnPost,
    // });
  };
  // const successFnPost = (result:any) => {
  //   console.log("성공", result);
  //   // Navigate(`../review?page=1`);
  // };
  // const failFnPost = (result:any) => {
  //   console.log("실패", result);
  // };
  // const errorFnPost = (result:any) => {
  //   console.log("서버오류", result);
  // };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // =========== Ant 디자인 미리보기
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };
  // Antd 이미지 업로드
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  // 파일 목록관리
  const handleChange = ({ fileList: newFileList }: any) => {
    // console.log("fileList", fileList);
    setFileList(newFileList);
    setUploadFileList([]);
  };
  // 서버에 보낼 이미지 목록을 파일로 보관하면서 담아둠
  // const fileUpdate = () => {
  //   fileList.map(file => {
  //     if (file.originFileObj) {
  //       // 미리보기
  //       const tempUrl = URL.createObjectURL(file.originFileObj);
  //       console.log(tempUrl);
  //       // FB 파일을 보관
  //       setUploadImgFile(file.originFileObj); // 파일 1개 추가 끝
  //       setUploadFileList(prevImages => [...prevImages, tempUrl]);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   fileUpdate();
  // }, [fileList]);

  // 버튼 디자인
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        {/* 모달 내용 */}
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
          ></Form.Item>
          <MainTitle>신규 상품등록</MainTitle>
          <SubTitle>카테고리</SubTitle>
          <div style={{ marginBottom: "15px" }}>
            <SeletCt />
            <SeletCt />
          </div>
          <TableTicket title="기본정보" />
          <TableTicket title="가격 및 재고" />
          <TableTicket title="상품이미지 및 상세정보" />
          <BigKeyword
            style={{
              borderTop: `1px solid ${Common.color.primary}`,
              marginBottom: "20px",
            }}
          >
            <div className="left">관리자메모</div>
            <div className="right">
              <TextareaStyle name="notes" id="notes"></TextareaStyle>
            </div>
          </BigKeyword>

          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={5}
            multiple
            accept="image/png,image/jpeg,image/jpg,"
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>

          <div>
            <i>최대 5장까지 업로드 가능합니다.</i>
          </div>
          <div className="buttonDiv">
            <Form.Item>
              <LoadBt type="primary" htmlType="submit">
                작성완료
              </LoadBt>
            </Form.Item>
          </div>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;
