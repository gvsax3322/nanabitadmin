import { DatePicker, Space } from "antd";

import React, { useState } from "react";
import { Common } from "../../../styles/AdminBasic";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const OrderPicker = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<string[]>([]);

  const handleDateChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);

      // 변경된 날짜를 상태에 저장
      setSelectedDate(dateStrings);

      //     // 선택된 날짜를 콘솔에 찍기
      console.log("선택된 날짜 문자열:", dateStrings);
    } else {
      console.log("Clear");
    }
  };

  //   const handleDateChange: void = (
  //     dates: string[],
  //     dateStrings,
  //   ) => {
  //     // 선택된 날짜가 변경될 때마다 호출되는 함수
  //     console.log("선택된 날짜:");;

  //     // 변경된 날짜를 상태에 저장
  //     // setSelectedDate : (value: React.SetStateAction<[Date, Date] | null>) => void();
  //     setSelectedDate(dates);

  //     // 선택된 날짜를 콘솔에 찍기
  //     console.log("선택된 날짜 문자열:", dateStrings);
  //   };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        onChange={handleDateChange}
        style={{
          border: `2px solid ${Common.color.p500}`,
          width: "300px",
          height: "26px",
          marginRight: "5px",
        }}
      />
    </Space>
  );
};

export default OrderPicker;
