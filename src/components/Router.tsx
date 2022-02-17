import React, { useEffect, useState } from "react";
import App from "../App";
import Login from "./User/Login";

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  return loggedIn ? <App /> : <Login onLogin={handleLogin} />;
};

export default Router;
