import React, { useState } from "react";
import PreparHeader from "../item/PreparHeader";
import PreparingTable from "../../../components/order/orderSlect/table/PreparingTable";
import PreparingFooter from "../item/footer/PreparingFooter";

const PreparingPage = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      Preparing
      <PreparHeader />
      <PreparingTable tableNum={handleClickTableuum} />
      <PreparingFooter />
    </div>
  );
};

export default PreparingPage;
