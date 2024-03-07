import React, { useState } from "react";
import OrCancelHeader from "../item/OrCancelHeader";
import CancelTable from "../../../components/order/orderSlect/table/CancelTable";

const OrderCancel = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      <OrCancelHeader />
      <CancelTable tableNum={handleClickTableuum} />
    </div>
  );
};

export default OrderCancel;
