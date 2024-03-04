import { ConfigProvider, Rate } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReview } from "../../api/review/reviewApi";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SubTitle,
} from "../../styles/AdminBasic";
import { API_SERVER_HOST } from "../../util/util";
import OrderAllSelect from "../order/orderSlect/OrderAllSelect";
import { CategoryOptions } from "../usermainmanage/PutMd";
import { CenteredHeaderTable } from "../usermainmanage/PutPop";
import ReviewModal from "./ReviewModal";

const ChangeRate = styled.div`
  span {
    font-size: 10px;
  }
`;

export interface SearchReview {
  ireview: number;
  nm: string;
  reqReviewPic: string;
  iproduct: number;
  productNm: string;
  contents: string;
  productScore: number;
  delFl: number;
}

const ReviewSearch = () => {
  const [refresh, setRefresh] = useState(0);
  const [sdata, setSdata] = useState<SearchReview[]>();
  // 선택된 옵션과 입력 필드 값을 저장할 상태
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [keyword, setKeyword] = useState("");
  const [iproduct, setIproduct] = useState<number>();

  // 셀렉트바 상태변경
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sendMainCate, setSendMainCate] = useState<number>(0);
  const [sendSubCate, setSendSubCate] = useState<number>(0);

  //모달
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<SearchReview>();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const subCategories: CategoryOptions = {
    이유식: ["임신/출산", "신생아", "베이비", "키즈"],
    유아가전: ["살균기", "기타제품"],
    놀이용품: ["유아교구", "애착인형"],
    위생용품: ["기저귀", "목욕용품", "위생용품/기타"],
    모유수유용품: ["수유용품", "모유용품"],
  };

  const handleMainCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const category = event.target.value;
    setMainCategory(event.target.value);
    setSubCategory(""); // Reset sub category on main category change
    const categoryNumbers: any = {
      이유식: 1,
      유아가전: 2,
      놀이용품: 3,
      위생용품: 4,
      모유수유용품: 5,
    };
    // console.log(categoryNumbers[category] || 0);
    setSendMainCate(categoryNumbers[category] || 0);
  };

  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const subCategoryValue = event.target.value;
    setSubCategory(event.target.value);
    // 서브 카테고리에 따른 숫자 출력 (선택된 서브 카테고리의 인덱스 + 1)
    const subCategoryIndex =
      subCategories[mainCategory].indexOf(subCategoryValue) + 1;
    // console.log(subCategoryIndex || 0);
    setSendSubCate(subCategoryIndex || 0);
  };

  // select 옵션 변경 시 호출될 함수
  const handleSelectChange = (optionIndex: number): void => {
    setSelectedOption(optionIndex); // 옵션 인덱스 직접 설정
    // 선택된 옵션에 따라 inputValue 초기화
    // 제품명 선택 시 (옵션 0) -> inputValue를 빈 문자열로 초기화
    // 제품코드 선택 시 (옵션 1) -> inputValue를 0으로 초기화
    setInputValue(optionIndex === 0 ? "" : 0);
  };

  // 입력 필드 값 변경 시 호출될 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 선택된 옵션에 따라 입력 값 변환
    if (selectedOption === 0) {
      // 제품명인 경우
      setInputValue(event.target.value); // 문자열로 처리
      setKeyword(event.target.value);
      setIproduct(0);
    } else if (selectedOption === 1) {
      // 제품코드인 경우
      const value = parseInt(event.target.value, 10);
      setInputValue(isNaN(value) ? "" : value); // 숫자로 처리, 유효하지 않은 숫자는 빈 문자열로 처리
      setKeyword("");
      setIproduct(value);
    }
  };

  // 상품 숨기기
  const handleHidden = (item: SearchReview) => {
    console.log("숨기기", item);
    setShowModal(true);
    setModalData(item);
    // putMainProRc(toggleType, iproduct, putSuccessFn, putFailFn, putErrorFn);
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

  const columns = [
    {
      title: "유저명",
      dataIndex: "nm",
      width: "100px",
      key: "key",
    },
    {
      title: "리뷰사진",
      dataIndex: "reqReviewPic",
      key: "key",
      render: (reqReviewPic: string) => (
        <img
          style={{ width: "66px", height: "66px", objectFit: "cover" }}
          src={reqReviewPic}
          alt=""
        />
      ),
    },
    {
      title: "상품코드",
      dataIndex: "iproduct",
      key: "key",
    },
    {
      title: "상품명",
      dataIndex: "productNm",
      key: "productNm",
    },
    {
      title: "리뷰",
      dataIndex: "contents",
      key: "contents",
    },
    {
      title: "별점",
      dataIndex: "productScore",
      key: "productScore",
      render: (productScore: number) => (
        <div style={{ width: "80px" }}>
          <ConfigProvider
            theme={{
              components: {
                Rate: {
                  marginXS: 3,
                },
              },
            }}
          >
            <ChangeRate>
              <Rate disabled defaultValue={productScore} />
            </ChangeRate>
          </ConfigProvider>
        </div>
      ),
    },
    {
      title: "숨김",
      dataIndex: "item",
      width: "80px",
      key: "iproduct",
      render: (item: any) => (
        <>
          <SearchButton
            onClick={() => handleHidden(item)}
            style={{
              background: " #f44336",
              fontSize: "12px",
              lineHeight: "12px",
            }}
          >
            숨김
          </SearchButton>
        </>
      ),
    },
  ];

  const dataSource = sdata?.map((item, index) => ({
    item: item,
    key: (index + 1).toString(),
    nm: item.nm,
    reqReviewPic: `${API_SERVER_HOST}/pic/review/${item.ireview}/${item.reqReviewPic}`,
    iproduct: item.iproduct,
    productNm: item.productNm,
    contents: item.contents,
    productScore: item.productScore,
    delFl: item.delFl,
  }));

  const fetchData = async () => {
    try {
      const successFn = (data: SearchReview[] | undefined) => {
        setSdata(data);
        console.log("성공이라규", data);
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getReview(
        successFn,
        failFn,
        errorFn,
        keyword,
        iproduct,
        sendMainCate,
        sendSubCate,
        0,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    await fetchData();
    setRefresh(refresh + 1);
  };
  const handleReset = async () => {
    setSelectedOption(1);
    setInputValue("");
    setMainCategory("");
    setSubCategory("");
    setKeyword("");
    setIproduct(0);
    setSendMainCate(0);
    setSendSubCate(0);
    await fetchData();
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    // console.log("데이터:", sdata);
    fetchData();
  }, [refresh]);

  return (
    <>
      {showModal && (
        <ReviewModal onClose={handleCloseModal} modalData={modalData} />
      )}

      <MainTitle>리뷰 관리</MainTitle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SubTitle style={{ textAlign: "center", lineHeight: "15px" }}>
          리뷰 검색
        </SubTitle>
      </div>

      <div>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">검색어</div>
            <div className="right">
              <OrderAllSelect
                option1="제품명"
                option2="상품코드"
                onClick={handleSelectChange}
              />
              <MiddleInput
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                style={{ fontSize: "12px" }}
              />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">카테고리</div>
            <div className="right">
              <SelectStyle
                style={{ fontSize: "12px", width: "100px" }}
                value={mainCategory}
                onChange={handleMainCategoryChange}
              >
                <option value="">대분류 선택</option>
                {Object.keys(subCategories).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </SelectStyle>
              <SelectStyle
                style={{ fontSize: "12px", width: "100px" }}
                value={subCategory}
                onChange={handleSubCategoryChange}
                disabled={!mainCategory}
              >
                <option value="">중분류 선택</option>
                {mainCategory &&
                  subCategories[mainCategory].map(sub => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </SelectStyle>
            </div>
          </BigKeyword>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <SearchButton
            style={{ fontSize: "12px", lineHeight: "12px" }}
            onClick={handleSearch}
          >
            검색
          </SearchButton>
          <SearchButton
            style={{
              background: " #f44336",
              fontSize: "12px",
              lineHeight: "12px",
            }}
            onClick={handleReset}
          >
            초기화
          </SearchButton>
        </div>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#a5a5a5",
            },
            components: {
              Table: {
                headerBg: "#535353",
                headerColor: "#fff",
              },
            },
          }}
        >
          <CenteredHeaderTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default ReviewSearch;
