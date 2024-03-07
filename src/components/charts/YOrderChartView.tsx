import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { getOrderChart } from "../../api/chart/chartApi";
import { BigCard, MainTitle } from "../../styles/AdminBasic";
import { getOChartApi } from "./MOrderChartView";
import OrderChart from "./OrderChart";

const YOrderChartView = () => {
  const [yearData, setYearData] = useState<number>();
  const [resMonth, setResMonth] = useState<getOChartApi | null>(null);
  const year = 0;
  const month = 0;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const successFn = (data: getOChartApi) => {
        setResMonth(data);
        // //console.log("데이터:", resMonth);
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
    <div>
      <MainTitle>년별 주문통계</MainTitle>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorText: "#d9d9d9",
              colorPrimary: "#7f7f7f",
              colorLink: "#7f7f7f",
              colorLinkActive: "#7f7f7f",
              colorPrimaryActive: "#7f7f7f",
              colorPrimaryBorder: "#7f7f7f",
              colorPrimaryHover: "#7f7f7f",

              /* here is your component tokens */
            },
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      ></ConfigProvider>
      <BigCard style={{ marginTop: "15px" }}>
        <OrderChart yearData={yearData} monthData={month} resMonth={resMonth} />
      </BigCard>
    </div>
  );
};

export default YOrderChartView;
