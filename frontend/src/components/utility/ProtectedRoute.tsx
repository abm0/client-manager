import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_PATH } from "../../shared/paths";
import { AuthContext } from "../auth/AuthProvider";

interface IProtectedRoute {
    children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const { isAuthenticated } = useContext(AuthContext);
    
  return isAuthenticated ? children : <Navigate to={AUTH_PATH} />;
}

export { ProtectedRoute };
