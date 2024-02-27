import styled from "styled-components";

export const ModifyWrap = styled.div`
  width: 100%;
  height: auto;
`;

export const ModifyInfo = styled.div`
  margin-bottom: 20px;
`;

export const ModifyButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 20px;
`;

export const BtList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ListWrap = styled.div`
  /* thead 부분 */
  .ant-table-thead .ant-table-cell {
    color: #000;
    border: 1px solid #000;
    text-align: center;
    padding: 10px;
    height: 30px;
    background: #cccccc;
  }
  /* tbody border 부분 */
  .ant-table-tbody > tr > td {
    transition: background 0.2s, border-color 0.2s;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }
  /* tbody 내용부분 */
  .ant-table-wrapper .ant-table-tbody > tr > td {
    padding: 0px;
    text-align: center;
    font-size: 18px;
    height: 40px;
  }
  .ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
`;
