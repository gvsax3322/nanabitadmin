import React, { useState } from "react";
import {
  BigButton,
  BigCard,
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SubTitle,
} from "../../styles/AdminBasic";
import OrderAllSelect from "../order/orderSlect/OrderAllSelect";
import { ConfigProvider, Table } from "antd";

interface IDataItem {
  key: number;
  title: string;
  item: string;
  bt?: JSX.Element;
}

const Community = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (selectedRowKeys: React.Key[], record: any[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
    console.log(record);
  };
  const columns = [
    {
      title: "번호",
      dataIndex: "key",
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "답변여부",
      dataIndex: "item",
    },
    {
      title: "관리",
      dataIndex: "bt",
    },
  ];

  const data: IDataItem[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i + 1,
      title: `제목 ${i}`,
      item: `답변`,
      bt: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchButton>수정</SearchButton>
          <SearchButton>삭제</SearchButton>
        </div>
      ),
    });
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onSelect,
    onSelectAll: (selected: any, selectedRows: any) => {
      console.log(
        "All rows selected:",
        selected,
        "Selected Rows:",
        selectedRows,
      );
      // 모든 행에 대한 추가적인 처리
    },
  };
  const cccc = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <MainTitle>게시판 관리</MainTitle>
      <SubTitle>기본검색</SubTitle>
      <BigKeyword
        style={{
          borderTop: `1px solid ${Common.color.primary}`,
          marginBottom: 20,
        }}
      >
        <div className="left">검색어</div>
        <div className="right">
          <OrderAllSelect
            option1="전체보기"
            option2="공지사항"
            option3="소통해요"
            option4="궁금해요"
          />
          <MiddleInput />
        </div>
      </BigKeyword>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        <SearchButton>검색</SearchButton>
        <SearchButton style={{ background: " #f44336" }}>초기화</SearchButton>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a5a5a5",
          },
          components: {
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </ConfigProvider>
      <BigCard />
      <BigCard />
      <BigCard />
      <BigCard />
      <BigButton
        onClick={cccc}
        style={{ position: "fixed", bottom: "5%", right: "10%" }}
      >
        위로가자
      </BigButton>
    </>
  );
};

export default Community;
