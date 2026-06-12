import React, { useState } from "react";
import api from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { getUserRole } from "../services/auth.ts";
import {jwtDecode } from "jwt-decode";
import "../styles/LoginPage.css"; // 👈 create a CSS file for styling

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  interface DecodedToken {
    sub: string;
    role: string;
    userId?: number;    
    exp: number;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      login(token);
      const decoded: DecodedToken = jwtDecode(token);   
      if (decoded.role === "PATIENT") {
        localStorage.setItem("patientId", decoded.userId?.toString() || "");
      } else if (decoded.role === "DOCTOR") {
        localStorage.setItem("doctorId", decoded.userId?.toString() || "");
      }

      const role = getUserRole();
      if (role === "PATIENT") {
           navigate("/patient/dashboard");
      } else if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Healthcare Appointment System</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          New user?{" "}
          <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
