// import styled from "@emotion/styled";
// import { ConfigProvider, Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { Common, SearchButton } from "../../../../styles/AdminBasic";
// import TestMd from "../../TestMd";
// import axios from "axios";
// import { getOrderAll } from "../../../../api/order/orderAllApi";

// interface Order {
//   idk: number;
//   iorder: number;
//   orderedAt: string;
//   products: {
//     repPic: string;
//     productNm: string;
//     cnt: number;
//     processState: number;
//     amount: number;
//     refundFl: number;
//   }[];
//   ordered: string;
//   recipient: string;
//   totalAmount: number;
//   payCategory: number;
//   refundFl: number;
// }

// interface ISubTableProps {
//   tableNum: (selectedRowKeys: React.Key[]) => void;
// }

// const OrderAllTable: React.FC<ISubTableProps> = ({ tableNum }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [data, setData] = useState<ISubTableProps[]>([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await getOrderAll();
//         setTableData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // ResultModal을 보여주는 함수
//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   // ResultModal을 닫는 함수
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };
//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);

//     setSelectedRowKeys(newSelectedRowKeys);
//     tableNum(newSelectedRowKeys);
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };

//   const columns: any[] = [
//     {
//       title: "No",
//       dataIndex: "idk",
//       key: "idk",
//     },
//     {
//       title: "주문일시",
//       dataIndex: "orderedAt",
//       key: "orderedAt",
//     },
//     {
//       title: "주문목록",
//       dataIndex: "refundFl",
//       key: "refundFl",
//       render: (refundFl: number) => (
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <SearchButton
//               style={{ marginBottom: "12px" }}
//               onClick={handleShowModal}
//             >
//               주문목록
//             </SearchButton>
//             {refundFl === 1 && (
//               <SearchButton style={{ background: "rgb(244, 67, 54)" }}>
//                 주문취소
//               </SearchButton>
//             )}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "이미지",
//       dataIndex: "products",
//       key: "repPic",
//       render: (items: any[]) => (
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <ul>
//             {items.map((item, index) => (
//               <li
//                 style={{ marginBottom: "10px", marginTop: "10px" }}
//                 key={index}
//               >
//                 {item.repPic}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ),
//     },
//     {
//       title: "상품명",
//       dataIndex: "products",
//       key: "productNm",
//       render: (items: any[]) => (
//         <ul>
//           {items.map((item, index) => (
//             <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
//               {item.productNm}
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: "수량",
//       dataIndex: "products",
//       key: "cnt",
//       render: (items: any[]) => (
//         <ul>
//           {items.map((item, index) => (
//             <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
//               {item.cnt}
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: "상품금액",
//       dataIndex: "products",
//       key: "amount",
//       render: (items: any[]) => (
//         <ul>
//           {items.map((item, index) => (
//             <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
//               {item.amount}
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: "처리상태",
//       dataIndex: "products",
//       key: "processState",
//       render: (items: any[]) => (
//         <ul>
//           {items.map((item, index) => (
//             <li style={{ marginBottom: "30px", marginTop: "30px" }} key={index}>
//               {item.processState}
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: "반품신청",
//       dataIndex: "products",
//       key: "refundFlProduct",
//       render: (products: any[]) => (
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {products.map((product, index) => (
//             <React.Fragment key={index}>
//               {product.refundFl === 1 && (
//                 <SearchButton style={{ background: "rgb(244, 67, 54)" }}>
//                   주문취소
//                 </SearchButton>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       ),
//     },
//     {
//       title: "주문자",
//       dataIndex: "ordered",
//       key: "ordered",
//     },
//     {
//       title: "수령자",
//       dataIndex: "recipient",
//       key: "recipient",
//     },
//     {
//       title: "총주문액",
//       dataIndex: "totalAmount",
//       key: "totalAmount",
//     },
//     {
//       title: "결제수단",
//       dataIndex: "payCategory",
//       key: "payCategory",
//     },
//   ];

//   const Aaa = styled(Table)`
//     :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
//       .ant-table-tbody
//       .ant-table-row.ant-table-row-selected
//       > .ant-table-cell {
//       background-color: ${Common.color.p800};
//     }
//     .ant-checkbox-checked .ant-checkbox-inner {
//       background-color: ${Common.color.p600};
//       border-color: ${Common.color.p800};
//     }
//     .ant-checkbox-wrapper-checked:hover .ant-checkbox-inner,
//     .ant-checkbox-checked:hover .ant-checkbox-inner {
//       border-color: rgba(40, 40, 40, 0.8) !important;
//     }

//     .ant-checkbox-wrapper:hover .ant-checkbox-inner,
//     .ant-checkbox:hover .ant-checkbox-inner,
//     .ant-checkbox-input:focus + .ant-checkbox-inner {
//       border-color: #d9d9d9 !important;
//     }
//     :where(.css-dev-only-do-not-override-1xg9z9n).ant-checkbox-indeterminate
//       .ant-checkbox-inner:after {
//       background-color: ${Common.color.p800};
//     }
//     &&& {
//       .ant-table-thead > tr > th {
//         text-align: center;
//       }
//       .ant-table-tbody > tr > td {
//         text-align: center;
//       }
//     }
//   `;

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: "#a5a5a5",
//         },
//         components: {
//           Table: {
//             headerBg: "#535353",
//             headerColor: "#fff",
//           },
//         },
//       }}
//     >
//       <Aaa
//         rowSelection={rowSelection}
//         columns={columns}
//         dataSource={data}
//         // dataSource={orderData}
//         pagination={false}
//       />
//       {showModal && <TestMd onClose={handleCloseModal} />}
//     </ConfigProvider>
//   );
// };

// export default OrderAllTable;
