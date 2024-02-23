import React from "react";
import SalesChart from "./SalesChart";
import { ConfigProvider, Radio } from "antd";
import { MainTitle } from "../../styles/AdminBasic";

const SalesChartView = () => {
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log(e.currentTarget.value);
  };
  return (
    <div>
      <MainTitle>매출통계</MainTitle>
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
        <Radio.Group>
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
            style={{
              fontSize: "12px",
              height: "25px",
              lineHeight: "25px",
            }}
            value="years"
          >
            년별
          </Radio.Button>
        </Radio.Group>
      </ConfigProvider>
      <SalesChart />
    </div>
  );
};

export default SalesChartView;
