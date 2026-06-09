import React, { useState, useEffect } from "react";
import api from "../services/api.ts";
import { Appointment } from "../types/Appointment.ts";
import { useNavigate } from "react-router-dom";
import "../styles/AppointmentBooking.css";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

const AppointmentBooking: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [status] = useState("BOOKED");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patientId = localStorage.getItem("patientId");
      const appointment: Partial<Appointment> = {
        appointmentDate: date,
        status,
        patient: { id: Number(patientId), name: "" },
        doctor: { id: selectedDoctor!, name: "", specialization: "" }
      };

      const response = await api.post("/appointments", appointment);
      alert("Appointment booked successfully!");
      console.log(response.data);
      navigate("/patient/dashboard"); // ✅ go back to dashboard after booking
    } catch (error) {
      console.error("Error booking appointment", error);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Doctor:</label>
        <select
          value={selectedDoctor ?? ""}
          onChange={(e) => setSelectedDoctor(Number(e.target.value))}
          required
        >
          <option value="">-- Choose a doctor --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>

        <label>Date & Time:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>

      {/* ✅ Navigation buttons */}
      <div className="appointment-actions">
        <button onClick={() => navigate("/patient/dashboard")}>Back to Dashboard</button>
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
