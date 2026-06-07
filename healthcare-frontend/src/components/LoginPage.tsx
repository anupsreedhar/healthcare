import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post("/auth/login", { username, password });
    const token = response.data.token;
    localStorage.setItem("token", token);
    login(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
