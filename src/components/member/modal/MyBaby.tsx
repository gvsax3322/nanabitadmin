import { Radio } from "antd";
import { BigKeyword, Common } from "../../../styles/AdminBasic";

const MyBaby = () => {
  return (
    <div>
      <BigKeyword
        style={{
          borderTop: `1px solid ${Common.color.primary}`,
          height: "auto",
        }}
      >
        <div className="left" style={{ width: "130px" }}>
          아이정보
        </div>
        <div
          className="right"
          style={{
            gap: "10px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Radio.Group value={2} disabled style={{ marginRight: "10px" }}>
            <Radio.Button value={1}>임신/출산</Radio.Button>
            <Radio.Button value={2}>신생아</Radio.Button>
            <Radio.Button value={3}>베이비</Radio.Button>
            <Radio.Button value={4}>완료기</Radio.Button>
          </Radio.Group>
        </div>

        <div className="left" style={{ width: "130px" }}>
          아이성별
        </div>
        <div className="right">
          <Radio.Group value={"W"} disabled style={{ marginRight: "10px" }}>
            <Radio.Button value={"M"}>남자</Radio.Button>
            <Radio.Button value={"W"}>여자</Radio.Button>
          </Radio.Group>
        </div>
      </BigKeyword>
    </div>
  );
};

export default MyBaby;
