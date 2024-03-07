import { ConfigProvider, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  BigCard,
  MainTitle,
  SearchButton,
  SelectStyle,
} from "../../styles/AdminBasic";
import OrderChart from "./OrderChart";
import { getOrderChart } from "../../api/chart/chartApi";

export interface getOChartApi {
  code: string;
  message: string;
  data: OrderChartData[];
}
export interface OrderChartData {
  totalOrderCnt: number;
  recallCnt: number;
  netOrderCnt: number;
  date: string;
}

const MOrderChartView = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [yearData, setYearData] = useState<number>();
  const [resMonth, setResMonth] = useState<getOChartApi | null>(null);
  const month = 0;
  const [messageApi, contextHolder] = message.useMessage();
  const successEvent = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };

  // 년도 변경 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const onSearchYear = () => {
    setYearData(year); // 검색 버튼을 클릭할 때만 yearData를 설정합니다.
    fetchData(); // fetchData 함수를 호출합니다.
    // console.log("resMonth", resMonth);
    successEvent("검색 완료");
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div>
      {contextHolder}
      <MainTitle>월별 주문통계</MainTitle>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* 년도 선택 */}
        <SelectStyle value={year} onChange={handleYearChange}>
          {Array.from({ length: 3 }, (_, i) => (
            <option key={currentYear - i} value={currentYear - i}>
              {currentYear - i}년
            </option>
          ))}
        </SelectStyle>
        <SearchButton onClick={onSearchYear}>검색</SearchButton>
      </div>

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

export default MOrderChartView;
