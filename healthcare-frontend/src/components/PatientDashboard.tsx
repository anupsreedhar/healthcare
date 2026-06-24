import React, { useState } from "react";
import TopBar from "./TopBar.tsx";
import AppointmentsTab from "./tabs/AppointmentTab.tsx";
import DepartmentsTab from "./tabs/DepartmentsTab.tsx";
import MedicalHistoryTab from "./tabs/MedicalHistoryTab.tsx";
import PrescriptionsTab from "./tabs/PrescriptionsTab.tsx";
import "../styles/PatientDashboard.css";

const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");

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
    <div className="patient-dashboard">
      <TopBar
        username={username}
        profilePath="/patient/profile"
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

export default PatientDashboard
