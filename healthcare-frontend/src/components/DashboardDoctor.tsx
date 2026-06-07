import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Appointment } from "../types/Appointment";

const DashboardDoctor: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Assuming doctorId is stored in localStorage after login
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
    <div>
      <h2>Doctor Dashboard</h2>
      <h3>Upcoming Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.appointmentDate} with Patient {appt.patient.name} ({appt.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardDoctor;
