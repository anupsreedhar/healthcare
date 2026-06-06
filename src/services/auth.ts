import {jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("patientId");
  localStorage.removeItem("doctorId");
};

export const getUserRole = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.role.replace(/[    \[\]    ]/g, "");
  } catch {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
