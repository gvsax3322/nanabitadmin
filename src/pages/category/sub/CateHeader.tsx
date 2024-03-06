import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import {
  deleleCateMain,
  deleleCateSub,
  getCategory,
} from "../../../api/category/categoryApi";
import CateSelec from "../../../components/category/CateSelec";
import { mainCateData } from "./Cate";

// import OrAllFooter from "./footer/OrAllFooter";

const Wrap = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${Common.color.primary};
`;

const initState = {
  imain: 0,
  mainCategory: "",
  middleCategoryList: [
    {
      imiddle: 0,
      middleCategory: "",
    },
  ],
};

interface OrAllHeaderProps {
  fetchData: (data: any) => void;
  tableNum: (selectedRowKeys: React.Key[]) => void;
}

const CateHeader: React.FC<OrAllHeaderProps> = ({ tableNum }) => {
  const [orderData, setOrderData] = useState([initState]);
  const [periodBt, setPeriodBt] = useState(0); // 선택된 기간 상태 버튼관리
  const [prdOp, setPrdOp] = useState(0);
  const [stateOp, setStateOp] = useState(0); //  주문상태 옵션관리
  const [searchOp, setSearchOp] = useState(0); // 검색어 상태 옵션관리
  const [paymentOp, setPaymentOp] = useState(0); //  결제수단 상태 옵션관리
  const [selectedDate, setSelectedDate] = useState<string[]>([]); // Date picker 관리

  // const [userSearchActive, setUserSearchActive] = useState(true); // 검색버튼 옵션관리
  const [searchText, setSearchText] = useState(""); //  검색어텍스트 관리

  const [options, setOptions] = useState<
    { label: string; value: number }[] | null
  >(null);

  const dataSource = orderData.map(item => {
    const middleCategoryList = item.middleCategoryList.map(subcate => ({
      key: subcate.imiddle,
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{subcate.middleCategory}</span>
          <SmallButton onClick={() => handleSubDelete(subcate.imiddle)}>
            Delete
          </SmallButton>
        </div>
      ),
    }));

    const titleNode = (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>{item.imain}</span>
        <span>{item.mainCategory}</span>
        <SmallButton onClick={() => handleDelete(item.imain)}>
          Delete
        </SmallButton>
      </div>
    );

    return {
      key: item.imain,
      title: titleNode,
      children: middleCategoryList,
    };
  });
  // =====================================================

  const handleDelete = (imain: number) => {
    console.log("1차카테 선택", imain);
    const cateImain = imain; // 주문 번호를 배열에 담음
    // API를 호출하여 주문 상태를 변경합니다.
    deleleCateMain({
      imain: cateImain,
      successFn: () => {
        fetchData();
      },
      failFn: failFn_AllOrder,
      errorFn: errorFn_AllOrder,
    });
  };

  const handleSubDelete = (imiddle: number) => {
    console.log("2차카테 선택", imiddle);
    // 선택한 일괄 처리 버튼의 상태를 업데이트합니다.

    const cateImiddle = imiddle; // 주문 번호를 배열에 담음
    // API를 호출하여 주문 상태를 변경합니다.
    deleleCateSub({
      imiddle: cateImiddle, // imain 대신에 imiddle을 전달
      successFn: () => {
        fetchData();
      },
      failFn: failFn_AllOrder,
      errorFn: errorFn_AllOrder,
    });
  };

  const fetchData = () => {
    getCategory({
      successFn: successFn_AllOrder,
      failFn: failFn_AllOrder,
      errorFn: errorFn_AllOrder,
    });
    // }
  };

  // ========================================================

  // 검색어 작성
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 검색 버튼 클릭시 처리
  const handleClickSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    console.log("================= 버튼 클릭 ");
    // setUserSearchActive(true);
    // fetchData();

    console.log(
      "검색버튼눌렀어융",
      periodBt,
      searchOp,
      prdOp,
      paymentOp,
      stateOp,
      // userSearchActive,
      searchText,
      selectedDate,
    );
  };

  useEffect(() => {
    console.log("================= 전체 최초 검색");
    fetchData(); // 페이지가 처음 렌더링될 때 데이터를 호출합니다.
  }, []);
  // 서버연동

  const successFn_AllOrder = (data: mainCateData[]) => {
    // 변환된 옵션을 상태에 저장
    const options = data.map(item => ({
      label: item.mainCategory,
      value: item.imain,
    }));
    setOptions(options);
    setOrderData(data);
  };

  const failFn_AllOrder = (data: any) => {
    // console.log("failFn : ", data);
    alert("failFn오더all : 데이터 호출에 실패하였습니다.");
  };

  const errorFn_AllOrder = (data: any) => {
    // console.log("errorFn : ", data);
    alert("오더all!!! 서버상태 불안정 그래서, 데모테스트했음.");
    setOrderData(data);
  };

  return (
    <>
      <Wrap>
        <MainTitle>전체리스트</MainTitle>
        <SubTitle>기본검색</SubTitle>
        <div style={{ marginBottom: "20px" }}>
          <BigKeyword
            style={{ borderTop: `1px solid ${Common.color.primary}` }}
          >
            <div className="left">카테고리</div>
            <div className="right">
              <CateSelec />
              <CateSelec />
            </div>
          </BigKeyword>
          <BigKeyword>
            <div className="left">카테고리 소속</div>
            <div className="right">
              <MiddleInput
                type="text"
                placeholder="검색어를 입력하세요"
                autoFocus
                value={searchText}
                onChange={handleInputChange}
              />
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
          <SearchButton onClick={e => handleClickSearch(e)}>저장</SearchButton>
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
          <SmallButton style={{ marginRight: "5px" }}>
            전체메일 발송
          </SmallButton>
          <SmallButton>엑셀 저장</SmallButton>
        </div>
      </div>
      {/* <div> */}
      <Tree
        treeData={dataSource}
        // height={1000}
        defaultExpandAll
        titleRender={(nodeData: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{nodeData.title}</span>
            {nodeData.deleteButton} {/* 추가된 삭제 버튼 렌더링 */}
          </div>
        )}
      />
      {/* </div> */}
      <Wrap>dddd</Wrap>
    </>
  );
};

export default CateHeader;
