import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { BigCard, MainTitle, SearchButton, SelectStyle } from "../../styles/AdminBasic";
import OrderChart from "./OrderChart";

const MOrderChartView = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);

  // 년도 변경 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  useEffect(() => {
    console.log(year);
  }, [year]);

  return (
    <div>
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
        <SearchButton>검색</SearchButton>
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
        <OrderChart />
      </BigCard>
    </div>
  );
};

export default MOrderChartView;
