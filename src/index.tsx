import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./core.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Charts from "./components/Chart/Chart1";
import Home from "./components/Structure/Home2";
import Login from "./components/User/Login";
import Router from "./components/Router";

ReactDOM.render(
  <React.StrictMode>
    <Router />
    {/* <Login /> */}
    {/* <Home vitalId={2} /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
