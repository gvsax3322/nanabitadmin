import React, { useEffect, useState } from "react";
import SalesChart from "../charts/SalesChart";
import { getChartApi } from "../charts/MSalesChartView";
import { getSalesChart } from "../../api/chart/chartApi";

const SalesChartCom = () => {
  // 년도와 월에 대한 상태 정의
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [yearData, setYearData] = useState<number>();
  const [resMonth, setResMonth] = useState<getChartApi | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const successFn = (data: getChartApi) => {
        setResMonth(data);
        // console.log("데이터:", resMonth);
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getSalesChart(year, month, successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  return (
    <SalesChart yearData={yearData} monthData={month} resMonth={resMonth} />
  );
};

export default SalesChartCom;
