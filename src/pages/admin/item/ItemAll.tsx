import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { getDeldel, getProductlist } from "../../../api/mainApi";
import ResultModal from "../../../components/common/Modal";
import OrderAllSelect from "../../../components/order/orderSlect/OrderAllSelect";
import OrderPicker from "../../../components/order/orderSlect/OrderPicker";
import ItemTable from "../../../components/table/ItemTable";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SmallInput,
  SubTitle,
} from "../../../styles/AdminBasic";
import ExcelDownloadButton from "./ExcelDownloadButton";
import DayData from "../../../components/common/DayData";
import SearchCt from "../../../components/common/SearchCt";
import { InputNumber } from "antd";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

export interface GetProduct {
  productNm: string;
  iproduct: number;
  price: number;
  imain: number;
  imiddle: number;
  repPic: string;
}

// 상품검색
interface SearchCriteria {
  keyword: string;
  iproduct: number;
  imain: number;
  imiddle: number;
  minPrice: number;
  maxPrice: number;
  dateFl: number;
  searchStartDate: string;
  searchEndDate: string;
  page: number;
}

export type ProductGetList = GetProduct[];

const ItemAll = () => {
  // ResultModal을 표시할지 여부를 결정하는 상태
  const [showModal, setShowModal] = useState(false);
  const [dataFromChild, setDataFromChild] = useState<any[]>([]);
  const [productList, setProductList] = useState<GetProduct[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  // 검색기능
  const [searchPdnm, setSearchPdnm] = useState<string>();
  const [searchMaxPrice, setSearchMaxPrice] = useState<number | null>(null);
  const [searchMinPrice, setSearchMinPrice] = useState<number | null>(null);
  const [searchimain, setSearchimain] = useState<number | undefined>(undefined);
  const [searchimiddle, setSearchimiddle] = useState<number | undefined>(
    undefined,
  );

  // 상품정보 가져오기
  const fetchData = async () => {
    try {
      const successPr = (data: GetProduct[]) => {
        console.log("데이터:", data);
        setProductList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await getProductlist(
        successPr,
        failFn,
        errorFn,
        searchPdnm,
        0,
        searchimain,
        searchimiddle,
        searchMinPrice ?? undefined,
        searchMaxPrice ?? undefined,
        0,
        startDate,
        endDate,
        0,
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const ResetData = async () => {
    try {
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
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ResultModal을 보여주는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  const handleClcikRemove = () => {
    const iproductList: number[] = dataFromChild.map(item => item.iproduct);
    console.log("선택된 iproduct 리스트:", iproductList);
    getDeldel(iproductList);
  };

  // 날짜 변경
  const handleDateChange = (dateRange: string[]) => {
    console.log(dateRange);
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  // 검색버튼
  const handleClickSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      await fetchData();
    } catch (error) {
      console.error("검색 오류:", error);
    }
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
    <>
      <Wrap>
        <MainTitle>전체 상품관리</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">상품명</div>
            <div className="right">
              <MiddleInput
                value={searchPdnm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchPdnm(e.target.value)
                }
              />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">카테고리</div>
            <div className="right">
              <SearchCt
                searchImain={handClickImain}
                searchImiddle={handClickImiddle}
              />
            </div>
          </BigKeyword>
          <BigKeyword>
            <DayData
              onChange={handleDateChange}
              value={
                startDate && endDate
                  ? [startDate, endDate]
                  : [undefined, undefined]
              }
            />
          </BigKeyword>
          <BigKeyword>
            <div className="left">상품가격</div>
            <div className="right">
              <InputNumber
                value={searchMinPrice}
                controls={false}
                onChange={(value: number | null) => setSearchMinPrice(value)}
                style={{
                  width: "100px",
                  height: "25px",
                  border: ` 1px solid ${Common.color.p500}`,
                }}
              />
              원 이상~
              <InputNumber
                value={searchMaxPrice}
                controls={false}
                onChange={(value: number | null) => setSearchMaxPrice(value)}
                style={{
                  width: "100px",
                  height: "25px",
                  border: ` 1px solid ${Common.color.p500}`,
                }}
              />
              원 이하
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
          <SearchButton onClick={handleClickSearch}>검색</SearchButton>
          <SearchButton style={{ background: " #f44336" }} onClick={ResetData}>
            초기화
          </SearchButton>
        </div>
      </Wrap>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <SmallButton
            style={{ marginRight: "5px" }}
            onClick={() => handleClcikRemove()}
          >
            선택 삭제
          </SmallButton>
          <ExcelDownloadButton exceldata={dataFromChild} />
        </div>
        <div>
          <SearchButton
            style={{ background: " #f44336" }}
            onClick={handleShowModal}
          >
            상품 등록
          </SearchButton>
        </div>
      </div>
      <div>
        <ItemTable tableNum={handleClickTableuum} productList={productList} />
      </div>
      {showModal && <ResultModal onClose={handleCloseModal} />}
    </>
  );
};
export default ItemAll;
