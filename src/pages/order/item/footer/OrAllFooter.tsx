// import styled from "@emotion/styled";
// import React, { useState } from "react";
// import {
//   BigButton,
//   BigKeyword,
//   Common,
//   DeleteButton,
//   MainTitle,
//   MiddleInput,
//   SubTitle,
// } from "../../../../styles/AdminBasic";
// import OrderAllSelect from "../../../../components/order/orderSlect/OrderAllSelect";

// const Wrap = styled.div`
//   margin-bottom: 30px;
//   border-bottom: 2px solid ${Common.color.primary};
// `;

// const OrAllFooter = () => {
//   const [stateBt, setStateBt] = useState(0);

//   // 기간버튼 핸들러
//   const handleStateBt = (BTIndex: number) => {
//     setStateBt(BTIndex);
//     // 선택된 기간에 따른 동작 수행
//     console.log("ㅎㅇ 나 일괄처리 버튼:", BTIndex);
//   };

//   const handleClickLowHigh = filter => {
//     // 검색 가능하도록 true 변경
//     if (setUserSearchActive != null) {
//       setUserSearchActive(true);
//     }

//     setActiveLHFilter(filter);
//     onChangeSortBy(filter);
//   };

//   return (
//     <>
//       <Wrap>
//         {/* <MainTitle>주문일괄처리</MainTitle> */}
//         <SubTitle style={{ marginTop: "100px" }}>주문일괄처리</SubTitle>
//         <BigKeyword
//           style={{
//             borderTop: `1px solid ${Common.color.primary}`,
//             height: "80px",
//           }}
//         >
//           <div className="left">선택한 주문을</div>
//           <div className="right">
//             <BigButton
//               style={{ marginRight: "5px" }}
//               onClick={() => handleStateBt(2)}
//               active={activeLHFilter === 0}
//             >
//               배송준비중
//             </BigButton>
//             <BigButton
//               style={{ marginRight: "5px" }}
//               onClick={() => handleStateBt(3)}
//             >
//               배송중
//             </BigButton>
//             <BigButton
//               style={{ marginRight: "5px" }}
//               onClick={() => handleStateBt(4)}
//             >
//               배송완료
//             </BigButton>
//             <BigButton onClick={() => handleStateBt(5)}>주문취소</BigButton>
//             {/* <MiddleInput /> */}
//           </div>
//         </BigKeyword>
//       </Wrap>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "10px",
//         }}
//       ></div>
//       <div></div>
//     </>
//   );
// };

// export default OrAllFooter;
