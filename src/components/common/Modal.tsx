import { UploadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, InputNumber, Upload } from "antd";
import React, { useState } from "react";
import { postProduct } from "../../api/mainApi";
import {
  BigKeyword,
  Common,
  MainTitle,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { ModalContent, ModalOverlay } from "../../styles/main/main";
import { API_SERVER_HOST } from "../../util/util";
import CategorySelector from "./SearchCt";
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
    recommandAge: number;
    price: number;
    remainedCount: number;
    adminMemo: string;
  };
}

interface FormData {
  imain: number;
  imiddle: number;
  productNm: string;
  price: number;
  remainedCnt: number;
  recommandAge: number;
  adminMemo: string;
}

const host = `${API_SERVER_HOST}/api/admin`;

const ResultModal: React.FC<ResultModalProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [activeSubcategory, setActiveSubcategory] = useState<number>(1);

  const handleSubcategoryClick = (subcategory: number) => {
    setActiveSubcategory(subcategory);
  };

  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [fileListDetails, setFileListDetails] = useState<any[]>([]); // State for details Upload.Dragger
  const [searchimain, setSearchimain] = useState<number | undefined>(undefined);
  const [searchimiddle, setSearchimiddle] = useState<number | undefined>(
    undefined,
  );
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
          imain: searchimain,
          imiddle: searchimiddle,
          productNm: data.productNm,
          recommandAge: activeSubcategory,
          adminMemo: data.adminMemo,
          price: data.price,
          remainedCnt: data.remainedCnt,
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

  function handClickImain(data: any): void {
    console.log("main", data);
    setSearchimain(data);
  }
  function handClickImiddle(data: any): void {
    console.log("middle", data);
    setSearchimiddle(data);
  }
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <MainTitle>상품관리 상세페이지</MainTitle>
        <div>
          <SubTitle>기본 정보</SubTitle>
          <Form form={form} onFinish={onFinish}>
            <div style={{ marginBottom: "20px" }}>
              <BigKeyword
                style={{ borderTop: `1px solid ${Common.color.primary}` }}
              >
                <div className="left">상품명</div>
                <div className="right">
                  <Form.Item
                    name="productNm"
                    style={{
                      height: "25px",
                      marginBottom: "6px",
                    }}
                  >
                    <Input
                      style={{
                        width: "500px",
                        height: "25px",
                        border: `1px solid ${Common.color.p500}`,
                      }}
                    />
                  </Form.Item>
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">카테고리</div>
                <div className="right">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "30px",
                    }}
                  >
                    <CategorySelector
                      searchImain={handClickImain}
                      searchImiddle={handClickImiddle}
                    />
                  </div>
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">나이별상품</div>
                <div className="right">
                  <Form.Item
                    name="recommandAge"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "6px",
                      marginTop: "6px",
                    }}
                  >
                    <ConfigProvider
                      autoInsertSpaceInButton={false}
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: "#a5a5a5",

                          // Alias Token
                          colorBgContainer: "#fff",
                        },
                      }}
                    >
                      <Button
                        type={activeSubcategory === 1 ? "primary" : "default"}
                        onClick={() => handleSubcategoryClick(1)}
                        style={{
                          marginRight: "10px",
                          border: `1px solid ${Common.color.p500}`,
                        }}
                      >
                        초기(4~6개월)
                      </Button>
                    </ConfigProvider>
                    <ConfigProvider
                      autoInsertSpaceInButton={false}
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: "#a5a5a5",

                          // Alias Token
                          colorBgContainer: "#fff",
                        },
                      }}
                    >
                      <Button
                        type={activeSubcategory === 2 ? "primary" : "default"}
                        onClick={() => handleSubcategoryClick(2)}
                        style={{
                          marginRight: "10px",
                          border: `1px solid ${Common.color.p500}`,
                        }}
                      >
                        중기(7~9개월)
                      </Button>
                    </ConfigProvider>
                    <ConfigProvider
                      autoInsertSpaceInButton={false}
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: "#a5a5a5",

                          // Alias Token
                          colorBgContainer: "#fff",
                        },
                      }}
                    >
                      <Button
                        type={activeSubcategory === 3 ? "primary" : "default"}
                        onClick={() => handleSubcategoryClick(3)}
                        style={{
                          marginRight: "10px",
                          border: `1px solid ${Common.color.p500}`,
                        }}
                      >
                        후기(10~12개월)
                      </Button>
                    </ConfigProvider>
                    <ConfigProvider
                      autoInsertSpaceInButton={false}
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: "#a5a5a5",

                          // Alias Token
                          colorBgContainer: "#fff",
                        },
                      }}
                    >
                      <Button
                        type={activeSubcategory === 4 ? "primary" : "default"}
                        onClick={() => handleSubcategoryClick(4)}
                        style={{ border: `1px solid ${Common.color.p500}` }}
                      >
                        완료기(12~24개월)
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">상품가격</div>
                <div className="right">
                  <Form.Item
                    name="price"
                    style={{
                      height: "25px",
                      marginBottom: "6px",
                    }}
                  >
                    <InputNumber
                      controls={false}
                      style={{
                        width: "500px",
                        height: "25px",
                        border: `1px solid ${Common.color.p500}`,
                        display: "flex",
                        alignItems: "center",
                      }}
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">상품재고</div>
                <div className="right">
                  <Form.Item
                    name="remainedCnt"
                    style={{
                      height: "25px",
                      marginBottom: "6px",
                    }}
                  >
                    <InputNumber
                      controls={false}
                      style={{
                        width: "500px",
                        height: "25px",
                        border: `1px solid ${Common.color.p500}`,
                        display: "flex",
                        alignItems: "center",
                      }}
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">관리자메모</div>
                <div className="right">
                  <Form.Item
                    style={{ width: "95%", marginBottom: "0px" }}
                    name="adminMemo"
                  >
                    <Input.TextArea
                      placeholder="내용 입력"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "75px",
                        margin: "10px",
                        marginLeft: "0px",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: Common.color.p800,
                        resize: "none",
                      }}
                    />
                  </Form.Item>
                </div>
              </BigKeyword>
            </div>
            <SubTitle>상품이미지</SubTitle>
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
            <SubTitle>상품상세이미지</SubTitle>
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
                <Button icon={<UploadOutlined />}>업로드(최대 1개) </Button>
              </Upload.Dragger>
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
