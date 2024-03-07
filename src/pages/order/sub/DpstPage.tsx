import { useState } from "react";
import DpstTable from "../../../components/order/orderSlect/table/DpstTable";
import DpstHeader from "../item/DpstHeader";
import DpstFooter from "../item/footer/DpstFooter";

const DpstPage = () => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleClickTableuum = (data: any) => {
    setDataFromChild(data);
  };
  return (
    <div>
      <DpstHeader
        fetchData={handleClickTableuum}
        tableNum={handleClickTableuum}
      />
    </div>
  );
};

export default DpstPage;
