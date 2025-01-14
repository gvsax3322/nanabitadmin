import React, { useState } from "react";

import OrAllHeader from "../item/OrAllHeader";

import { getOrderAll } from "../../../api/order/orderAllApi";

const OrderAllPage = () => {
  // 상태 변수 선언 및 초기화
  const [dataFromChild, setDataFromChild] = useState("");

  // 테이블에서 발생한 데이터 처리 함수
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };

  return (
    <div>
      {/* 헤더 컴포넌트 */}
      <OrAllHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />

      {/* 푸터 컴포넌트 */}
    </div>
  );
};

export default OrderAllPage;
