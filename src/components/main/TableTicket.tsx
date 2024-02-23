import { BigKeyword, Common, SubTitle } from "../../styles/AdminBasic";

interface TableTicketProps {
  title: string;
}

export const TableTicket: React.FC<TableTicketProps> = ({ title }) => {
  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <SubTitle>{title}</SubTitle>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">상품가격</div>
          <div className="right"></div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">상품가격</div>
          <div className="right"></div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">상품가격</div>
          <div className="right"></div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">상품가격</div>
          <div className="right"></div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">상품가격</div>
          <div className="right"></div>
        </BigKeyword>
      </div>
    </>
  );
};
