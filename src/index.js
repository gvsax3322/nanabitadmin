import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/normalize.css";

import { RouterProvider } from "react-router-dom";

import { routerAdmin } from "./routes/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routerAdmin} />);
