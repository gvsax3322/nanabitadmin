import { ReactElement } from "react";
import { Navigate } from "react-router";
import ItemAll from "../pages/admin/item/ItemAll";
import { ItemMain } from "../pages/admin/item/ItemMain";

interface ProductAdmin {
  path: string;
  element: ReactElement;
  children: {
    path: string;
    element: ReactElement;
  }[];
}

const productAdmin: ProductAdmin = {
  path: "item",
  element: <ItemMain />,
  children: [
    { path: "", element: <Navigate to="all" /> },
    { path: "all", element: <ItemAll /> },

  ],
};

export default productAdmin;
