import React, { useEffect, useState } from "react";
import { SelectStyle } from "../../styles/AdminBasic";

// 카테고리 타입 정의
export interface Category {
  id: number;
  name: string;
  parentId?: number;
}
interface DataPikerGet {
  searchImain: (data: any) => void;
  searchImiddle: (data: any) => void;
  aaa: any;
  bbb: any;
}

// 대분류와 중분류 데이터
export const mainCategories: Category[] = [
  { id: 1, name: "이유식" },
  { id: 2, name: "유아가전" },
  { id: 3, name: "놀이용품" },
  { id: 4, name: "위생용품" },
  { id: 5, name: "모유/수유용품" },
];

export const subCategories: Category[] = [
  { id: 1, name: "초기(4~6개월)", parentId: 1 },
  { id: 2, name: "중기(7~9개월)", parentId: 1 },
  { id: 3, name: "후기(10~12개월)", parentId: 1 },
  { id: 4, name: "완료기(12~24개월)", parentId: 1 },
  { id: 1, name: "살균기", parentId: 2 },
  { id: 2, name: "기타제품", parentId: 2 },
  { id: 1, name: "유아교구", parentId: 3 },
  { id: 2, name: "애착인형", parentId: 3 },
  { id: 1, name: "기저귀", parentId: 4 },
  { id: 2, name: "목욕용품", parentId: 4 },
  { id: 3, name: "기타 위생용품", parentId: 4 },
  { id: 1, name: "수유용품", parentId: 5 },
  { id: 2, name: "모유용품", parentId: 5 },
];

const ModifyCt: React.FC<DataPikerGet> = ({
  searchImain,
  searchImiddle,
  aaa,
  bbb,
}) => {
  // //console.log("수정데이터 넘어오니?", aaa, bbb);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    number | null
  >(null);
  const [selectedSubCategoryIdData, setSelectedSubCategoryIdData] = useState<
    number | null
  >(null);
  const [
    subCategoriesOfSelectedMainCategory,
    setSubCategoriesOfSelectedMainCategory,
  ] = useState<Category[]>([]);

  // 서브 카테고리 만들기
  const makeSubOptionList = () => {
    const selectedCategoryId = parseInt(aaa);
    setSelectedMainCategory(selectedCategoryId);
    // 선택된 대분류에 해당하는 중분류 찾기
    const subCategoriesFiltered = subCategories.filter(
      category => category.parentId === selectedCategoryId,
    );

    setSubCategoriesOfSelectedMainCategory(subCategoriesFiltered);

    // //console.log("========= ", subCategoriesFiltered);
    // 대분류 변경에 따른 중분류의 기본값 설정
    const selectedSubCategory = subCategoriesFiltered.find(
      category => category.id === bbb,
    );
    // //console.log("========= ", selectedSubCategory);
    if (selectedSubCategory) {
      setSelectedSubCategoryIdData(selectedSubCategory.id);
    }
  };

  useEffect(() => {
    makeSubOptionList();
  }, []);
  // 대분류 선택 핸들러
  const handleMainCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategoryId = parseInt(event.target.value);
    setSelectedMainCategory(selectedCategoryId);
    // 선택된 대분류에 해당하는 중분류 찾기
    const subCategoriesFiltered = subCategories.filter(
      category => category.parentId === selectedCategoryId,
    );
    setSubCategoriesOfSelectedMainCategory(subCategoriesFiltered);

    // 대분류 변경에 따른 중분류의 기본값 설정
    const selectedSubCategory = subCategoriesFiltered.find(
      category => category.id === bbb,
    );
    if (selectedSubCategory) {
      setSelectedSubCategoryIdData(selectedSubCategory.id);
    }
  };

  // 중분류 선택 핸들러
  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // 중분류 값을 상태에 설정
    const selectedSubCategoryId = parseInt(event.target.value);
    setSelectedSubCategoryIdData(selectedSubCategoryId);
  };

  useEffect(() => {
    if (selectedMainCategory !== null) {
      searchImain(selectedMainCategory);
    }
  }, [selectedMainCategory]);

  useEffect(() => {
    if (selectedSubCategoryIdData !== null) {
      searchImiddle(selectedSubCategoryIdData);
    }
  }, [selectedSubCategoryIdData]);

  // //console.log(selectedMainCategory);
  // //console.log(selectedSubCategoryIdData);

  return (
    <div>
      <SelectStyle
        style={{ width: "246px" }}
        id="mainCategory"
        onChange={handleMainCategoryChange}
        // value={
        //   selectedMainCategory !== null ? selectedMainCategory.toString() : aaa
        // }
        defaultValue={aaa}
      >
        <option value="">대분류를 선택하세요</option>
        {mainCategories.map(category => (
          <option key={category.id} value={category.id.toString()}>
            {category.name}
          </option>
        ))}
      </SelectStyle>

      <SelectStyle
        id="subCategory"
        style={{ width: "246px" }}
        onChange={handleSubCategoryChange}
        value={
          selectedSubCategoryIdData !== null
            ? selectedSubCategoryIdData.toString()
            : bbb
        }
        // defaultValue={bbb}
      >
        <option value="">중분류를 선택하세요</option>
        {subCategoriesOfSelectedMainCategory.map(category => (
          <option key={category.id} value={category.id.toString()}>
            {category.name}
          </option>
        ))}
      </SelectStyle>
    </div>
  );
};

export default ModifyCt;
