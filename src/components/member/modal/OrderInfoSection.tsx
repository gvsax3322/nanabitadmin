import { Radio, RadioChangeEvent, Table } from "antd";
import { FC, useState } from "react";

import {
  BigKeyword,
  Common,
  MiddleButton,
  SmallButton,
} from "../../../styles/AdminBasic";
import { BtList, ModifyButton } from "../../../styles/member/memberstyle";
import DatePick from "../DatePick";

interface OrderInfoSectionProps {
  onClose: () => void;
}


const OrderInfoSection: FC<OrderInfoSectionProps> = ({ onClose }) => {
  // 검색관련
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [ratioNm, setRatioNm] = useState(0);

  const handleDateChange = (dateRange: string[]) => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  return (
    <>
      <BigKeyword>
        <div className="left">기간검색</div>
        <div className="right" style={{ gap: "5x" }}>
          <DatePick
            onChange={handleDateChange}
            value={
              startDate && endDate
                ? [startDate, endDate]
                : [undefined, undefined]
            }
          />
        </div>
      </BigKeyword>
      <BigKeyword
        style={{
          borderLeft: `1px solid ${Common.color.primary}`,
          borderRight: `1px solid ${Common.color.primary}`,
          borderBottom: `1px solid ${Common.color.primary}`,
          height: "auto",
          marginBottom: "15px",
        }}
      >
        <div className="left">주문상태</div>
        <div
          className="right"
          style={{
            gap: "10px",
            height: "80px",
          }}
        >
          <Radio.Group
            defaultValue={0}
            style={{ marginRight: "10px" }}
            onChange={(e: RadioChangeEvent) => setRatioNm(e.target.value)}
          >
            <Radio value={0}>전체</Radio>
            <Radio value={1}>입금대기</Radio>
            <Radio value={2}>배송준비중</Radio>
            <Radio value={3}>배송중</Radio>
            <Radio value={4}>배송완료</Radio>
          </Radio.Group>
        </div>
      </BigKeyword>
      <BtList>
        <SmallButton>엑셀 저장</SmallButton>
      </BtList>
      <ModifyButton>
        <MiddleButton
          style={{
            background: " #fff",
            border: "1px solid #000",
            color: "black",
          }}
          onClick={onClose}
        >
          닫기
        </MiddleButton>
      </ModifyButton>
    </>
  );
};

export default OrderInfoSection;
