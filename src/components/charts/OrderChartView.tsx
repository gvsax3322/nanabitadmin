import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { MainTitle, SearchButton, SelectStyle } from "../../styles/AdminBasic";
import OrderChart from "./OrderChart";

const OrderChartView: React.FC = () => {
  // 년도와 월에 대한 상태 정의
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  // 년도 변경 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  // 월 변경 핸들러
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };

  useEffect(() => {
    // console.log(year, month);
  }, [year, month]);

  // const handleButtonClick = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   console.log(e.currentTarget.value);
  // };
  return (
    <div>
      <MainTitle>주문통계</MainTitle>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* 년도 선택 */}
        <SelectStyle value={year} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={year - i}>
              {year - i}년
            </option>
          ))}
        </SelectStyle>
        {/* 월 선택 */}
        <SelectStyle value={month} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}월
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
      >
        {/* <Radio.Group>
          <Radio.Button
            onClick={handleButtonClick}
            style={{
              fontSize: "12px",
              height: "25px",
              lineHeight: "25px",
            }}
            value="daily"
          >
            일별
          </Radio.Button>
          <Radio.Button
            onClick={handleButtonClick}
            style={{
              fontSize: "12px",
              height: "25px",
              lineHeight: "25px",
            }}
            value="monthly"
          >
            월별
          </Radio.Button>
          <Radio.Button
            onClick={handleButtonClick}
            style={{
              fontSize: "12px",
              height: "25px",
              lineHeight: "25px",
            }}
            value="years"
          >
            년별
          </Radio.Button>
        </Radio.Group> */}
      </ConfigProvider>
      <OrderChart />
    </div>
  );
};

export default OrderChartView;
