import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";

const OrderChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            datasets: [
              {
                label: "순수 주문량",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                backgroundColor: "rgba(255, 169, 99, 0.2)",
                borderColor: "#ffae63",
                borderWidth: 1,
              },
              {
                label: "총 주문수",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "주문 취소/환불 건",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "x",
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default OrderChart;
