import React, { useState } from "react";
import NoteHeader from "../item/NoteHeader";

const AdminNote = () => {
  const [dataFromChild, setDataFromChild] = useState("");

  // 테이블에서 발생한 데이터 처리 함수
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      <NoteHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />
    </div>
  );
};

export default AdminNote;
