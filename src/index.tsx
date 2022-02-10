import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./core.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Charts from "./components/Chart/Chart1";
import Home from "./components/Structure/Home2";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Home vitalId={2} /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
