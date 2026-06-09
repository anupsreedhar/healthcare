import React, { useEffect, useState } from "react";
import api from "../services/api.ts";
import { Appointment } from "../types/Appointment.ts";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPatient.css";

const DashboardPatient: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientId = localStorage.getItem("patientId");
        const response = await api.get(`/patients/${patientId}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="dashboard-patient">
      <h2>Patient Dashboard</h2>
      <h3>Your Appointments</h3>
      <ul className="appointment-list">
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.appointmentDate} with Dr. {appt.doctor.name} ({appt.status})
          </li>
        ))}
      </ul>

      {/* ✅ Navigation button */}
      <button
        className="book-btn"
        onClick={() => navigate("/appointments/book")}
      >
        Book New Appointment
      </button>
    </div>
  );
};

export default DashboardPatient;
