import { Bar } from "@nivo/bar";
import { Table } from "antd";
import React from "react";
import MemberSelect from "../../../components/select/MemberSelect";
import {
  BigKeyword,
  Common,
  MainTitle,
  SearchButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import MonthlySelect from "../../../components/select/MonthlySelect";

interface DataItem {
  name: string;
  value: number;
}

const DemoData: DataItem[] = [
  { name: "John", value: 10 },
  { name: "Alice", value: 15 },
  { name: "Bob", value: 0 },
  { name: "Diana", value: 20 },
  // 추가 데이터를 원하는 만큼 추가할 수 있습니다.
];

const columns = [
  {
    title: "날짜",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "그래프",
    key: "chart",
    render: (text: any, record: DataItem) => (
      <Bar
        width={record.value * 10}
        height={10}
        data={[{ id: record.name, value: record.value }]}
        keys={["value"]}
        indexBy="id"
        padding={0.3}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        layout="horizontal"
      />
    ),
  },
  {
    title: "비율",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "전체",
    dataIndex: "value",
    key: "value",
  },
];

const DailyReg: React.FC = () => (
  <>
    <MainTitle>일별 가입통계분석</MainTitle>
    <SubTitle>통계분석</SubTitle>
    <BigKeyword
      style={{
        borderTop: `1px solid ${Common.color.primary}`,
        marginBottom: "40px",
      }}
    >
      <div className="left">검색어</div>
      <div className="right">
        <MemberSelect optionone={"2024"} />
        <MonthlySelect />
        <SearchButton>검색</SearchButton>
      </div>
    </BigKeyword>
    <Table<DataItem> dataSource={DemoData} columns={columns} />
  </>
);

export default DailyReg;
