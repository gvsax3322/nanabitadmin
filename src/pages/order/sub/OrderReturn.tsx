import React, { useState } from "react";
import OrReturnHeader from "../item/OrReturnHeader";
import ReturnTable from "../../../components/order/orderSlect/table/ReturnTable";

const OrderReturn = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      OrderReturn
      <OrReturnHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />
    </div>
  );
};

export default OrderReturn;
