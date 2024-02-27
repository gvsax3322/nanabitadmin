import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Form, Input, Upload } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  BigKeyword,
  Common,
  DeleteButton,
  MainTitle,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SmallButton,
  SmallInput,
  SubTitle,
  TextareaStyle,
} from "../../styles/AdminBasic";
import OrderAllSelect from "../order/orderSlect/OrderAllSelect";
import OrderPicker from "../order/orderSlect/OrderPicker";
import Select from "../select/Select";

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

  const handleClickPost = () => {
    console.log("post");
    onClose();
  };

  const SelectCate = styled.select`
    height: 25px;
    width: 146px;
    border: 1px solid ${Common.color.p500};
    border-radius: 5px;
    margin-right: 7px;
  `;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <MainTitle>신규 상품등록</MainTitle>
        <SubTitle>기본 정보</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">카테고리</div>
            <div className="right">
              <SelectCate />
              <SelectCate />
            </div>
          </BigKeyword>

          <BigKeyword>
            <div className="left">상품명</div>
            <div className="right">
              <MiddleInput />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">상품가격</div>
            <div className="right">
              <MiddleInput />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">상품 재고</div>
            <div className="right">
              <MiddleInput />
            </div>
          </BigKeyword>
        </div>
        <SubTitle>이미지 등록</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">이미지1</div>
            <div className="right">
              <input type="file" />
            </div>
          </BigKeyword>

          <BigKeyword>
            <div className="left">이미지2</div>
            <div className="right">
              <input type="file" />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">이미지3</div>
            <div className="right">
              <input type="file" />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">이미지4</div>
            <div className="right">
              <input type="file" />
            </div>
          </BigKeyword>
        </div>
        <SubTitle>상품 상세보기</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">이미지1</div>
            <div className="right">
              <input type="file" />
            </div>
          </BigKeyword>
        </div>

        <SubTitle>관리자 메모</SubTitle>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginBottom: "20px",
            marginTop: "40px",
          }}
        >
          <SearchButton onClick={handleClickPost}>완료</SearchButton>
          <SearchButton style={{ background: " #f44336" }} onClick={onClose}>
            취소
          </SearchButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;