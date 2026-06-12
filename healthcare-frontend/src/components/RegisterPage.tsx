import React, { useState } from "react";
import api from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
   const [showPassword, setShowPassword] = useState(false); 

   // Common fields
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  // Role-specific fields
  const [specialization, setSpecialization] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [hospitalAffiliation, setHospitalAffiliation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
      name,
      email,
      password,
      role,
      address,
      dateOfBirth,
      gender,
      };

      let endpoint = "/auth/register"; // default

      if (role === "DOCTOR") {
        payload.specialization = specialization;
        payload.experienceYears = experienceYears;
        payload.hospitalAffiliation = hospitalAffiliation;
        endpoint = "/auth/register/doctor";
      } else if (role === "PATIENT") {
        payload.insuranceNumber = insuranceNumber;
        payload.medicalHistory = medicalHistory;
        endpoint = "/auth/register/patient";
      }

      const response = await api.post(endpoint, payload);
      alert("Registration successful! You can now log in.");
      console.log(response.data);
      navigate("/"); // back to login page
    } catch (error) {
      console.error("Error registering user", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
             <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          

           {/* Common fields */}
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>
          
          {role === "DOCTOR" && (
            <>
            <input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Specialization"
              required
            />
            <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                placeholder="Years of Experience"
                required
            />
             <input
               value={hospitalAffiliation}
               onChange={(e) => setHospitalAffiliation(e.target.value)}
               placeholder="Hospital Affiliation"
               required
              />
             </>
          )}

          {role === "PATIENT" && (
            <>
              <input
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
                placeholder="Insurance Number"
                required
              />
              <textarea
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="Medical History"
              />
            </>
          )}

          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login here</span>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
