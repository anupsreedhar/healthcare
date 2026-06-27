import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import DashboardPatient from "./components/PatientDashboard.tsx";
import DashboardDoctor from "./components/DoctorDashboard.tsx";
import AppointmentBooking from "./components/AppointmentBooking.tsx";
import AppointmentTab from "./components/tabs/AppointmentTab.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import PrivateRoute from "./route/PrivateRoute.tsx";
import DoctorProfile from "./components/DoctorProfile.tsx";
import PatientDetails from "./components/PatientDetails.tsx";

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
            }>
              {/* Child routes inside PatientDashboard */}
              <Route path="appointments" element={<AppointmentTab />} />
              <Route path="appointments/book" element={<AppointmentBooking />} />
          </Route>

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
          <Route
            path="/doctor/profile"
            element={
            <PrivateRoute allowedRoles={["DOCTOR"]}>
                <DoctorProfile />
        </PrivateRoute>       
           }
         />


        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
