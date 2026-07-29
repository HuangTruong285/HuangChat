import api from "./axios";

export const register = (data) => api.post("v1/api/auth/register", data);
export const login = (data) => api.post("v1/api/auth/login", data);
export const getMe = () => api.get("v1/api/auth/me");

export const logout = () => api.post("/auth/logout");
