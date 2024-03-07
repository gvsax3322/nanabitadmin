import React, { useEffect, useState } from "react";
import { SelectStyle } from "../../styles/AdminBasic";
import { Form, Select } from "antd";

// 카테고리 타입 정의
interface Category {
  id: number;
  name: string;
  parentId?: number;
}
interface DataPikerGet {
  searchImain: (data: any) => void;
  searchImiddle: (data: any) => void;
}

// 대분류와 중분류 데이터
const mainCategories: Category[] = [
  { id: 1, name: "이유식" },
  { id: 2, name: "유아가전" },
  { id: 3, name: "놀이용품" },
  { id: 4, name: "위생용품" },
  { id: 5, name: "모유/수유용품" },
];

const subCategories: Category[] = [
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

const AntCategory: React.FC<DataPikerGet> = ({
  searchImain,
  searchImiddle,
}) => {
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
  };
  // 중분류 선택 핸들러
  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // 중분류 값을 상태에 설정
    const selectedSubCategoryId = parseInt(event.target.value);
    // 여기에 선택된 중분류 값을 활용하여 필요한 작업을 수행하세요
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
      <Form.Item
        name="imain"
        rules={[{ required: true, message: "제목을 입력해주세요!" }]}
        style={{ width: "650px" }}
      >
        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="대분류를 선택하세요"
          onChange={handleMainCategoryChange}
        >
          {mainCategories.map(category => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="imiddle"
        rules={[{ required: true, message: "제목을 입력해주세요!" }]}
        style={{ width: "650px" }}
      >
        <Select
          style={{ width: 200 }}
          placeholder="중분류를 선택하세요"
          onChange={handleSubCategoryChange}
          disabled={!subCategories.length} // Disable subcategory select until main category is selected
        >
          {subCategoriesOfSelectedMainCategory.map(category => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default AntCategory;
