import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import React, { useEffect, useRef } from "react";
import { getChartApi } from "./MSalesChartView";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface ChartProps {
  yearData?: number;
  monthData?: number;
  resMonth?: getChartApi | null; // resMonth를 SalesChartData 배열로 변경합니다.
}

const SalesChart: React.FC<ChartProps> = ({
  yearData,
  monthData,
  resMonth,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && resMonth && resMonth.data.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy(); // 이전 차트 파괴
        }

        const labels = resMonth.data.map(item => {
          const dateParts = item.date.split("-"); // 날짜를 '-'를 기준으로 분리
          if (dateParts.length === 1) {
            return String(dateParts[0]); // 년도만 있는 경우
          } else if (dateParts.length === 2) {
            return String(dateParts[1]); // 년도와 월이 있는 경우
          } else {
            return String(dateParts[2]); // 년도, 월, 일이 모두 있는 경우
          }
        });
        const earnings = resMonth.data.map(data => data.earnings);
        const totalSales = resMonth.data.map(data => data.totalSales);
        const costPrice = resMonth.data.map(data => data.costPrice);

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "순수익",
                data: earnings,
                fill: true,
                borderColor: "rgba(255, 99, 132, 0.2)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.1,
              },
              {
                label: "판매 제품원가",
                data: costPrice,
                fill: false,
                borderColor: "rgba(75, 192, 192, 0.2)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.1,
              },
              {
                label: "총 매출",
                data: totalSales,
                fill: false,
                borderColor: "rgba(54, 162, 235, 0.2)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                grid: {
                  // 축에 대한 격자선
                  display: false, // grid 활성화 (기본값 true)
                },
              },
              y: {
                type: "linear",
              },
            },
          },
        });
      }
    }
  }, [resMonth]); // resMonth 값이 변경될 때마다 차트를 업데이트

  return (
    <div>
      {resMonth && resMonth?.data.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // flexDirection: "column",
            height: "450px",
          }}
        >
          <div>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
            {/* <h1>데이터가 없습니다.</h1>
            <p style={{ fontSize: "13px" }}>📅 다른 날짜를 선택해 주세요.</p> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default SalesChart;
