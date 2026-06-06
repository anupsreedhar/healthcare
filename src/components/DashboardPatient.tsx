import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Appointment } from "../types/Appointment";

const DashboardPatient: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Assuming patientId is stored in localStorage after login
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
    <div>
      <h2>Patient Dashboard</h2>
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.appointmentDate} with Dr. {appt.doctor.name} ({appt.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPatient;
