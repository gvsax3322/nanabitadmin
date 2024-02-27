import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Form, Input, Upload } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  BigKeyword,
  Common,
  MainTitle,
  SelectStyle,
  SubTitle,
  TextareaStyle
} from "../../styles/AdminBasic";

interface ResultModalProps {
  onClose: () => void;
}
interface DTO {
  imain: number;
  imiddle: number;
  productNm: string;
  recommandAge: number;
  price: number;
  remainedCnt: number;
}

interface Product {
  pics: string[];
  productDetails: string;
  dto: DTO;
  dResultModalProps: { onClose: () => void };
}

const initState = {
  pics: [],
  productDetails: "",
  dto: {
    imain: 0,
    imiddle: 0,
    productNm: "",
    recommendedAge: 0,
    adminMemo: "",
    price: 0,
    remainedCount: 0,
  },
};
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
  //초기값
  const [productInfo, setProductInfo] = useState(initState);
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
          initialValues={{
            remember: true,
            pics: ["string"],
            productDetails: "string",
            dto: {
              imain: 0,
              imiddle: 0,
              productNm: "string",
              recommendedAge: 0,
              adminMemo: "string",
              price: 0,
              remainedCount: 0,
            },
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
          

          <motion.div
            style={{ marginBottom: "15px", width: "100%" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SelectStyle
              style={{ width: "49%", height: "35px", marginRight: "20px" }}
              name="imain"
            >
              {/* Use the optionone prop for the label of the first option */}
              <option value={1}>옵션 1</option>
              <option value={2}>옵션 2</option>
              <option value={3}>옵션 3</option>
            </SelectStyle>
            <SelectStyle
              style={{ width: "49%", height: "35px" }}
              name="imiddle"
            >
              {/* Use the optionone prop for the label of the first option */}
              <option value={1}>옵션 1</option>
              <option value={2}>옵션 2</option>
              <option value={3}>옵션 3</option>
            </SelectStyle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Form.Item name="productNm">
              <Input placeholder="상품명" />
            </Form.Item>
          </motion.div>

          <motion.div
            style={{ marginBottom: "15px", width: "100%" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Form.Item name="productNm">
              <Input name="recommendedAge" placeholder="나이" />
            </Form.Item>
          </motion.div>

          <motion.div
            style={{ marginBottom: "15px", width: "100%" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Form.Item name="productNm">
              <Input
                name="price"
                placeholder="상품 가격"
                style={{ width: "1320px" }}
              />
            </Form.Item>
          </motion.div>

          <motion.div
            style={{ marginBottom: "15px", width: "100%" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Form.Item name="productNm">
              <Input
                name="remainedCount"
                placeholder="재고"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <SubTitle>상품 이미지</SubTitle>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={4}
              multiple
              accept="image/png,image/jpeg,image/jpg,"
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <div>
              <i>최대 5장까지 업로드 가능합니다.</i>
            </div>
            <BigKeyword
              style={{
                borderTop: `1px solid ${Common.color.primary}`,
                marginBottom: "20px",
              }}
            >
              <div className="left">관리자메모</div>
              <div className="right">
                <TextareaStyle name="adminMemo" id="notes" />
              </div>
            </BigKeyword>
          </motion.div>
          <div className="buttonDiv">
            <Form.Item>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.8,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <LoadBt type="primary" htmlType="submit">
                  작성완료
                </LoadBt>
              </motion.div>
            </Form.Item>
          </div>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;
