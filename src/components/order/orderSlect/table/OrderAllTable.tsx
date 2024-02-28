import styled from "@emotion/styled";
import { ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Common, SearchButton } from "../../../../styles/AdminBasic";
import TestMd from "../../TestMd";
import { getOrderAll } from "../../../../api/order/orderAllApi";

const initState = {
  iorder: 0,
  orderedAt: "",
  products: [
    {
      repPic: "",
      productNm: "",
      cnt: 0,
      processState: 0,
      amount: 0,
      refundFl: 0,
    },
  ],
  ordered: "",
  recipient: "",
  totalAmount: 0,
  payCategory: 0,
  refundFl: 0,
};

interface OrderAllDataItem {
  iorder: number;
  orderedAt: string;
  products: OrderItem[];
  ordered: string;
  recipient: string;
  totalAmount: number;
  payCategory: string;
  refundFl: number;
}
interface OrderItem {
  repPic: JSX.Element;
  productNm: string;
  cnt: number;
  processState: string;
  amount: number;
  refundFl: number;
}

interface OrderAllTableProps {
  tableNum: (data: any) => void;
  serverData: {
    iorder: string;
    orderedAt: string;
    products: {
      repPic: string;
      productNm: string;
      cnt: number;
      processState: number;
      amount: number;
      refundFl: number;
    }[];
    ordered: string;
    recipient: string;
    totalAmount: number;
    payCategory: number;
    refundFl: number;
  }[];
}

const OrderAllTable: React.FC<OrderAllTableProps> = ({
  tableNum,
  serverData,
}) => {
  const [orderData, setOrderData] = useState([initState]);
  const [showModal, setShowModal] = useState(false);
  const [periodBt, setPeriodBt] = useState(0); // 선택된 기간 상태 버튼관리
  const [prdOp, setPrdOp] = useState(0);
  const [stateOp, setStateOp] = useState(0); //  주문상태 옵션관리
  const [searchOp, setSearchOp] = useState(0); // 검색어 상태 옵션관리
  const [paymentOp, setPaymentOp] = useState(0); //  결제수단 상태 옵션관리
  const [selectedDate, setSelectedDate] = useState<string[]>([]); // Date picker 관리
  const [userSearchActive, setUserSearchActive] = useState(false); // 검색버튼 옵션관리
  const [searchText, setSearchText] = useState(""); //  검색어텍스트 관리

  // 서버연동
  const fetchData = () => {
    // 검색 버튼 클릭시만 API 날리기
    if (userSearchActive) {
      // 결과가 오기 전까지는 무효화
      setUserSearchActive(false);
      getOrderAll({
        orderParam: {
          processState: stateOp,
          dateCategory: prdOp,
          searchCategory: searchOp,
          keyword: searchText,
          startDate: selectedDate[0] !== undefined ? selectedDate[0] : "",
          endDate: selectedDate[1] !== undefined ? selectedDate[1] : "",
          dateFl: periodBt,
          payCategory: paymentOp,
          sort: 0,
          page: 0,
          size: 1,
        },
        successFn: successFn_AllOrder,
        failFn: failFn_AllOrder,
        errorFn: errorFn_AllOrder,
      });
    }
  };

  const successFn_AllOrder = (data: any) => {
    // console.log("반품신청 successFn : ", data);

    setOrderData(data);
  };

  const failFn_AllOrder = (data: any) => {
    // console.log("failFn : ", data);
    alert("failFn오더all : 데이터 호출에 실패하였습니다.");
  };

  const errorFn_AllOrder = (data: any) => {
    // console.log("errorFn : ", data);
    alert("오더all!!! 서버상태 불안정 그래서, 데모테스트했음.");
    setOrderData(data);
  };
  // ResultModal을 보여주는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
    tableNum(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "No",
      dataIndex: "iorder",
    },

    {
      title: "주문일시",
      dataIndex: { orderData },
    },
    {
      title: "주문목록",
      dataIndex: "refundFl",
      render: (refundFl: number) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <SearchButton
              style={{ marginBottom: "12px" }}
              onClick={handleShowModal}
            >
              주문목록
            </SearchButton>
            {refundFl === 1 ? (
              <SearchButton>주문취소</SearchButton>
            ) : (
              <div style={{ width: "100px" }} />
            )}
          </div>
        </div>
      ),
    },

    {
      title: "이미지",
      dataIndex: "repPic",
      render: (items: OrderItem[]) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ul>
            {items.map((item, index) => (
              <li
                style={{ marginBottom: "10px", marginTop: "10px" }}
                key={index}
              >
                {item.repPic}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "상품명",
      dataIndex: "productNm",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.productNm}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "수량",
      dataIndex: "cnt",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.cnt}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "상품금액",
      dataIndex: "amount",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.amount}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "처리상태",
      dataIndex: "processState",
      render: (items: OrderItem[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.processState}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "반품신청",
      dataIndex: "refundFl",
      render: (refundFl: number) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {refundFl === 1 ? (
            <SearchButton>반품신청</SearchButton>
          ) : (
            <div style={{ width: "100px" }} />
          )}
        </div>
      ),
    },
    {
      title: "주문자",
      dataIndex: "ordered",
    },
    {
      title: "수령자",
      dataIndex: "recipient",
    },
    {
      title: "총주문액",
      dataIndex: "totalAmount",
    },
    {
      title: "결제수단",
      dataIndex: "payCategory",
    },
  ];

  const Aaa = styled(Table)`
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
      .ant-table-tbody
      .ant-table-row.ant-table-row-selected
      > .ant-table-cell {
      background-color: ${Common.color.p800};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${Common.color.p600};
      border-color: ${Common.color.p800};
    }
    .ant-checkbox-wrapper-checked:hover .ant-checkbox-inner,
    .ant-checkbox-checked:hover .ant-checkbox-inner {
      border-color: rgba(40, 40, 40, 0.8) !important;
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: #d9d9d9 !important;
    }
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-checkbox-indeterminate
      .ant-checkbox-inner:after {
      background-color: ${Common.color.p800};
    }
    &&& {
      .ant-table-thead > tr > th {
        text-align: center;
      }
      .ant-table-tbody > tr > td {
        text-align: center;
      }
    }
  `;

  return (
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
      <Aaa
        dataSource={serverData}
        // columns={columns}
        pagination={false}
      />
      {showModal && <TestMd onClose={handleCloseModal} />}
    </ConfigProvider>
  );
};

export default OrderAllTable;
