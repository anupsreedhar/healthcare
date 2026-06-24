import React, { useState, useEffect } from "react";
import TopBar from "./TopBar.tsx";
import AppointmentCard from "./AppointmentCard.tsx";
import AppointmentsTab from "./tabs/AppointmentTab.tsx";
import DepartmentsTab from "./tabs/DepartmentsTab.tsx";
import MedicalHistoryTab from "./tabs/MedicalHistoryTab.tsx";
import PrescriptionsTab from "./tabs/PrescriptionsTab.tsx";
import api from "../services/api.ts";
import { Appointment } from "../types/Appointment";
import "../styles/DoctorDashboard.css";

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const doctorId = localStorage.getItem("doctorId");
  const username = localStorage.getItem("username");
  const breadcrumb = ["Dashboard", activeTab.charAt(0).toUpperCase() + activeTab.slice(1)];

  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return <AppointmentsTab />;
      case "departments":
        return <DepartmentsTab />;
      case "medicalHistory":
        return <MedicalHistoryTab />;
      case "prescriptions":
        return <PrescriptionsTab />;
      default:
        return <AppointmentsTab />;
    }
  };


  return (
    <div className="doctor-dashboard">
      <TopBar
        username={username}
        profilePath="/doctor/profile"
        breadcrumb={breadcrumb}
        departments={[]} // will be fetched in DepartmentsTab
      />

      {/* ✅ Tab Navigation */}
      <div className="tabs">
        <button
          className={activeTab === "appointments" ? "active" : ""}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={activeTab === "departments" ? "active" : ""}
          onClick={() => setActiveTab("departments")}
        >
          Departments
        </button>
        <button
          className={activeTab === "medicalHistory" ? "active" : ""}
          onClick={() => setActiveTab("medicalHistory")}
        >
          Medical History
        </button>
        <button
          className={activeTab === "prescriptions" ? "active" : ""}
          onClick={() => setActiveTab("prescriptions")}
        >
          Prescriptions
        </button>
      </div>

      {/* ✅ Dynamic Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};


export default DoctorDashboard;
