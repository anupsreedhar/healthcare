import React from "react";
import { Department } from "../types/Department";
import "../styles/DepartmentCard.css";
import { useNavigate } from "react-router-dom";

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const navigate = useNavigate();

  return (
    <div className="department-card" onClick={() => navigate(`/department/${department.id}`)}>
      <h4>{department.name}</h4>
      <p>Click to view doctors</p>
    </div>
  );
};

export default DepartmentCard;
