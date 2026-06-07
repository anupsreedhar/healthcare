import React, { useEffect, useState } from "react";
import api from "../services/api.ts";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

interface Props {
  onSelectDoctor: (doctorId: number) => void;
}

const DoctorSelection: React.FC<Props> = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialization, setSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleFilter = () => {
    if (specialization.trim() === "") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) =>
          doc.specialization.toLowerCase().includes(specialization.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <h2>Select a Doctor</h2>
      <input
        type="text"
        placeholder="Filter by specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>

      <ul>
        {filteredDoctors.map((doc) => (
          <li key={doc.id}>
            {doc.name} ({doc.specialization})
            <button onClick={() => onSelectDoctor(doc.id)}>Choose</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSelection;
