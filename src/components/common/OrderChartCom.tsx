import React, { useEffect, useState } from "react";
import { getOChartApi } from "../charts/MOrderChartView";
import { getOrderChart } from "../../api/chart/chartApi";
import OrderChart from "../charts/OrderChart";

const OrderChartCom = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [yearData, setYearData] = useState<number>();
  const [resMonth, setResMonth] = useState<getOChartApi | null>(null);

  const fetchData = async () => {
    try {
      const successFn = (data: getOChartApi) => {
        setResMonth(data);
        // console.log("데이터:", resMonth);
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getOrderChart(year, month, successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  return (
    <OrderChart yearData={yearData} monthData={month} resMonth={resMonth} />
  );
};

export default OrderChartCom;
