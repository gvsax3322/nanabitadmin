import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { SmallButton } from "../../../styles/AdminBasic";
import { GetProduct } from "./ItemAll";
import {
  Category,
  mainCategories,
  subCategories,
} from "../../../components/common/SearchCt";

interface ExcelDownloadButtonProps {
  exceldata: GetProduct[]; // IDataItem 타입으로 된 배열을 exceldata로 전달받음
}

const findCategoryName = (
  categoryId: number,
  categories: Category[],
): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : "";
};

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({
  exceldata,
}) => {
  //console.log(exceldata);

  const handleDownload = () => {
    // 엑셀 시트에 넣을 데이터를 배열로 만들기
    const excelData = exceldata.map(item => [
      item.iproduct,
      item.productNm,
      `${findCategoryName(item.imain, mainCategories)} > ${
        subCategories.find(
          category =>
            category.parentId === item.imain && category.id === item.imiddle,
        )?.name || ""
      }`,
      item.remainedCnt,
      item.price,
    ]);

    // 엑셀 워크북 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["상품번호", "상품명", "카테고리", "재고", "판매가"],
      ...excelData,
    ]);

    // 워크북에 워크시트 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 엑셀 파일 저장
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(excelBlob, "data.xlsx");
  };

  return <SmallButton onClick={handleDownload}>엑셀 저장</SmallButton>;
};

export default ExcelDownloadButton;
