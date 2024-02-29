import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/normalize.css";
import { RouterProvider } from "react-router-dom";
import { routerAdmin } from "./routes/router";
import { Provider } from "react-redux";
import store from "./store/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <>
    <Provider store={store}>
      <RouterProvider router={routerAdmin} />
    </Provider>
    ,
  </>,
);
