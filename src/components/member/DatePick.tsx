import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs"; // Day.js import
import { useState } from "react";
import { Common, SmallButton } from "../../styles/AdminBasic";

const { RangePicker } = DatePicker;

const DatePick = ({
  onChange,
}: {
  onChange: (dateRange: string[]) => void;
}): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<string[]>([]);

  // 오늘 날짜를 Day.js 객체로 변환
  const today = dayjs();

  const handleDateChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => {
    if (dates) {
      setSelectedDate(dateStrings);
      // 시작일과 종료일 분리
      const [startDate, endDate] = dateStrings;
      // 부모 컴포넌트로 시작일과 종료일을 각각 전달
      onChange([startDate, endDate]);
    }
  };

  const handleDayClick = () => {
    const startDate = today.format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  const handleYesClick = () => {
    const startDate = today.subtract(1, "d").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  const handleWeekClick = () => {
    const startDate = today.subtract(7, "d").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  const handleMonthClick = () => {
    const startDate = today.subtract(30, "d").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  const handlequarterClick = () => {
    const startDate = today.subtract(90, "d").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  const handleAllClick = () => {
    const startDate = today.subtract(1000, "d").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  return (
    <Space direction="horizontal" size={5}>
      <RangePicker
        onChange={handleDateChange}
        style={{
          border: `1px solid ${Common.color.p500}`,
          width: "300px",
          height: "26px",
          marginRight: "5px",
        }}
        defaultValue={[dayjs(), dayjs()]}
      />
      <SmallButton style={{ minWidth: "40px" }} onClick={handleDayClick}>
        오늘
      </SmallButton>
      <SmallButton style={{ minWidth: "40px" }} onClick={handleYesClick}>
        어제
      </SmallButton>
      <SmallButton style={{ minWidth: "40px" }} onClick={handleWeekClick}>
        일주일
      </SmallButton>
      <SmallButton style={{ minWidth: "40px" }} onClick={handleMonthClick}>
        1개월
      </SmallButton>
      <SmallButton style={{ minWidth: "40px" }} onClick={handlequarterClick}>
        3개월
      </SmallButton>
      <SmallButton style={{ minWidth: "40px" }} onClick={handleAllClick}>
        전체
      </SmallButton>
    </Space>
  );
};

export default DatePick;
