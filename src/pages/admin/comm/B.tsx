import { Progress, Space } from "antd";
import React from "react";
import { motion } from "framer-motion";

const B = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.7,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Space wrap>
        <Progress type="circle" percent={30} size={80} />
        <Progress type="circle" percent={70} size={80} status="exception" />
        <Progress type="circle" percent={100} size={80} />
      </Space>
    </motion.div>
  );
};

export default B;
