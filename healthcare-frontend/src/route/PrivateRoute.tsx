import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode }  from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const userRole = decoded.role.replace(/[\[\]]/g, ""); 

    if (!allowedRoles.includes(userRole)) {
      // Redirect to dashboard based on role
      if (userRole === "PATIENT") return <Navigate to="/patient/dashboard" />;
      if (userRole === "DOCTOR") return <Navigate to="/doctor/dashboard" />;
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
