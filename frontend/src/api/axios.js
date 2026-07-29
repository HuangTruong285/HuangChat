import axios from "axios";

export const TOKEN_KEY = "accessToken";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error.response?.statusCode;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    if ((status = 401 && !window.location.pathname.startsWith("/login"))) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject({ status, message });
  },
);
export default api;
