import React, { useState } from "react";
import OrderAllTable from "../../../components/order/orderSlect/table/OrderAllTable";
import OrAllHeader from "../item/OrAllHeader";
import OrAllFooter from "../item/footer/OrAllFooter";
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
      <OrAllHeader fetchData={handleClickTableuum} />

      {/* 푸터 컴포넌트 */}
      <OrAllFooter />
    </div>
  );
};

export default OrderAllPage;
