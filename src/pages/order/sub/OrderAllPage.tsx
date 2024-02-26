import React, { useState } from "react";

import OrderAllTable from "../../../components/order/orderSlect/table/OrderAllTable";
import OrAllHeader from "../item/OrAllHeader";
import OrAllFooter from "../item/footer/OrAllFooter";

const OrderAllPage = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };

  return (
    <div>
      All
      <OrAllHeader />
      {/* <OrderAll /> */}
      <OrderAllTable tableNum={handleClickTableuum} />
      <OrAllFooter />
    </div>
  );
};

export default OrderAllPage;
