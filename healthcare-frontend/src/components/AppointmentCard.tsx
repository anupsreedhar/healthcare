import React from "react";
import { Appointment } from "../types/Appointment";
import "../styles/AppointmentCard.css";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="appointment-card">
      <h4>{appointment.appointmentDate} at {appointment.appointmentTime}</h4>
      <p><strong>Doctor:</strong> Dr. {appointment.doctor.name}</p>
      <p><strong>Status:</strong> {appointment.status}</p>
      <p><strong>Payment:</strong> {appointment.paymentStatus ? "Completed" : "Pending"}</p>
    </div>
  );
};

export default AppointmentCard;
