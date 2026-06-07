import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPatient from "./components/DashboardPatient";
import DashboardDoctor from "./components/DashboardDoctor";
import AppointmentBooking from "./components/AppointmentBooking";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./route/PrivateRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute allowedRoles={["PATIENT"]}>
                <DashboardPatient />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute allowedRoles={["DOCTOR"]}>
                <DashboardDoctor />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
