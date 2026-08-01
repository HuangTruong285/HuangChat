import api from "./axios";

export const register = (data) => api.post("v1/api/auth/register", data);
export const login = (data) => api.post("v1/api/auth/login", data);
export const refresh = () => api.post("v1/api/auth/refresh");
export const logout = () => api.post("v1/api/auth/logout");
