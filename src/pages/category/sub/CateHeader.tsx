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
import { Select, Tree } from "antd";
import {
  deleleCateMain,
  deleleCateSub,
  getCategory,
  postAddCate,
} from "../../../api/category/categoryApi";
import CateSelec from "../../../components/category/CateSelec";
import { mainCateData } from "./Cate";
import { Option } from "antd/es/mentions";

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
      candidateKey: 0,
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

  const [selectedMainCategory, setSelectedMainCategory] = useState<number>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>();
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [mainCategory, setMainCategory] = useState();

  const dataSource = orderData.map(item => {
    const middleCategoryList = item.middleCategoryList.map(subcate => ({
      key: `${item.imain}-${subcate.imiddle}`, // 고유한 키 생성
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
        <span>{item.mainCategory}</span> {/* 부모 카테고리명을 출력 */}
        <SmallButton onClick={() => handleDelete(item.imain)}>
          Delete
        </SmallButton>
      </div>
    );

    return {
      key: item.imain, // imain 값으로 고유한 키 생성
      title: titleNode,
      children: middleCategoryList, // 부모 카테고리의 자식 카테고리 목록을 children으로 추가
    };
  });
  // =====================================================

  const handleDelete = (imain: number) => {
    //console.log("1차카테 선택", imain);
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

  const handleSubDelete = (candidateKey: number) => {
    //console.log("2차카테 선택", candidateKey);
    // 선택한 일괄 처리 버튼의 상태를 업데이트합니다.

    const cateImiddle = candidateKey; // 주문 번호를 배열에 담음
    // API를 호출하여 주문 상태를 변경합니다.
    deleleCateSub({
      candidateKey: cateImiddle, // imain 대신에 imiddle을 전달
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

  // ========================================================
  // 부모 카테고리 변경 시 호출되는 함수
  const handleMainChange = (value: number) => {
    setSelectedMainCategory(value);

    // 해당 부모 카테고리에 속하는 자식 카테고리 목록 설정
    const selectedCategory = orderData.find(
      category => category.imain === value,
    );
    if (selectedCategory) {
      const subCategories = selectedCategory.middleCategoryList.map(
        subCategory => ({
          label: subCategory.middleCategory,
          value: subCategory.imiddle,
        }),
      );
      setSubCategoryOptions(subCategories);
    }
  };

  // 자식 카테고리 변경 시 호출되는 함수
  const handleSubCategoryChange = (value: number) => {
    setSelectedSubCategory(value);
  };

  // 검색어 입력 시 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // setMainCategory(e.target.value);
  };

  // 저장 버튼 클릭 시 호출되는 함수
  const handleClickSearch = () => {
    // 검색어를 사용하여 필요한 작업 수행
    //console.log("검색어:", searchText);
    // 예: 검색어를 사용하여 서버에 요청을 보내거나 로컬 상태를 업데이트합니다.
  };

  // 새로운 부모 카테고리를 추가하는 함수
  const handleAddMainCategory = () => {
    // 새로운 부모 카테고리를 추가하는 작업 수행
    //console.log("새로운 부모 카테고리 추가");
  };

  // 새로운 자식 카테고리를 추가하는 함수
  const handleAddSubCategory = () => {
    // 새로운 자식 카테고리를 추가하는 작업 수행
    //console.log("새로운 자식 카테고리 추가");
  };

  // api main 카테추가
  const handleMainAddApi = (main_category: string) => {
    if (!main_category) {
      alert("카테고리 이름을 입력하세요.");
      return;
    }

    const requestData = {
      main_category: main_category,
    };
    postAddCate({
      mainAdd: requestData,
      successFn: () => {
        //console.log("카테고리 추가 성공");
        // 카테고리 추가에 성공하면 추가된 카테고리 목록을 다시 불러옵니다.
        fetchData(); // fetchData 함수를 호출하여 데이터를 다시 불러옴
      },

      failFn: error => {
        console.error("카테고리 추가 실패:", error);
        alert("카테고리 추가에 실패했습니다.");
      },
      errorFn: error => {
        console.error("API 호출 실패:", error);
        alert("API 호출에 실패했습니다.");
      },
    });
  };
  const handleClickSave = () => {
    handleMainAddApi(searchText);
  };

  const updateDetails = (result: any) => {
    // 성공적으로 데이터를 불러온 후에 상태를 업데이트합니다.
    setOrderData(result);
  };

  const successFn = (result: any) => {
    //console.log(result);
    setOrderData(result);
  };
  const failFn = (result: string) => {
    //console.log(result);
  };
  const errorFn = (result: string) => {
    //console.log(result);
  };
  // ====================================================================

  useEffect(() => {
    //console.log("================= 전체 최초 검색");
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
    // //console.log("failFn : ", data);
    alert("failFn오더all : 데이터 호출에 실패하였습니다.");
  };

  const errorFn_AllOrder = (data: any) => {
    // //console.log("errorFn : ", data);
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
              {/* 부모 카테고리 셀렉트 박스 */}
              <CateSelec
                options={[
                  ...orderData.map(category => ({
                    label: category.mainCategory,
                    value: category.imain,
                  })),
                  { label: "새로운 부모 카테고리 추가", value: -1 }, // 새로운 부모 카테고리 추가 항목
                ]}
                onChange={(value: number) => {
                  if (value === -1) {
                    handleAddMainCategory();
                  } else {
                    handleMainChange(value);
                  }
                }}
                value={selectedMainCategory}
              />

              {/* 자식 카테고리 셀렉트 박스 */}
              <CateSelec
                options={[
                  ...subCategoryOptions,
                  { label: "새로운 자식 카테고리 추가", value: -1 }, // 새로운 자식 카테고리 추가 항목
                ]}
                onChange={(value: number) => {
                  if (value === -1) {
                    handleAddSubCategory();
                  } else {
                    handleSubCategoryChange(value);
                  }
                }}
                value={selectedSubCategory}
              />

              {/* 검색어 창과 저장 버튼 */}
              {/* 검색어 창과 저장 버튼을 여기에 추가 */}
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
          <SearchButton onClick={handleClickSave}>저장</SearchButton>
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
