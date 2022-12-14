import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import post from "./post";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-252097560-1";

ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={post}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);
