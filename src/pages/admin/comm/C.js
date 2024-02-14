import { Progress, Space } from "antd";
import React from "react";
import { motion } from "framer-motion";

const twoColors = {
  "0%": "#108ee9",
  "100%": "#87d068",
};
const conicColors = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};
const C = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.7,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
      }}
    >
      <Progress percent={99.9} strokeColor={twoColors} />
      <Progress
        percent={50}
        status="active"
        strokeColor={{
          from: "#108ee9",
          to: "#87d068",
        }}
      />
      <Space wrap>
        <Progress type="circle" percent={90} strokeColor={twoColors} />
        <Progress type="circle" percent={100} strokeColor={twoColors} />
        <Progress type="circle" percent={93} strokeColor={conicColors} />
      </Space>
      <Space wrap>
        <Progress type="dashboard" percent={90} strokeColor={twoColors} />
        <Progress type="dashboard" percent={100} strokeColor={twoColors} />
        <Progress type="dashboard" percent={93} strokeColor={conicColors} />
      </Space>
    </motion.div>
  );
};

export default C;
