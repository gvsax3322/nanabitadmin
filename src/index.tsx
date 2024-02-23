import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import "./styles/normalize.css";
import { RouterProvider } from "react-router-dom";
import { routerAdmin } from "./routes/router";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={routerAdmin} />
  </Provider>,
  document.getElementById("root"),
);
