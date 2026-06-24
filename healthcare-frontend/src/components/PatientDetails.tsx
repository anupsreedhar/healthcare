import React, { useEffect, useState } from "react";
import api from "../services/api";
import { MedicalRecord } from "../types/MedicalRecord";
import { Prescription } from "../types/Prescription";
import PrescriptionForm from "./PrescriptionForm";

interface Props {
  patientId: number;
  onClose: () => void;
}

const PatientDetails: React.FC<Props> = ({ patientId, onClose }) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    api.get(`/patients/${patientId}/medical-history`).then(res => setRecords(res.data));
    api.get(`/patients/${patientId}/prescriptions`).then(res => setPrescriptions(res.data));
  }, [patientId]);

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <h3>Medical History</h3>
      <ul>
        {records.map(r => <li key={r.id}>{r.description} ({r.date})</li>)}
      </ul>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map(p => <li key={p.id}>{p.medicineName} - {p.dosage}</li>)}
      </ul>

      <PrescriptionForm
        patientId={patientId}
        onAdded={(newPrescription) => setPrescriptions([...prescriptions, newPrescription])}
      />
    </div>
  );
};

export default PatientDetails;
