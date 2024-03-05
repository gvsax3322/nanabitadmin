import React, { useState } from "react";
import PreparHeader from "../item/PreparHeader";

const PreparingPage = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      Preparing
      <PreparHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />
    </div>
  );
};

export default PreparingPage;
