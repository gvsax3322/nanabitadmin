import { CaretUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

const AdminBasic = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickScroll = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
        {showButton && (
          <CaretUpOutlined
            onClick={handleClickScroll}
            style={{
              position: "fixed",
              bottom: "5%",
              right: "1%",
              fontSize: 70,
            }}
          />
        )}
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminBasic;
