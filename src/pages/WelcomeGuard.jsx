import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../Contexts/AppContext";

const WelcomeGuard = ({ children }) => {
  const [appState] = useContext(AppContext);

  if (appState.name) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default WelcomeGuard;
