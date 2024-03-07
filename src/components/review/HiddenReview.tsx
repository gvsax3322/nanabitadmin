import {
  ConfigProvider,
  Dropdown,
  Pagination,
  Rate,
  Segmented,
  message,
} from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getReview,
  getReviewMemo,
  putReview,
} from "../../api/review/reviewApi";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SubTitle,
} from "../../styles/AdminBasic";
import { ChangeRate, FlexJADiv } from "../../styles/review/reviewstyle";
import { API_SERVER_HOST } from "../../util/util";
import OrderAllSelect from "../order/orderSlect/OrderAllSelect";
import { CategoryOptions } from "../usermainmanage/PutMd";
import { CenteredHeaderTable } from "../usermainmanage/PutPop";
import ReviewModal from "./ReviewModal";
import { SearchReview } from "./ReviewSearch";

const HiddenReview = () => {
  const [refresh, setRefresh] = useState(0);
  const [sdata, setSdata] = useState<SearchReview[]>();
  const searchType = "searchHiddenReview";
  // 선택된 옵션과 입력 필드 값을 저장할 상태
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [keyword, setKeyword] = useState("");
  const [iproduct, setIproduct] = useState<number>();
  const [sortBy, setSortBy] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 셀렉트바 상태변경
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sendMainCate, setSendMainCate] = useState<number>(0);
  const [sendSubCate, setSendSubCate] = useState<number>(0);

  // 모달
  // const [showModal, setShowModal] = useState(false);
  // const [modalData, setModalData] = useState<SearchReview>();

  const [messageApi, contextHolder] = message.useMessage();
  const successEvent = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };
  const warningEvent = (txt: string) => {
    messageApi.open({
      type: "warning",
      content: txt,
    });
  };

  // 관리자 메모
  const [adminMemo, setAdminMemo] = useState<string>("");
  const handleDropdown = (ireview: number) => {
    getReviewMemo(successMemo, failMemo, errorMemo, ireview);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const changeSortby = (value: string) => {
    if (value === "별점 높은 순") {
      setSortBy(0);
    } else if (value === "별점 낮은 순") {
      setSortBy(1);
    }
  };

  const successMemo = (data: string) => {
    setAdminMemo(data);
  };
  const failMemo = () => {
    console.log("d");
  };
  const errorMemo = () => {
    console.log("d");
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setRefresh(refresh + 1);
  // };

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
    setSelectedOption(optionIndex);
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

      setIproduct(isNaN(value) ? 0 : value); // 숫자로 처리, 유효하지 않은 숫자는 0으로 처리
      setKeyword("");
      setInputValue(event.target.value); // 문자열로 처리
    }
  };

  // 상품 숨기기
  const handleHidden = (item: any) => {
    // console.log("숨기기", item);
    // setShowModal(true);
    // setModalData(item);
    const putSuccessFn = () => {
      setRefresh(refresh + 1);
      successEvent("복구되었습니다.");
    };
    const putFailFn = () => {
      console.log("등록 실패");
    };
    const putErrorFn = () => {
      console.log("등록 에러");
    };
    putReview(putSuccessFn, putFailFn, putErrorFn, item.ireview);
  };

  const columns = [
    {
      title: "유저명",
      dataIndex: "nm",
      width: "8%",
      key: "key",
    },
    {
      title: "리뷰사진",
      dataIndex: "reqReviewPic",
      key: "key",
      width: "9%",
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
      width: "8%",
    },
    {
      title: "상품명",
      dataIndex: "productNm",
      key: "key",
      width: "13%",
    },
    {
      title: "리뷰",
      dataIndex: "contents",
      key: "key",
    },
    {
      title: "별점",
      dataIndex: "productScore",
      key: "productScore",
      width: "10%",
      render: (productScore: number) => (
        <FlexJADiv>
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
              <Rate disabled value={productScore} />
            </ChangeRate>
          </ConfigProvider>
        </FlexJADiv>
      ),
    },
    {
      title: "사유 및 복구",
      dataIndex: "item",
      width: "8%",
      key: "iproduct",
      render: (item: any) => (
        <>
          <FlexJADiv>
            {item.delFl !== 0 ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow
                  onOpenChange={() => handleDropdown(item.ireview)}
                >
                  <SearchButton>사유</SearchButton>
                </Dropdown>
                <SearchButton
                  onClick={() => handleHidden(item)}
                  style={{
                    background: " #f44336",
                    fontSize: "12px",
                    lineHeight: "12px",
                  }}
                >
                  복구
                </SearchButton>
              </div>
            ) : (
              ""
            )}
          </FlexJADiv>
        </>
      ),
    },
  ];

  const items: { key: string; label: React.ReactNode }[] = [
    {
      key: "1",
      label: <>{adminMemo}</>,
    },
  ];

  const dataSource = sdata?.map((item, index) => ({
    item: item,
    key: index + 1,
    nm: item.nm,
    reqReviewPic: `${API_SERVER_HOST}/pic/review/${item.ireview}/${item.reqReviewPic}`,
    iproduct: item.iproduct,
    productNm: item.productNm,
    contents: item.contents,
    productScore: item.productScore,
    delFl: item.delFl,
  }));

  const fetchData = async (page: number) => {
    const pageSize = 10;
    try {
      const successFn = (data: SearchReview[]) => {
        setSdata(data);
        setTotalPages(Math.ceil(data[0].totalCount / pageSize) * 10);
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
        searchType,
        keyword,
        iproduct,
        sendMainCate,
        sendSubCate,
        sortBy,
        page - 1,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    // await fetchData(1);
    try {
      setCurrentPage(1);
      const successFn = (data: SearchReview[]) => {
        setSdata(data);
        if (data.length !== 0) {
          successEvent("검색 완료");
        } else {
          warningEvent("검색 결과가 없습니다.");
        }
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
        warningEvent("검색실패");
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
        warningEvent("검색실패");
      };
      await getReview(
        successFn,
        failFn,
        errorFn,
        searchType,
        keyword,
        iproduct,
        sendMainCate,
        sendSubCate,
        sortBy,
      );
    } catch (error) {}
  };
  const handleReset = async () => {
    setInputValue("");
    setMainCategory("");
    setSubCategory("");
    setKeyword("");
    setIproduct(0);
    setSendMainCate(0);
    setSendSubCate(0);
    setSortBy(0);
    setCurrentPage(1);
    fetchData(1);
    await setRefresh(refresh + 1);
    successEvent("검색 초기화 완료");
  };

  useEffect(() => {
    // console.log("데이터:", sdata);
    fetchData(currentPage);
  }, [refresh, sortBy]);

  return (
    <>
      {contextHolder}
      {/* {showModal && (
        <ReviewModal onClose={handleCloseModal} modalData={modalData} />
      )} */}

      <MainTitle>숨긴 리뷰 관리</MainTitle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SubTitle style={{ textAlign: "center", lineHeight: "15px" }}>
          숨긴 리뷰 검색
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
              Segmented: {
                itemActiveBg: "#616161",
                itemColor: "#616161",
                itemHoverBg: "#616161",
                itemHoverColor: "#fff",
                itemSelectedBg: "#616161",
                itemSelectedColor: "#fff",
                trackBg: "none",
              },
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            <Segmented<string>
              options={["별점 높은 순", "별점 낮은 순"]}
              onChange={value => {
                changeSortby(value);
              }}
            />
          </div>
          <CenteredHeaderTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          />
          <FlexJADiv style={{ marginTop: "20px" }}>
            <Pagination
              style={{ textAlign: "center" }}
              current={currentPage}
              total={totalPages}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </FlexJADiv>
        </ConfigProvider>
      </div>
    </>
  );
};

export default HiddenReview;
