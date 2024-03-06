import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Common, SmallButton } from "../../styles/AdminBasic";
import OrderPicker from "../order/orderSlect/OrderPicker";
import { useState } from "react";

const { RangePicker } = DatePicker;

const DayData = ({
  onChange,
  value,
}: {
  onChange: (dateRange: string[]) => void;
  value: string[] | undefined[];
}): JSX.Element => {
  const initialValue = () => (value ? value : [undefined, undefined]);
  const [selectedDate, setSelectedDate] = useState<any[]>(initialValue);
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
    const startDate = today.subtract(1, "y").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    setSelectedDate([startDate, endDate]);
    onChange([startDate, endDate]);
  };

  return (
    <>
      <div className="left">기간검색</div>
      <div className="right">
        <Space direction="horizontal" size={5}>
          <RangePicker
            onChange={handleDateChange}
            style={{
              border: `1px solid ${Common.color.p500}`,
              width: "300px",
              height: "26px",
              marginRight: "5px",
            }}
            defaultValue={[today, today]}
            value={
              value
                ? [dayjs(selectedDate[0]), dayjs(selectedDate[1])]
                : [undefined, undefined]
            }
          />
          <SmallButton
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handleDayClick}
          >
            오늘
          </SmallButton>
          <SmallButton
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handleYesClick}
          >
            어제
          </SmallButton>
          <SmallButton
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handleWeekClick}
          >
            일주일
          </SmallButton>
          <SmallButton
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handleMonthClick}
          >
            1개월
          </SmallButton>
          <SmallButton
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handlequarterClick}
          >
            3개월
          </SmallButton>
          <SmallButton
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handleAllClick}
          >
            전체
          </SmallButton>
        </Space>
      </div>
    </>
  );
};

export default DayData;
