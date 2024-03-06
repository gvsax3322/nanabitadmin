import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import { MemberList } from "../../pages/admin/member/MemberModify";
import { SmallButton } from "../../styles/AdminBasic";
import { FC } from "react";

interface ExcelDownloadButtonProps {
  exceldata: MemberList[]; // IDataItem 타입으로 된 배열을 exceldata로 전달받음
}

const ModifyExcel: FC<ExcelDownloadButtonProps> = ({ exceldata }) => {
  // console.log(exceldata);

  const handleDownload = () => {
    // 엑셀 시트에 넣을 데이터를 배열로 만들기
    const excelData = exceldata.map(item => [
      item.nm,
      item.email,
      item.phoneNumber,
      item.registeredAt,
    ]);

    // 엑셀 워크북 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["이름", "이메일", "전화번호", "가입일"],
      ...excelData,
    ]);

    // 열 너비를 지정
    const colWidths = [{ wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 20 }];
    worksheet["!cols"] = colWidths;

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

export default ModifyExcel;
