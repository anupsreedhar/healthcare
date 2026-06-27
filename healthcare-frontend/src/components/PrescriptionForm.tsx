import React, { useState } from "react";
import api from "../services/api";
import { Prescription } from "../types/Prescription";

interface Props {
  patientId: number;
  onAdded: (newPrescription: Prescription) => void;
}

const PrescriptionForm: React.FC<Props> = ({ patientId, onAdded }) => {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/patients/${patientId}/prescriptions`, {
        medicineName,
        dosage,
        date: new Date().toISOString(),
      });
      onAdded(response.data); // update parent list
      setMedicineName("");
      setDosage("");
    } catch (error) {
      console.error("Error adding prescription", error);
      alert("Failed to add prescription");
    }
  };

  return (
    <form className="prescription-form" onSubmit={handleSubmit}>
      <h4>Add Prescription</h4>
      <input
        type="text"
        placeholder="Medicine Name"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        required
      />
      <button type="submit">Save Prescription</button>
    </form>
  );
};

export default PrescriptionForm;
