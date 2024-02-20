import React from "react";

import OrderAllTable from "../../../components/table/OrderAllTable";
import OrAllHeader from "../item/OrAllHeader";

const OrderAllPage = () => {
  return (
    <div>
      All
      <OrAllHeader />
      {/* <OrderAll /> */}
      <OrderAllTable />
    </div>
  );
};

export default OrderAllPage;
