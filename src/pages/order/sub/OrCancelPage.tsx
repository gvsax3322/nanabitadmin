import React, { useState } from "react";
import OrCancelHeader from "../item/OrCancelHeader";
import CancelTable from "../../../components/order/orderSlect/table/CancelTable";

const OrCancelPage = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
    return (
      <div>
        OrderCancel
        <OrCancelHeader />
        <CancelTable tableNum={handleClickTableuum} />
      </div>
    );
  };
};
export default OrCancelPage;
