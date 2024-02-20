import { ReactElement } from "react";
import ItemAll from "../pages/admin/item/ItemAll";
import { ItemMain } from "../pages/admin/item/ItemMain";
import Inventory from "../pages/admin/item/Inventory";
import Qa from "../pages/admin/item/Qa";
import { Navigate } from "react-router";

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
    { path: "inventory", element: <Inventory /> },
    { path: "qa", element: <Qa /> },
  ],
};

export default productAdmin;
