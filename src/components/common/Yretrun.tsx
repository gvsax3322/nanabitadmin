import { useEffect, useRef, useState } from "react";
import { ReturnType, getProductReturn } from "../../api/mainApi";
import { Chart } from "chart.js";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Yretrun = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [yearData, setYearData] = useState<number>();
  const [retrunData, setRetrunData] = useState<ReturnType | null>(null);
  const month = 0;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const successFn = (data: ReturnType) => {
        console.log(data);
        setRetrunData(data);
        console.log("데이터:", retrunData);
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getProductReturn(year, month, successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    if (chartRef.current && retrunData && retrunData.data.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy(); // 이전 차트 파괴
        }

        const labels = retrunData.data.map((item: { date: string }) => {
          const dateParts = item.date.split("-"); // 날짜를 '-'를 기준으로 분리
          if (dateParts.length === 1) {
            return String(dateParts[0]); // 년도만 있는 경우
          } else if (dateParts.length === 2) {
            return String(dateParts[1]); // 년도와 월이 있는 경우
          } else {
            return String(dateParts[2]); // 년도, 월, 일이 모두 있는 경우
          }
        });
        const registerCnt = retrunData.data.map(
          (data: any) => data.registerCnt,
        );
        const registerRate = retrunData.data.map(
          (data: any) => data.registerRate,
        );
        const totalRegisterCnt = retrunData.data.map(
          (data: any) => data.totalRegisterCnt,
        );

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "반품수",
                data: registerCnt,
                fill: true,
                borderColor: "rgba(255, 99, 132, 0.2)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.1,
              },
              {
                label: "반품비율",
                data: registerRate,
                fill: false,
                borderColor: "rgba(75, 192, 192, 0.2)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.1,
              },
              {
                label: "총 반품수",
                data: totalRegisterCnt,
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
  }, [retrunData]); // resMonth 값이 변경될 때마다 차트를 업데이트

  return (
    <div>
      {chartRef.current &&
      retrunData &&
      retrunData.data &&
      retrunData.data.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "450px",
          }}
        >
          <div>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Yretrun;
