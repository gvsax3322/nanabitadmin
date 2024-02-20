import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";
import { HeaderStyle, IconButton, LogoutButton } from "../styles/AdminBasic";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleClickMove = () => {
    navigate("/admin/item");
  };
  const handleClickOrder = () => {
    navigate("/admin/order");
  };
  return (
    <HeaderStyle>
      <div className="header-top">
        <div className="header-top-left">
          <h2>나나빛Admin</h2>
        </div>
        <div className="header-top-right">
          <IconButton>
            <HomeOutlined style={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton>
            <ShoppingCartOutlined style={{ fontSize: "2rem" }} />
          </IconButton>
          <LogoutButton>로그아웃</LogoutButton>
        </div>
      </div>
      <div className="header-bottom">
        <ul>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            회원관리
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            가맹점관리
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            공급사관리
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            카테고리 관리
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
            onClick={handleClickMove}
          >
            상품관리
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
            onClick={handleClickOrder}
          >
            주문관리
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            통계분석
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            고객지원
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
          >
            환경설정
          </motion.li>
        </ul>
      </div>
    </HeaderStyle>
  );
};

export default AdminHeader;
