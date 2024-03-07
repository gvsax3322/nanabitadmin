import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { CancelChartData, getProductCancel } from "../../api/mainApi";

const YCancel = () => {
  const [cancelData, setCancelData] = useState<CancelChartData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const successFn = (data: CancelChartData) => {
        // //console.log(data);
        setCancelData(data);
        drawChart(data); // 데이터를 가져온 후 차트를 그리도록 호출
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getProductCancel(2024, 0, successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const drawChart = (data: CancelChartData) => {
    // //console.log("여기는", data);
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const chartData = {
      labels: data.map((item: any) => item.date), // 데이터에서 날짜를 라벨로 사용
      datasets: [
        {
          label: "주문취소 수",
          data: data.map((item: any) => item.registerCnt), // 등록 수 데이터 추출

          borderColor: "rgba(255, 169, 99, 0.2)",
          backgroundColor: "#ffae63",
          tension: 0.1,
        },
        {
          label: "주문취소비율",
          data: data.map((item: any) => item.registerRate), // 등록률 데이터 추출

          borderColor: "rgba(255, 99, 132, 0.2)",
          backgroundColor: "rgba(255, 99, 132, 1)",
          tension: 0.1,
        },
        {
          label: "총 주문취소수",
          data: data.map((item: any) => item.totalRegisterCnt), // 등록률 데이터 추출

          borderColor: "rgba(54, 162, 235, 0.2)",
          backgroundColor: "rgba(54, 162, 235, 1)",
          tension: 0.1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    const myChart = new Chart(canvas, {
      type: "line",
      data: chartData,
      options: options,
    });
  };

  return <canvas id="myChart" width="400" height="200"></canvas>;
};

export default YCancel;
