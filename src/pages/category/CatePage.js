import { useState } from "react";

import CateHeader from "./sub/CateHeader";

const CatePage = () => {
  // 상태 변수 선언 및 초기화
  const [dataFromChild, setDataFromChild] = useState("");

  // 테이블에서 발생한 데이터 처리 함수
  const handleClickTableuum = data => {
    setDataFromChild(data);
  };

  return (
    <div>
      {/* 헤더 컴포넌트 */}
      <CateHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />
      {/* 푸터 컴포넌트 */}
    </div>
  );
};

export default CatePage;
