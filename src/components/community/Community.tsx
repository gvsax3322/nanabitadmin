import { ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
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
  SmallButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { DeldelBoard, getAnswer, getBoard } from "../../api/commun/commun";
import ModalComm from "./ModalComm";

export interface BoardData {
  iboard: number;
  title: string;
  contents?: string;
  responseFl: number;
  bt?: JSX.Element;
}

const Community = () => {
  //api 연동
  const [board, setBoard] = useState<BoardData[]>([]);
  const [answer, setAnswer] = useState();
  //테이블
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (selectedRowKeys: React.Key[], record: any[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
  };

  const handleClickBord = (iboard: number) => {
    console.log("답변", iboard);
    getAnswer(iboard).then(res => {
      setAnswer(res);
      setShowModal(true);
    });
  };

  const handleDeleteBord = (iboard: number) => {
    DeldelBoard(iboard).then(() => {
      const fetchData = async () => {
        const res = await getBoard();
        if (res) {
          setBoard(
            res.map((row: BoardData) => ({
              key: row?.iboard,
              title: row?.title,
              responseFl: row?.responseFl === 0 ? "미답변" : "답변완료",
              bt: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <SearchButton
                    type="button"
                    onClick={() => handleClickBord(row.iboard)}
                  >
                    답변
                  </SearchButton>
                  <SearchButton
                    type="button"
                    style={{ background: "red" }}
                    onClick={() => handleDeleteBord(row.iboard)}
                  >
                    삭제
                  </SearchButton>
                </div>
              ),
            })),
          );
        } else {
          setBoard([]);
        }
      };
      fetchData();
    });

    console.log("삭제", iboard);
  };

  const handleDeleteBords = () => {
    console.log("선택삭제", selectedRowKeys);
    selectedRowKeys.map(item =>
      DeldelBoard(item).then(() => {
        const fetchData = async () => {
          const res = await getBoard();
          if (res) {
            setBoard(
              res.map((row: BoardData) => ({
                key: row?.iboard,
                title: row?.title,
                responseFl: row?.responseFl === 0 ? "미답변" : "답변완료",
                bt: (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    <SearchButton
                      type="button"
                      onClick={() => handleClickBord(row.iboard)}
                    >
                      답변
                    </SearchButton>
                    <SearchButton
                      type="button"
                      style={{ background: "red" }}
                      onClick={() => handleDeleteBord(row.iboard)}
                    >
                      삭제
                    </SearchButton>
                  </div>
                ),
              })),
            );
          } else {
            setBoard([]);
          }
        };
        fetchData();
      }),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBoard();
      if (res) {
        setBoard(
          res.map((row: BoardData) => ({
            key: row?.iboard,
            title: row?.title,
            responseFl: row?.responseFl === 0 ? "미답변" : "답변완료",
            bt: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <SearchButton
                  type="button"
                  onClick={() => handleClickBord(row.iboard)}
                >
                  답변
                </SearchButton>
                <SearchButton
                  type="button"
                  style={{ background: "red" }}
                  onClick={() => handleDeleteBord(row.iboard)}
                >
                  삭제
                </SearchButton>
              </div>
            ),
          })),
        );
      } else {
        setBoard([]);
      }
    };
    fetchData();
  }, []);

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
      dataIndex: "responseFl",
    },
    {
      title: "관리",
      dataIndex: "bt",
    },
  ];

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
    getBoard(data.userpass).then(res => {
      if (res) {
        setBoard(
          res.map((row: BoardData) => ({
            key: row?.iboard,
            title: row?.title,
            responseFl: row?.responseFl === 0 ? "미답변" : "답변완료",
            bt: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <SearchButton
                  type="button"
                  onClick={() => handleClickBord(row.iboard)}
                >
                  답변
                </SearchButton>
                <SearchButton
                  type="button"
                  style={{ background: "red" }}
                  onClick={() => handleDeleteBord(row.iboard)}
                >
                  삭제
                </SearchButton>
              </div>
            ),
          })),
        );
      } else {
        setBoard([]);
      }
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //모달
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <ModalComm
          onClose={handleCloseModal}
          answer={answer}
          setBoard={setBoard}
          handleClickBord={handleClickBord}
          handleDeleteBord={handleDeleteBord}
          setAnswer={setAnswer}
        />
      )}
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
            borderBottom: `2px solid ${Common.color.primary}`,
            padding: 20,
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
      <SmallButton onClick={handleDeleteBords} style={{ marginBottom: 10 }}>
        선택 삭제
      </SmallButton>
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
          locale={{ emptyText: "비어있음" }}
          columns={columns}
          dataSource={board}
          bordered
        />
      </ConfigProvider>
    </>
  );
};

export default Community;
