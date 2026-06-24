import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage.tsx";
import RegisterPage from "../components/RegisterPage.tsx";
import DashboardPatient from "../components/PatientDashboard.tsx";
import DashboardDoctor from "../components/DoctorDashboard.tsx";
import AppointmentBooking from "../components/AppointmentBooking.tsx";
import DoctorProfile from "../components/DoctorProfile.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import { getUserRole } from "../services/auth.ts";


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
      <Route
        path="/doctor/profile"
        element={
         <PrivateRoute allowedRoles={["DOCTOR"]}>
            <DoctorProfile />
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
