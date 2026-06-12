import React, { useEffect, useState } from "react";
import api from "../services/api"; // your axios wrapper
import "/styles/DoctorProfile.css";

interface Doctor {
  id: number;
  name: string;
  email: string;
  specialization: string;
  experienceYears: number;
  hospitalAffiliation: string;
  address: string;
  dateOfBirth: string;
  gender: string;
}

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorId = localStorage.getItem("doctorId"); // stored at login
    if (!doctorId) {
      console.error("Doctor ID not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!doctor) return <p>No doctor profile found.</p>;

  return (
    <div className="doctor-profile">
      <h2>Doctor Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Experience:</strong> {doctor.experienceYears} years</p>
        <p><strong>Hospital Affiliation:</strong> {doctor.hospitalAffiliation}</p>
        <p><strong>Address:</strong> {doctor.address}</p>
        <p><strong>Date of Birth:</strong> {doctor.dateOfBirth}</p>
        <p><strong>Gender:</strong> {doctor.gender}</p>
      </div>
    </div>
  );
};
export default DoctorProfile;
