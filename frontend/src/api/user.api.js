import api from "./axios";

export const getMe = () => api.get("v1/api/users/me");
