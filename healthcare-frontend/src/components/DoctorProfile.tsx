import React, { useEffect, useState } from "react";
import api from "../services/api.ts";
import { useParams } from "react-router-dom";
import { Doctor } from "../types/Doctor";
import "../styles/DoctorProfile.css";

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile", error);
      }
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <p>Loading doctor profile...</p>;

  return (
    <div className="doctor-profile">
      <h2>Dr. {doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Department:</strong> {doctor.departmentName}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Experience:</strong> {doctor.experienceYears} years</p>
      <p><strong>Hospital:</strong> {doctor.hospital}</p>
    </div>
  );
};

export default DoctorProfile;
