import React, { useState } from "react";
import DComHeader from "../item/DComHeader";
import DComTable from "../../../components/order/orderSlect/table/DComTable";

const DComPage = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      <DComHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />
    </div>
  );
};

export default DComPage;
