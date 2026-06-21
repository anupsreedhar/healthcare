import React, { useState, useEffect } from "react";
import api from "../services/api.ts";
import { Appointment } from "../types/Appointment";
import { useNavigate } from "react-router-dom";
import "../styles/AppointmentBooking.css";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  consultingFee?: number;
}

interface AppointmentBookingProps {
  onClose: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({onClose}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [status] = useState("BOOKED"); // default status
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
      navigate("/patient/dashboard"); // redirect after booking
    } catch (error) {
      console.error("Error booking appointment", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="appointment-booking">
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
              {doc.consultingFee ? ` - Fee: ₹${doc.consultingFee}` : ""}
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

        <button className="back-btn" onClick={onClose}>
          ← Back to Appointments
        </button>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
