import React, { useEffect, useState } from "react";
import api from "../../services/api.ts";
import { MedicalRecord } from "../types/MedicalRecord";
import { Prescription } from "../types/Prescription";
import "../../styles/MedicalHistoryTab.css";

const MedicalHistoryTab: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const patientId = localStorage.getItem("patientId");

        const recordsResponse = await api.get(`/patients/${patientId}/records`);
        setRecords(recordsResponse.data);

        const prescriptionsResponse = await api.get(`/patients/${patientId}/prescriptions`);
        setPrescriptions(prescriptionsResponse.data);
      } catch (error) {
        console.error("Error fetching medical history", error);
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div className="medical-history-tab">
      <h3>Past Records</h3>
      <ul className="records-list">
        {records.map((record) => (
          <li key={record.id}>
            <strong>{record.recordType}</strong> - {record.description} ({record.date})
          </li>
        ))}
      </ul>

      <h3>Past Prescriptions</h3>
      <ul className="prescriptions-list">
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>
            <strong>{prescription.medicineName}</strong> - {prescription.dosage} ({prescription.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalHistoryTab;