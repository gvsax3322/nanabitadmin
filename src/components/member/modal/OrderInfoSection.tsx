import {
  ConfigProvider,
  Pagination,
  Radio,
  RadioChangeEvent,
  Segmented,
} from "antd";
import { FC, useEffect, useState } from "react";

import { getMemberOl } from "../../../api/member/memberApi";
import {
  BigKeyword,
  Common,
  MiddleButton,
  SmallButton,
} from "../../../styles/AdminBasic";
import { BtList, ModifyButton } from "../../../styles/member/memberstyle";
import { API_SERVER_HOST } from "../../../util/util";
import { CenteredHeaderTable } from "../../usermainmanage/PutPop";
import DatePick from "../DatePick";

interface OrderInfoSectionProps {
  onClose: () => void;
  memberId: number | null;
  successAl: (txt: string) => void;
  errorAl: (txt: string) => void;
}

export interface OrderList {
  iorder: number;
  orderedAt: string;
  products: Product[];
  ordered: string;
  recipient: string;
  totalAmount: number;
  payCategory: number;
  refundFl: number;
  totalCount: number;
}

export interface Product {
  repPic: string;
  productNm: string;
  cnt: number;
  processState: number;
  amount: number;
  refundFl: number;
  iproduct: number;
}

const OrderInfoSection: FC<OrderInfoSectionProps> = ({
  onClose,
  memberId,
  successAl,
  errorAl,
}) => {
  // 회원정보
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // 검색관련
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [ratioNm, setRatioNm] = useState(0);
  const [sortBy, setSortBy] = useState<number>(0);

  const handleDateChange = (dateRange: string[]) => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  const fetchData = async (page: number) => {
    try {
      const pageSize = 3;

      const successFn = (data: OrderList[]) => {
        console.log("데이터:", data);
        setOrderList(data);
        setTotalPages(Math.ceil(data[0].totalCount / pageSize));
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      console.log("데이터를 가져오는 중...");
      await getMemberOl(
        successFn,
        failFn,
        errorFn,
        memberId,
        startDate,
        endDate,
        ratioNm,
        page,
        sortBy,
      );
      console.log("데이터 가져오기 완료");
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleClickSearch = async () => {
    try {
      setCurrentPage(1);
      const successFn = (data: OrderList[]) => {
        console.log("데이터:", data);
        successAl("검색성공");
        setOrderList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
        errorAl("검색실패");
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
        errorAl("검색실패");
      };

      await getMemberOl(
        successFn,
        failFn,
        errorFn,
        memberId,
        startDate,
        endDate,
        ratioNm,
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const changeSortby = (value: string) => {
    if (value === "주문일 역순") {
      setSortBy(0);
    } else if (value === "주문일 순") {
      setSortBy(1);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [sortBy]);

  // 테이블 관련
  const dataSource = orderList
    ? orderList.map(item => ({
        key: item.iorder,
        iorder: item.iorder,
        orderedAt: item.orderedAt,
        ordered: item.ordered,
        recipient: item.recipient,
        totalAmount: item.totalAmount,
        payCategory: item.payCategory,
        refundFl: item.refundFl,
        products: item.products.map((product, index) => ({
          repPic: product.repPic,
          productNm: product.productNm,
          cnt: product.cnt,
          processState: product.processState,
          amount: product.amount,
          refundFl: product.refundFl,
          iproduct: product.iproduct,
          key: `${item.iorder}_${index}`,
        })),
      }))
    : [];

  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10);
  };

  const columns: any[] = [
    {
      title: "주문일시",
      dataIndex: "orderedAt",
      key: "orderedAt",
      width: "8%",
      render: (text: string) => formatDate(text),
    },
    {
      title: "이미지",
      dataIndex: "products",
      key: "repPic",
      width: "10%",
      render: (items: any[]) => (
        <div
          style={{
            width: "100%",
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items.map((item, index) => (
            <div>
              <img
                src={`${API_SERVER_HOST}/pic/product/${item.iproduct}/${item.repPic}`}
                alt=""
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  width: "70px",
                  height: "70px",
                }}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "상품명",
      dataIndex: "products",
      key: "productNm",
      render: (items: any[]) => (
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
      dataIndex: "products",
      key: "cnt",
      width: "7%",
      render: (items: any[]) => (
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
      dataIndex: "products",
      key: "amount",
      width: "7%",
      render: (items: any[]) => (
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
      dataIndex: "products",
      key: "processState",
      width: "7%",
      render: (items: any[]) => (
        <ul>
          {items.map((item, index) => (
            <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
              {item.processState === 1 && "입금대기"}
              {item.processState === 2 && "배송준비중"}
              {item.processState === 3 && "배송중"}
              {item.processState === 4 && "배송완료"}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "주문자",
      dataIndex: "ordered",
      key: "ordered",
      width: "7%",
    },
    {
      title: "수령자",
      dataIndex: "recipient",
      key: "recipient",
      width: "7%",
    },
    {
      title: "총주문액",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: "5%",
    },
    {
      title: "결제수단",
      dataIndex: "payCategory",
      key: "payCategory",
      width: "5%",
      render: (payCategory: number) => (
        <ul>
          <li
            style={{ marginBottom: "30px", marginTop: "30px" }}
            key={payCategory}
          >
            {payCategory === 0 && "전체"}
            {payCategory === 2 && "무통장"}
            {payCategory === 3 && "카드"}
          </li>
        </ul>
      ),
    },
  ];

  // 테이블 끝

  return (
    <>
      <BigKeyword style={{ border: `1px solid ${Common.color.primary}` }}>
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
          borderTop: "none",
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
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                itemActiveBg: "#616161",
                itemColor: "#616161",
                itemHoverBg: "#616161",
                itemHoverColor: "#fff",
                itemSelectedBg: "#616161",
                itemSelectedColor: "#fff",
                trackBg: "none",
              },
            },
          }}
        >
          <Segmented<string>
            options={["주문일 역순", "주문일 순"]}
            onChange={value => {
              changeSortby(value);
            }}
          />
        </ConfigProvider>
      </BtList>
      <ModifyButton>
        <MiddleButton
          style={{ background: " #575757" }}
          onClick={handleClickSearch}
        >
          검색
        </MiddleButton>
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#A5A5A5",
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
          style={{ marginBottom: "20px" }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
        />

        <Pagination
          style={{ textAlign: "center" }}
          current={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </ConfigProvider>
    </>
  );
};

export default OrderInfoSection;
