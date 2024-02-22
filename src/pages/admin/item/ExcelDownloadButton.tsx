import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { IDataItem } from "../../../components/table/ItemTable";
import { SmallButton } from "../../../styles/AdminBasic";

const generateDummyData = (): IDataItem[] => {
  const dummyData: IDataItem[] = [];
  for (let i = 1; i <= 10; i++) {
    dummyData.push({
      key: 0,
      name: "st",
      item: "sa",
    });
  }
  return dummyData;
};

const ExcelDownloadButton = () => {
  const handleDownload = () => {
    const data = generateDummyData();

    // 엑셀 시트에 넣을 데이터를 배열로 만들기
    const excelData = data.map(item => [item.key, item.name, item.item]);

    // 엑셀 워크북 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["번호", "상품명", "카테고리", "재고", "판매가"],
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
