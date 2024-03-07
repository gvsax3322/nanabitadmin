import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import React, { useState } from "react";
import { getProductlist, productPatch } from "../../api/mainApi";
import {
  BigKeyword,
  Common,
  MainTitle,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { ModalContent, ModalOverlay } from "../../styles/main/main";
import { API_SERVER_HOST } from "../../util/util";
import ModifyCt from "./ModifyCt";
import { GetProduct } from "../../pages/admin/item/ItemAll";
// import { postAlbum } from "../../api/album/album_api";

interface ResultModalProps {
  onClose: () => void;
  patchData: any;
  reset: any;
  setProductList: any;
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

interface FormData {
  imain: number;
  imiddle: number;
  productNm: string;
  price: number;
  remainedCnt: number;
  recommendedAge: number;
  adminMemo: string;
  newFl: number;
  popFl: number;
}

const host = `${API_SERVER_HOST}/api/admin`;

const ModifyModal: React.FC<ResultModalProps> = ({
  onClose,
  patchData,
  reset,
  setProductList,
}) => {
  console.log("여기도 들어오니?", patchData);
  const abc = JSON.parse(JSON.stringify(patchData));
  console.log(abc);

  // abc[0].repPic  << 이미지 넘어오는거
  const repPic: string | undefined = abc[0]?.productPic;
  const repPicUrl: string | undefined = repPic
    ? `${API_SERVER_HOST}/pic/product/${abc[0].iproduct}/${repPic}`
    : undefined;
  console.log("이미지", repPicUrl);
  const [activeSubcategory, setActiveSubcategory] = useState<number>(
    abc[0]?.recommandAge,
  );

  const handleSubcategoryClick = (subcategory: number) => {
    setActiveSubcategory(subcategory);
  };
  const [form] = Form.useForm();

  // https://ant.design/components/upload
  // 현재 이미지 목록은 출력을 했는데

  // ???? 관리자가 삭제를 한 이미지 목록이 있을 것이고,
  // 삭제한 이미지 정보를 백엔드로 보내야 하는 거 아닌가?

  // 어떤 팀에서는 추가, 삭제할때 추가된 이미지만 (별도로 삭제 목록 안보내도)
  // 정상적으로 관리가 되더라?

  // 관리자가 추가한 새로운 이미지가 있다.
  // 추가한 이미지는 현재 API 로도 충분히 전달이 된다. (binary)
  // 샘플 데이터 배열 초기화
  const sampleData = [];
  // repPicUrl 배열에 대한 예시 데이터

  // repPicUrl 배열의 각 요소를 반복하여 객체 생성
  for (let i = 0; i < abc[0].productPic.length; i++) {
    const newObj = {
      uid: i.toString(),
      name: "yyy" + i + ".png",
      status: "done",
      url: `${API_SERVER_HOST}/pic/product/${abc[0].iproduct}/${abc[0].productPic[i]}`, // repPicUrl 배열의 각 요소를 순서대로 할당
      // thumbUrl: repPicUrl, // thumbUrl이 repPicUrl과 같은 배열을 참조할 경우
    };
    sampleData.push(newObj);
  }

  // 생성된 배열 출력
  console.log("이미지제대로들어오니?", sampleData);

  const sampImgData = [
    {
      uid: "0",
      name: "productPicdetail.png",
      status: "done",
      url: `${API_SERVER_HOST}/pic/product/${abc[0].iproduct}/${abc[0].productDetails}`,
      // thumbUrl: repPicUrl,
    },
  ];

  // const [fileList, setFileList] = useState<any[]>([repPicUrl]);
  const [fileList, setFileList] = useState<any[]>(sampleData);
  const [searchimain, setSearchimain] = useState<number | undefined>(undefined);
  const [searchimiddle, setSearchimiddle] = useState<number | undefined>(
    undefined,
  );
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [fileListDetails, setFileListDetails] = useState<any[]>(sampImgData); // State for details Upload.Dragger
  const [isNewProduct, setIsNewProduct] = useState<number>(0);
  const [isPopularProduct, setIsPopularProduct] = useState<number>(0);
  const [deletedPics, setDeletedPics] = useState<any[]>([]);
  const [isMinimumWarningVisible, setIsMinimumWarningVisible] = useState(false);
  const handleNewProductClick = () => {
    setIsNewProduct(1);
    setIsPopularProduct(0); // 다른 버튼의 상태 초기화
  };

  const handlePopularProductClick = () => {
    setIsNewProduct(0); // 다른 버튼의 상태 초기화
    setIsPopularProduct(1);
  };
  const handleChange = (info: any) => {
    let fileList = [...info.fileList].slice(-4);
    setFileList(fileList);
  };
  // Details Upload.Dragger change handler
  const handleChangeDetails = (info: any) => {
    let fileList = [...info.fileList].slice(-1); // Allow only 1 file for details
    setFileListDetails(fileList);
  };

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

  const onFinish = async (data: FormData, abc: any) => {
    console.log(data, abc);
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
          recommendedAge: activeSubcategory,
          adminMemo: data.adminMemo,
          price: data.price,
          remainedCnt: data.remainedCnt,
          newFl: isNewProduct,
          popFl: isPopularProduct,
          delPics: deletedPics,
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

    productPatch({
      product: formData,
      abc,
    }).then(async () => {
      const successFn = (data: GetProduct[]) => {
        console.log("데이터:", data);
        setProductList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getProductlist(successFn, failFn, errorFn);
    });
    reset();
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

  // 이미지 파일을 삭제할 때 호출될 함수
  const handleRemove = (file: any) => {
    console.log("file.uid", file);
    console.log("file.uid", typeof file.url);
    // 이미지 파일 리스트의 길이가 2개 이상일 때만 삭제 처리
    if (fileList.length > 1) {
      const newFileList = fileList.filter(item => item.url !== file.url);
      setFileList(newFileList);

      // URL에서 파일 이름 추출
      const fileName = file.url.split("/").pop();

      if (!deletedPics.includes(fileName)) {
        setDeletedPics([...deletedPics, fileName]);
      }
      return true; // 삭제 처리를 진행
    } else {
      // 이미지 파일이 1개만 남았을 경우, 경고 모달 표시
      setIsMinimumWarningVisible(true);
      return false; // 삭제 처리를 중지
    }
  };

  console.log("이게 담기니?", deletedPics);
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
          <Form
            form={form}
            onFinish={(values: FormData) => onFinish(values, abc)}
            initialValues={{
              productNm: abc[0]?.productNm,
              recommandAge: abc[0]?.recommandAge,
              newFl: abc[0]?.newFl,
              popFl: abc[0]?.popFl,
              price: abc[0]?.price,
              adminMemo: abc[0]?.adminMemo,
              imain: abc[0]?.imain,
              imiddle: abc[0]?.imiddle,
              remainedCnt: abc[0]?.remainedCnt,
            }}
          >
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
                      // defaultValue={abc[0]?.productNm}
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
                    <ModifyCt
                      searchImain={handClickImain}
                      searchImiddle={handClickImiddle}
                      aaa={abc[0].imain}
                      bbb={abc[0].imiddle}
                    />
                  </div>
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">나이별상품</div>
                <div className="right">
                  <Form.Item
                    name="recommendedAge"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "6px",
                      marginTop: "6px",
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
                    <Button
                      type={activeSubcategory === 4 ? "primary" : "default"}
                      onClick={() => handleSubcategoryClick(4)}
                      style={{ border: `1px solid ${Common.color.p500}` }}
                    >
                      완료기(12~24개월)
                    </Button>
                  </Form.Item>
                </div>
              </BigKeyword>

              <BigKeyword>
                <div className="left">상품종류</div>
                <div className="right">
                  <Form.Item
                    name="newFl"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "6px",
                      marginTop: "6px",
                    }}
                  >
                    <Button
                      type={isNewProduct === 1 ? "primary" : "default"}
                      onClick={handleNewProductClick}
                      style={{
                        marginRight: "10px",
                        border: `1px solid ${Common.color.p500}`,
                      }}
                    >
                      신상품
                    </Button>
                  </Form.Item>
                  <Form.Item
                    name="popFl"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "6px",
                      marginTop: "6px",
                    }}
                  >
                    <Button
                      type={isPopularProduct === 1 ? "primary" : "default"}
                      onClick={handlePopularProductClick}
                      style={{
                        marginRight: "10px",
                        border: `1px solid ${Common.color.p500}`,
                      }}
                    >
                      인기상품
                    </Button>
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
                onRemove={handleRemove}
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

export default ModifyModal;
