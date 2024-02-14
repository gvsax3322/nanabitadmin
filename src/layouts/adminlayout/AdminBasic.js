import React from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router";

const AdminBasic = () => {
  return (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminBasic;
