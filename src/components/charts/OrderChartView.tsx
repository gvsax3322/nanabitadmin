import React from "react";
import OrderChart from "./OrderChart";
import { MainTitle } from "../../styles/AdminBasic";
import { ConfigProvider, Radio } from "antd";

const OrderChartView = () => {
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log(e.currentTarget.value);
  };
  return (
    <div>
      <MainTitle>주문통계</MainTitle>
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
        </Radio.Group>
      </ConfigProvider>
      <OrderChart />
    </div>
  );
};

export default OrderChartView;
