import React, { useEffect, useState } from "react";
import api from "../services/api.ts";
import { Appointment } from "../types/Appointment.ts";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardDoctor.css";

const DashboardDoctor: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        const response = await api.get(`/doctors/${doctorId}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="dashboard-doctor">
      <h2>Doctor Dashboard</h2>
      <h3>Upcoming Appointments</h3>
      <ul className="appointment-list">
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.appointmentDate} with Patient {appt.patient.name} ({appt.status})
          </li>
        ))}
      </ul>

      {/* ✅ Navigation buttons */}
      <div className="dashboard-actions">
        <button onClick={() => navigate("/")}>Logout</button>
        <button onClick={() => navigate("/doctor/profile")}>View Profile</button>
      </div>
    </div>
  );
};

export default DashboardDoctor;
