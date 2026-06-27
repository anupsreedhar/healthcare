import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MedicalHistoryTab from "./tabs/MedicalHistoryTab.tsx";
import PrescriptionsTab from "./tabs/PrescriptionsTab.tsx";

const PatientDetails: React.FC = () => {
  const { id } = useParams(); // patientId from URL
  const [activeTab, setActiveTab] = useState("medicalHistory");

  const renderTabContent = () => {
    switch (activeTab) {
      case "medicalHistory":
        return <MedicalHistoryTab patientId={Number(id)} />;
      case "prescriptions":
        return <PrescriptionsTab patientId={Number(id)} />;
      default:
        return <MedicalHistoryTab patientId={Number(id)} />;
    }
  };

  return (
    <div className="patient-details">
      <h2>Patient Details</h2>

      {/* Tab Navigation */}
      <div className="tabs">
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

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default PatientDetails;
