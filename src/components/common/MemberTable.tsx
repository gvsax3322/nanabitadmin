import { Bar } from "@nivo/bar";
import { Table } from "antd";

interface DataItem {
  name: string;
  value: number;
}

const DemoData: DataItem[] = [
  { name: "2024-03", value: 10 },
  { name: "2024-02", value: 15 },
  { name: "2024-01", value: 0 },
  { name: "2023-12", value: 20 },
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

//   useEffect(() => {
//     console.log(year, month);
//   }, [year, month]);

const MemberTable: React.FC = () => {
  return (
    <Table<DataItem>
      dataSource={DemoData}
      columns={columns}
      pagination={false}
    />
  );
};

export default MemberTable;
