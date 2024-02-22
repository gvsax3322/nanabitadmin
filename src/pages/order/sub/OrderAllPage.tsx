import React from "react";

import OrderAllTable from "../../../components/table/OrderAllTable";
import OrAllHeader from "../item/OrAllHeader";
import OrAllFooter from "../item/footer/OrAllFooter";

const OrderAllPage = () => {
  return (
    <div>
      All
      <OrAllHeader />
      {/* <OrderAll /> */}
      <OrderAllTable />
      <OrAllFooter />
    </div>
  );
};

export default OrderAllPage;
