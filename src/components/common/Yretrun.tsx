import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { ReturnType, getProductReturn } from "../../api/mainApi";

const Yretrun: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [returndata, setReturnData] = useState<ReturnType | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const successFn = (data: ReturnType) => {
        console.log("리턴데이터", data);
        setReturnData(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getProductReturn(2024, 0, successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    if (chartRef.current && returndata && returndata.length > 0) {
      const labels = returndata.map(item => item.date);
      const registerCnt = returndata.map(item => item.registerCnt);
      const registerRate = returndata.map(item => item.registerRate);
      const totalRegisterCnt = returndata.map(item => item.totalRegisterCnt);

      const myChart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "반품 수",
              data: registerCnt,
              borderColor: "rgba(255, 169, 99, 0.2)",
              backgroundColor: "#ffae63",
              borderWidth: 1,
            },
            {
              label: "반품비율",
              data: registerRate,
              borderColor: "rgba(255, 99, 132, 0.2)",
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "총 반품수",
              data: totalRegisterCnt,
              borderColor: "rgba(54, 162, 235, 0.2)",
              backgroundColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [returndata]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Yretrun;
