import React, { useEffect, useState } from "react";
import api from "../../services/api.ts";
import { Department } from "../types/Department.ts";
import "../../styles/DepartmentsTab.css";
import { useNavigate } from "react-router-dom";

const DepartmentsTab: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="departments-tab">
      <h3>Hospital Departments</h3>
      <ul className="departments-list">
        {departments.map((dept) => (
          <li key={dept.id}>
            <button
              className="department-button"
              onClick={() => navigate(`/department/${dept.id}`)}
            >
              {dept.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsTab;
