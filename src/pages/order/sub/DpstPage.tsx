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
      Dpst입금대기
      <DpstHeader />
      <DpstTable tableNum={handleClickTableuum} />
      <DpstFooter />
    </div>
  );
};

export default DpstPage;
