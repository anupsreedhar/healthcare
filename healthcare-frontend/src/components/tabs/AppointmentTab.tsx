import React, { useEffect, useState } from "react";
import api from "../../services/api.ts";
import AppointmentBooking from "../../components/AppointmentBooking.tsx";
import { Appointment } from "../../types/Appointment";
import "../../styles/AppointmentTab.css";

const AppointmentsTab: React.FC = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [previousAppointments, setPreviousAppointments] = useState<Appointment[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);

        let response;
        if (storedRole === "PATIENT") {
          const patientId = localStorage.getItem("patientId");
          response = await api.get(`/patients/${patientId}/appointments`);
        } else if (storedRole === "DOCTOR") {
          const doctorId = localStorage.getItem("doctorId");
          response = await api.get(`/doctors/${doctorId}/appointments`);
        }

        if (response) {
          const now = new Date();
          const upcoming = response.data.filter(
            (appt: Appointment) => new Date(appt.appointmentDate) >= now
          );
          const previous = response.data.filter(
            (appt: Appointment) => new Date(appt.appointmentDate) < now
          );

          setUpcomingAppointments(upcoming);
          setPreviousAppointments(previous);
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (appointmentId: number) => {
    try {
      await api.put(`/appointments/${appointmentId}/cancel`);
      setUpcomingAppointments(prev =>
        prev.map(appt =>
          appt.id === appointmentId ? { ...appt, status: "CANCELLED" } : appt
        )
      );
    } catch (error) {
      console.error("Error cancelling appointment", error);
      alert("Failed to cancel appointment.");
    }
  };

  const renderRow = (appt: Appointment) => (
    <tr key={appt.id}>
      <td>{appt.appointmentDate}</td>
      {role === "PATIENT" ? (
        <td>Dr. {appt.doctor.user.name}</td>
      ) : (
        <td>{appt.patient.user.name}</td>
      )}
      <td>{appt.status}</td>
      <td>
        {role === "PATIENT" && appt.status !== "CANCELLED" && (
          <button
            className="cancel-btn"
            onClick={() => cancelAppointment(appt.id)}
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="appointments-tab">
      {!showBooking ? (
        <>
          {role === "PATIENT" && (
            <button className="book-btn" onClick={() => setShowBooking(true)}>
              Book Appointment
            </button>
          )}

          <h3>Upcoming Appointments</h3>
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Date</th>
                {role === "PATIENT" ? <th>Doctor</th> : <th>Patient</th>}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{upcomingAppointments.map(renderRow)}</tbody>
          </table>

          <h3>Previous Appointments</h3>
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Date</th>
                {role === "PATIENT" ? <th>Doctor</th> : <th>Patient</th>}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{previousAppointments.map(renderRow)}</tbody>
          </table>
        </>
      ) : (
        <AppointmentBooking
          patientId={localStorage.getItem("patientId")}
          onClose={() => setShowBooking(false)}   // ✅ Back button handler
          onBooked={(newAppt) =>
            setUpcomingAppointments([...upcomingAppointments, newAppt])
          }
        />
      )}
    </div>
  );
};

export default AppointmentsTab;
