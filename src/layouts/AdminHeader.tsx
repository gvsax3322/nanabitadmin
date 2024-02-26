import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderStyle, IconButton, LogoutButton } from "../styles/AdminBasic";
import { Link } from "react-router-dom";
import useCustomLogin from "../hooks/useCustomLogin";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleClickMove = (path: string) => {
    navigate(path);
  };
  const handleClickOrder = () => {
    navigate("/admin/order");
  };
  const handClickMain = () => {
    navigate("/admin");
  };

  const handleClickLogout = () => {
    doLogout();
    navigate("/");
  };

  const { doLogout } = useCustomLogin();

  return (
    <HeaderStyle>
      <div className="header-top">
        <div className="header-top-left">
          <h2 onClick={handClickMain} style={{ cursor: "pointer" }}>
            나나빛Admin
          </h2>
        </div>
        <div className="header-top-right">
          <IconButton>
            <HomeOutlined style={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton>
            <ShoppingCartOutlined style={{ fontSize: "2rem" }} />
          </IconButton>
          <LogoutButton onClick={() => handleClickLogout()}>
            로그아웃
          </LogoutButton>
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
            <Link to={"/admin/member/modify"}>회원관리</Link>
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
            onClick={() => handleClickMove("/admin/item")}
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
            onClick={() => handleClickMove("/admin/charts/sales")}
          >
            매출 및 통계
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
            }}
            onClick={() => handleClickMove("community")}
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
            onClick={() => handleClickMove("/admin/usermain/banner")}
          >
            사용자 메인화면
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
            리뷰관리
          </motion.li>
        </ul>
      </div>
    </HeaderStyle>
  );
};

export default AdminHeader;
