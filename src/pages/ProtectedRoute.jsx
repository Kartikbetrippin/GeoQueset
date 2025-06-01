import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../Contexts/AppContext";

const ProtectedRoute = ({ children }) => {
  const [appState] = useContext(AppContext);

  if (!appState.name) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute;
