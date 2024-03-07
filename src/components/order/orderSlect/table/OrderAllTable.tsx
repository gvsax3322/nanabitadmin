// import React, { useState, useEffect } from "react";
// import { Table, Pagination, ConfigProvider } from "antd";
// import styled from "@emotion/styled";
// import { API_SERVER_HOST } from "../../../util/util";
// import TestMd from "../../../components/order/TestMd";
// import { getOrderAll, putOrderState } from "../../../api/order/orderAllApi";
// import { Dayjs } from "dayjs";

// // OrderTable 컴포넌트 정의
// const OrderTable = ({
//   dataSource,
//   showModal,
//   handleShowModal,
//   selectIorder,
//   handleProcessBtApi,
//   selectedRowKeys,
//   onSelectChange,
// }) => {
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
//       dataIndex: "sampleData",
//       key: "refundFl",
//       render: (items: any[]) => (
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
//               onClick={() => handleShowModal(items[1])}
//             >
//               주문목록
//             </SearchButton>

//             {items[0] === 0 && (
//               <SearchButton
//                 style={{ background: "rgb(244, 67, 54)" }}
//                 onClick={() => handleProcessBtApi([orderData[1].iorder], 5)}
//               >
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
//             // display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {items.map((item, index) => (
//             <div>
//               <img
//                 src={`${API_SERVER_HOST}/pic/product/${item.iproduct}/${item.repPic}`}
//                 alt=""
//                 style={{
//                   marginBottom: "10px",
//                   marginTop: "10px",
//                   width: "50px",
//                   height: "50px",
//                 }}
//               />
//             </div>
//           ))}
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
//               {item.processState === 1 && "입금대기"}
//               {item.processState === 2 && "배송준비중"}
//               {item.processState === 3 && "배송중"}
//               {item.processState === 4 && "배송완료"}
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
//           <div>
//             {products.map((product, index) => (
//               <React.Fragment key={index}>
//                 {product.refundFl === 0 && (
//                   <SearchButton
//                     style={{ marginBottom: "30px", marginTop: "30px" }}
//                     onClick={() => handleProcessBtApi([orderData[1].iorder], 6)}
//                   >
//                     반품신청
//                   </SearchButton>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
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
//       render: (payCategory: number) => (
//         <ul>
//           <li
//             style={{ marginBottom: "30px", marginTop: "30px" }}
//             key={payCategory}
//           >
//             {payCategory === 0 && "전체"}
//             {payCategory === 2 && "무통장"}
//             {payCategory === 3 && "카드"}
//           </li>
//         </ul>
//       ),
//     },
//   ];

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };
//   // ResultModal을 닫는 함수
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

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
//       <Table
//         rowSelection={rowSelection}
//         columns={columns}
//         dataSource={dataSource}
//         pagination={false}
//       />
//       {showModal && <TestMd onClose={handleCloseModal} iOrder={selectIorder} />}
//     </ConfigProvider>
//   );
// };
