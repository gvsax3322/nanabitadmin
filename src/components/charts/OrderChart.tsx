import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";
import { getOChartApi } from "./MOrderChartView";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface OrderChartProps {
  yearData?: number;
  monthData?: number;
  resMonth?: getOChartApi | null;
}

const OrderChart: React.FC<OrderChartProps> = ({
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
        const totalOrderCnt = resMonth.data.map(data => data.totalOrderCnt);
        const recallCnt = resMonth.data.map(data => data.recallCnt);
        const netOrderCnt = resMonth.data.map(data => data.netOrderCnt);

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "순수 주문량",
                data: netOrderCnt,
                backgroundColor: "rgba(255, 169, 99, 0.2)",
                borderColor: "#ffae63",
                borderWidth: 1,
              },
              {
                label: "총 주문수",
                data: totalOrderCnt,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "주문 취소/환불 건",
                data: recallCnt,
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
  }, [resMonth]);

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

export default OrderChart;
