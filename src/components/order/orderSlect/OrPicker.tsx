import { DatePicker, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Common } from "../../../styles/AdminBasic";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface OrderPickerProps {
  onDateChange: (dates: (Dayjs | null)[] | null, dateStrings: string[]) => void;
}

const OrPicker: React.FC<OrderPickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleDateChange = (
    dates: (Dayjs | null)[] | null,
    dateStrings: string[],
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);

      // 변경된 날짜를 상태에 저장
      setStartDate(dateStrings[0] || "");
      setEndDate(dateStrings[1] || "");

      // 선택된 날짜를 콘솔에 찍기는 useEffect를 통해 수행
      // 부모 컴포넌트로 변경된 날짜 정보 전달
      onDateChange(dates, dateStrings);
    } else {
      console.log("Clear");
    }
  };

  useEffect(() => {
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
  }, [startDate, endDate]); // startDate 또는 endDate가 업데이트될 때마다 useEffect 실행

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        onChange={handleDateChange}
        style={{
          border: `1px solid ${Common.color.p500}`,
          width: "300px",
          height: "26px",
          marginRight: "5px",
        }}
      />
    </Space>
  );
};

export default OrPicker;
