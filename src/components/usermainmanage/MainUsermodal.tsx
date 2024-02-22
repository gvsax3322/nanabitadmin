import { ConfigProvider, Radio, Table } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import {
  BigKeyword,
  Common,
  MiddleInput,
  SearchButton,
  SmallButton,
  SubTitle,
} from "../../styles/AdminBasic";
import OrderAllSelect from "../order/orderSlect/OrderAllSelect";

interface ResultModalProps {
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  width: 80%;
  height: 80%;
  overflow-y: auto;
  background: #ffffff;
  padding: 20px;
`;
const CenteredHeaderTable = styled(Table)`
  &&& {
    .ant-table-thead > tr > th {
      text-align: center;
    }
    .ant-table-tbody > tr > td {
      text-align: center;
    }
  }
`;

const MainUsermodal: React.FC<ResultModalProps> = ({ onClose }) => {
  interface IDataItem {
    img: JSX.Element;
    pnum: string;
    pname: string;
    price: number;
    deletebt: JSX.Element;
  }
  const columns = [
    {
      title: "미리보기",
      dataIndex: "img",
      width: "100px",
    },
    {
      title: "상품코드",
      dataIndex: "pnum",
    },
    {
      title: "상품명",
      dataIndex: "pname",
    },
    {
      title: "가격",
      dataIndex: "price",
      render: (price: number) => <span>{price.toLocaleString()}</span>,
    },
    {
      title: "삭제",
      dataIndex: "deletebt",
      width: "80px",
    },
  ];
  // 이미지 설정 설정
  const defaultImgUrl = `${process.env.PUBLIC_URL}/assets/images/defaultitemimg.svg`;
  const handleApply = () => {
    console.log("등록할거라능");
  };

  const [data, setData] = useState<IDataItem[]>(() => {
    const initialData: IDataItem[] = [];
    for (let i = 0; i < 2; i++) {
      initialData.push({
        img: (
          <img
            style={{ width: "66px", height: "66px", objectFit: "cover" }}
            src={defaultImgUrl}
            alt=""
            className="diaryadd-img-before"
          />
        ),
        pnum: "pnum",
        pname: "pname",
        price: 100000,
        deletebt: (
          <>
            <SearchButton
              style={{
                background: "#4F95FF",
              }}
              onClick={handleApply}
            >
              등록
            </SearchButton>
          </>
        ),
      });
    }
    return initialData;
  });

  return (
    <ModalOverlay onClick={onClose}>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorText: "#d9d9d9",
              colorPrimary: "#7f7f7f",
              colorLink: "#7f7f7f",
              colorLinkActive: "#7f7f7f",
              colorPrimaryActive: "#7f7f7f",
              colorPrimaryBorder: "#7f7f7f",
              colorPrimaryHover: "#7f7f7f",

              /* here is your component tokens */
            },
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      >
        <ModalContent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          onClick={e => e.stopPropagation()}
        >
          {/* 모달 내용 */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SubTitle>상품 검색</SubTitle>
            <SmallButton onClick={onClose} style={{ width: "30px" }}>
              x
            </SmallButton>
          </div>
          <div>
            <div style={{ marginBottom: "20px" }}>
              <BigKeyword
                style={{ borderTop: `1px solid ${Common.color.primary}` }}
              >
                <div className="left">검색어</div>
                <div className="right">
                  <OrderAllSelect option1="제품명" option2="상품코드" />
                  <MiddleInput />
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">카테고리</div>
                <div className="right">
                  <OrderAllSelect
                    option1="이유식"
                    option2="유아가전"
                    option3="놀이용품"
                    option4="위생용품"
                    option5="모유/수유용품"
                  />
                </div>
              </BigKeyword>
              <BigKeyword>
                <div className="left">태그</div>
                <div className="right">
                  <Radio.Group>
                    <Radio.Button
                      style={{
                        fontSize: "12px",
                        height: "25px",
                        lineHeight: "25px",
                      }}
                      value="large"
                    >
                      신상품
                    </Radio.Button>
                    <Radio.Button
                      style={{
                        fontSize: "12px",
                        height: "25px",
                        lineHeight: "25px",
                      }}
                      value="default"
                    >
                      인기상품
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </BigKeyword>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                marginBottom: "20px",
              }}
            >
              <SearchButton style={{ fontSize: "12px", lineHeight: "12px" }}>
                검색
              </SearchButton>
              <SearchButton
                style={{
                  background: " #f44336",
                  fontSize: "12px",
                  lineHeight: "12px",
                }}
              >
                초기화
              </SearchButton>
            </div>
          </div>
          {/* 결과 테이블 */}
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
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
            />
          </ConfigProvider>
        </ModalContent>
      </ConfigProvider>
    </ModalOverlay>
  );
};

export default MainUsermodal;
