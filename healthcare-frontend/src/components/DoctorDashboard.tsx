import React, { useState } from "react";
import TopBar from "./TopBar.tsx";
import AppointmentsTab from "./tabs/AppointmentTab.tsx";
import DepartmentsTab from "./tabs/DepartmentsTab.tsx";
import PatientDetailsTab from "./tabs/PatientDetailsTab.tsx"; // ✅ new tab
import "../styles/DoctorDashboard.css";

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const username = localStorage.getItem("username");
  const breadcrumb = ["Dashboard", activeTab.charAt(0).toUpperCase() + activeTab.slice(1)];

  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <AppointmentsTab
            onPatientClick={(id) => {
              console.log("DoctorDashboard received patient:", id);
              setSelectedPatientId(id);
              setActiveTab("patientDetails");
            }}
          />
        );
      case "departments":
        return <DepartmentsTab />;
      case "patientDetails":
        return selectedPatientId ? (
          <PatientDetailsTab patientId={selectedPatientId} />
        ) : (
          <p>Select a patient from Appointments</p>
        );
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
        {selectedPatientId && (
          <button
            className={activeTab === "patientDetails" ? "active" : ""}
            onClick={() => setActiveTab("patientDetails")}
          >
            Patient Details
          </button>
        )}
      </div>

      {/* ✅ Dynamic Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default DoctorDashboard;
