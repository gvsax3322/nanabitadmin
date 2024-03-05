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
  gap: 5px;
  margin-bottom: 20px;
`;

export const BtList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ListWrap = styled.div`
  background-color: #535353;
  color: #fff;
  border-radius: 8px;

  /* Table Header 스타일 */
  .ant-table-thead .ant-table-cell {
    color: #fff;

    text-align: center;
    padding: 10px;
    background: #535353;
  }

  /* Table Body 스타일 */
  .ant-table-tbody > tr > td {
    text-align: center;
    padding: 10px;
  }

  /* Table Body 마지막 행 스타일 */
  .ant-table-tbody > tr:last-child > td {
    border-bottom: 1px solid #fff;
  }

  .ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before,
  .ant-table-wrapper
    .ant-table-thead
    > tr
    > td:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
`;

export const ChartWrap = styled.div`
  background-color: #535353;
  color: #fff;
  border-radius: 8px;

  /* Table Header 스타일 */
  .ant-table-thead .ant-table-cell {
    color: #fff;

    text-align: center;
    padding: 10px;
    background: #535353;
  }

  /* Table Body 스타일 */
  .ant-table-tbody > tr > td {
    padding: 10px;
  }

  /* Table Body 마지막 행 스타일 */
  .ant-table-tbody > tr:last-child > td {
    border-bottom: 1px solid #fff;
  }

  .ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before,
  .ant-table-wrapper
    .ant-table-thead
    > tr
    > td:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
`;
