// MyBaby 컴포넌트
import { Radio } from "antd";
import { BigKeyword, Common } from "../../../styles/AdminBasic";
import { FC } from "react";

interface ChildProps {
  ichildAge: number;
  gender: string;
}

interface MyBabyProps {
  childData: ChildProps[];
  childIndex: number;
}

const MyBaby: FC<MyBabyProps> = ({ childData, childIndex }) => {
  return (
    <div>
      {childData.map((child, index) => (
        <BigKeyword
          key={index}
          style={{
            borderTop: `1px solid ${Common.color.primary}`,
            height: "auto",
          }}
        >
          <div className="left" style={{ width: "133px" }}>
            아이 {childIndex}
          </div>
          <div
            className="right"
            style={{
              gap: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Radio.Group
              value={child.ichildAge}
              disabled
              style={{ marginRight: "10px" }}
            >
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
            <Radio.Group
              value={child.gender}
              disabled
              style={{ marginRight: "10px" }}
            >
              <Radio.Button value={"M"}>남자</Radio.Button>
              <Radio.Button value={"W"}>여자</Radio.Button>
            </Radio.Group>
          </div>
        </BigKeyword>
      ))}
    </div>
  );
};

export default MyBaby;
