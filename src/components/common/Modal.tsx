import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import React, { useState } from "react";
import { postProduct } from "../../api/mainApi";
import { SearchButton, SubTitle } from "../../styles/AdminBasic";
import { ModalContent, ModalOverlay } from "../../styles/main/main";
import { API_SERVER_HOST } from "../../util/util";
// import { postAlbum } from "../../api/album/album_api";

interface ResultModalProps {
  onClose: () => void;
}
interface Product {
  pics: string[];
  productDetails: string;
  dto: {
    imain: number;
    imiddle: number;
    productNm: string;
    recommendedAge: number;
    price: number;
    remainedCount: number;
    adminMemo: string;
  };
}

const initState: Product = {
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
interface FormData {
  imain: number;
  imiddle: number;
  productNm: string;
  price: number;
  remainedCount: number;
  recommendedAge: number;
  adminMemo: string;
  newFl: number;
  popFl: number;
}
interface WriteAlbumProps {
  albumData: any; // You can specify the correct type for albumData
  submit: () => void;
}
const host = `${API_SERVER_HOST}/api/admin`;

const ResultModal: React.FC<ResultModalProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [fileListDetails, setFileListDetails] = useState<any[]>([]); // State for details Upload.Dragger

  const handleChange = (info: any) => {
    let fileList = [...info.fileList].slice(-4);
    setFileList(fileList);
  };
  // Details Upload.Dragger change handler
  const handleChangeDetails = (info: any) => {
    let fileList = [...info.fileList].slice(-1); // Allow only 1 file for details
    setFileListDetails(fileList);
  };

  // const beforeUpload = (file: File) => {
  //   const isExceedLimit = fileList.length >= 4;
  //   if (isExceedLimit) {
  //     return Upload.LIST_IGNORE;
  //   }
  //   return true;
  // };
  // Details Upload.Dragger before upload handler
  // const beforeUploadDetails = (file: File) => {
  //   return fileListDetails.length === 0; // Allow only 1 file for details
  // };

  const handleCancelConfirmation = () => {
    setSubmitClicked(false);
    onClose();
  };

  const handleFormSubmit = () => {
    if (fileList.length === 0) {
      return;
    }
    setSubmitClicked(true);
    form.submit();
  };

  const onFinish = async (data: FormData) => {
    console.log(data);
    if (!submitClicked) return;
    if (fileList.length === 0) {
      return;
    }
    const formData = new FormData();
    const dto = new Blob(
      [
        JSON.stringify({
          imain: data.imain,
          imiddle: data.imiddle,
          productNm: data.productNm,
          recommendedAge: data.recommendedAge,
          adminMemo: data.adminMemo,
          price: data.price,
          remainedCount: data.remainedCount,
          newFl: data.newFl,
          popFl: data.popFl,
        }),
      ],
      { type: "application/json" },
    );
    formData.append("dto", dto);

    fileList.forEach(file => {
      formData.append(`pics`, file.originFileObj);
    });
    fileListDetails.forEach(file => {
      formData.append(`productDetails`, file.originFileObj);
    });
    const values = formData.values();
    for (const pair of values) {
      console.log("pair", pair);
    }

    postProduct({
      product: formData,
    });

    setSubmitClicked(false);
    onClose();
  };

  const uploadAreaStyle = {
    lineHeight: "15rem",
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          <SubTitle>상품명</SubTitle>
          <Form form={form} onFinish={onFinish}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                }}
              >
                <Form.Item
                  name="imain"
                  rules={[{ required: true, message: "제목을 입력해주세요!" }]}
                  style={{ width: "650px" }}
                >
                  <Select placeholder="카테고리 대분류">
                    <Select.Option value={1}>Demo</Select.Option>
                    <Select.Option value={2}>Demo</Select.Option>
                    <Select.Option value={3}>Demo</Select.Option>
                    <Select.Option value={4}>Demo</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="imiddle"
                  rules={[{ required: true, message: "제목을 입력해주세요!" }]}
                  style={{ width: "650px" }}
                >
                  <Select placeholder="카테고리 중분류">
                    <Select.Option value={1}>Demo</Select.Option>
                    <Select.Option value={2}>Demo</Select.Option>
                    <Select.Option value={3}>Demo</Select.Option>
                    <Select.Option value={4}>Demo</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <SubTitle>새상품</SubTitle>
              <Form.Item
                name="newFl"
                rules={[{ required: true, message: "제목을 입력해주세요!" }]}
              >
                <Select placeholder="카테고리 중분류">
                  <Select.Option value={1}>Demo</Select.Option>
                  <Select.Option value={2}>Demo</Select.Option>
                  <Select.Option value={3}>Demo</Select.Option>
                  <Select.Option value={4}>Demo</Select.Option>
                </Select>
              </Form.Item>
              <SubTitle>인기상품</SubTitle>
              <Form.Item
                name="popFl"
                rules={[{ required: true, message: "제목을 입력해주세요!" }]}
              >
                <Select placeholder="카테고리 중분류">
                  <Select.Option value={1}>Demo</Select.Option>
                  <Select.Option value={2}>Demo</Select.Option>
                  <Select.Option value={3}>Demo</Select.Option>
                  <Select.Option value={4}>Demo</Select.Option>
                </Select>
              </Form.Item>
              <SubTitle>인기상품</SubTitle>
              <Form.Item
                name="productNm"
                rules={[{ required: true, message: "제목을 입력해주세요!" }]}
              >
                <Input placeholder="상품명 입력" />
              </Form.Item>
              <SubTitle>인기상품</SubTitle>
              <Form.Item
                name="recommendedAge"
                rules={[{ required: true, message: "제목을 입력해주세요!" }]}
              >
                <InputNumber placeholder="상품명 입력" controls={false} />
              </Form.Item>
              <SubTitle>인기상품</SubTitle>
              <Form.Item
                name="price"
                rules={[{ required: true, message: "제목을 입력해주세요!" }]}
              >
                <InputNumber placeholder="상품명 입력" controls={false} />
              </Form.Item>
              <SubTitle>인기상품</SubTitle>
              <Form.Item
                name="remainedCount"
                rules={[{ required: true, message: "제목을 입력해주세요!" }]}
              >
                <InputNumber placeholder="상품명 입력" controls={false} />
              </Form.Item>
              <SubTitle>상품명</SubTitle>
              <Form.Item
                style={{ height: "150px" }}
                name="adminMemo"
                rules={[{ required: true, message: "내용을 입력해주세요!" }]}
              >
                <Input.TextArea
                  placeholder="내용 입력"
                  style={{ height: "150px" }}
                />
              </Form.Item>
              <SubTitle>상품명</SubTitle>
              <div style={{ marginBottom: "30px" }}>
                <Upload.Dragger
                   action={`${host}`}
                  listType="picture"
                  fileList={fileList}
                  onChange={handleChange}
                  className="upload-list-inline"
                  multiple={true}
                  style={uploadAreaStyle}
                  beforeUpload={() => false}
                  maxCount={4}
                >
                  <Button icon={<UploadOutlined />}>업로드(최대 4개) </Button>
                </Upload.Dragger>
              </div>
              <SubTitle>상품명</SubTitle>
              <div style={{ marginBottom: "30px" }}>
                <Upload.Dragger
                  action={`${host}`}
                  listType="picture"
                  fileList={fileListDetails}
                  onChange={handleChangeDetails}
                  className="upload-list-inline"
                  multiple={false}
                  style={uploadAreaStyle}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>업로드(최대 4개) </Button>
                </Upload.Dragger>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                marginBottom: "20px",
              }}
            >
              <SearchButton type="button" onClick={handleFormSubmit}>
                등록
              </SearchButton>
              <SearchButton
                onClick={handleCancelConfirmation}
                style={{ background: " #f44336" }}
              >
                취소
              </SearchButton>
            </div>
          </Form>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;
