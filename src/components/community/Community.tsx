import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SmallButton,
  SubTitle,
} from "../../styles/AdminBasic";

interface IDataItem {
  key: number;
  title: string;
  item: string;
  bt?: JSX.Element;
}

const Community = () => {
  //테이블
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (selectedRowKeys: React.Key[], record: any[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
    console.log(record);
  };
  const CenteredHeaderTable = styled(Table)`
    &&& {
      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
        text-align: center;
      }

      .ant-table-thead > tr > :nth-of-type(1),
      .ant-table-tbody > tr > :nth-of-type(1) {
        width: 5%;
      }
      .ant-table-thead > tr > :nth-of-type(2),
      .ant-table-tbody > tr > :nth-of-type(2) {
        width: 10%;
      }
      .ant-table-thead > tr > :nth-of-type(3),
      .ant-table-tbody > tr > :nth-of-type(3) {
        width: 40%;
      }
      .ant-table-thead > tr > :nth-of-type(4),
      .ant-table-tbody > tr > :nth-of-type(4) {
        width: 10%;
      }
      .ant-table-thead > tr > :nth-of-type(5),
      .ant-table-tbody > tr > :nth-of-type(5) {
        width: 20%;
      }
    }
  `;

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
            gap: 10,
          }}
        >
          <SearchButton type="button">답변</SearchButton>
          <SearchButton type="button" style={{ background: "red" }}>
            삭제
          </SearchButton>
        </div>
      ),
    });
  }

  //리액트 훅 폼

  const validationSchema = yup.object({
    userpass: yup
      .string()
      .required("검색어는 필수입니다.")
      .min(1, "1자 이상 입력하세요.")
      .max(10, "10자까지만 입력하세요"),
  });

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitMy = (data: any) => {
    const parsedUserId = parseInt(data.userid);
    const asd = {
      userid: parsedUserId,
      userpass: data.userpass,
    };
    console.log(asd);
  };

  console.log("리랜더링");

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <MainTitle>Q&A</MainTitle>
      <SubTitle>기본검색</SubTitle>
      <form onSubmit={handleSubmit(handleSubmitMy)}>
        <BigKeyword
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            marginBottom: 20,
          }}
        >
          <div className="left">검색어</div>
          <div className="right">
            <MiddleInput type="text" {...register("userpass")} />
          </div>
        </BigKeyword>
        <div
          style={{
            color: "red",
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: 10,
          }}
        >
          {formState.errors.userpass?.message}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <SearchButton type="submit">검색</SearchButton>
          <SearchButton
            style={{ background: " #f44336" }}
            onClick={() => {
              reset();
            }}
          >
            초기화
          </SearchButton>
        </div>
      </form>
      <SmallButton>선택 삭제</SmallButton>
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
        <CenteredHeaderTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </ConfigProvider>
    </>
  );
};

export default Community;
