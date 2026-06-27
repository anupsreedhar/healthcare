import React, { useState } from "react";
import MedicalHistoryTab from "./MedicalHistoryTab.tsx";
import PrescriptionsTab from "./PrescriptionsTab.tsx";

interface Props {
  patientId: number;
}

const PatientDetailsTab: React.FC<Props> = ({ patientId }) => {
  const [activeSubTab, setActiveSubTab] = useState("medicalHistory");

  return (
    <div className="patient-details-tab">
      <h2>Patient Details</h2>

      {/* Sub-tab navigation */}
      <div className="sub-tabs">
        <button
          className={activeSubTab === "medicalHistory" ? "active" : ""}
          onClick={() => setActiveSubTab("medicalHistory")}
        >
          Medical History
        </button>
        <button
          className={activeSubTab === "prescriptions" ? "active" : ""}
          onClick={() => setActiveSubTab("prescriptions")}
        >
          Prescriptions
        </button>
      </div>

      {/* Sub-tab content */}
      <div className="sub-tab-content">
        {activeSubTab === "medicalHistory" ? (
          <MedicalHistoryTab patientId={patientId} editable />
        ) : (
          <PrescriptionsTab patientId={patientId} editable />
        )}
      </div>
    </div>
  );
};

export default PatientDetailsTab;
