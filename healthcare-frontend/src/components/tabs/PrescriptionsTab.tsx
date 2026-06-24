import React, { useEffect, useState } from "react";
import api from "../../services/api.ts";
import { Prescription } from "../types/Prescription";
import "../../styles/PrescriptionsTab.css";

const PrescriptionsTab: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const patientId = localStorage.getItem("patientId");
        const response = await api.get(`/patients/${patientId}/prescriptions`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="prescriptions-tab">
      <h3>Past Prescriptions</h3>
      <table className="prescriptions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Medicine</th>
            <th>Dosage</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.date}</td>
              <td>{prescription.medicineName}</td>
              <td>{prescription.dosage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionsTab;