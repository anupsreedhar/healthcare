import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import DashboardPatient from "../components/DashboardPatient";
import DashboardDoctor from "../components/DashboardDoctor";
import AppointmentBooking from "../components/AppointmentBooking";
import PrivateRoute from "./PrivateRoute";
import { getUserRole } from "../services/auth";

const AppRouter: React.FC = () => {
  const role = getUserRole();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Patient routes */}
      <Route
        path="/patient/dashboard"
        element={
          <PrivateRoute allowedRoles={["PATIENT"]}>
            <DashboardPatient />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments/book"
        element={
          <PrivateRoute allowedRoles={["PATIENT"]}>
            <AppointmentBooking />
          </PrivateRoute>
        }
      />

      {/* Doctor routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <PrivateRoute allowedRoles={["DOCTOR"]}>
            <DashboardDoctor />
          </PrivateRoute>
        }
      />

      {/* Default redirect based on role */}
      <Route
        path="*"
        element={
          role === "PATIENT"
            ? <Navigate to="/patient/dashboard" />
            : role === "DOCTOR"
            ? <Navigate to="/doctor/dashboard" />
            : <Navigate to="/" />
        }
      />
    </Routes>
  );
};

export default AppRouter;
