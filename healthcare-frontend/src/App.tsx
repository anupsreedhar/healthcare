import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import DashboardPatient from "./components/DashboardPatient.tsx";
import DashboardDoctor from "./components/DashboardDoctor.tsx";
import AppointmentBooking from "./components/AppointmentBooking.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import PrivateRoute from "./route/PrivateRoute.tsx";

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
