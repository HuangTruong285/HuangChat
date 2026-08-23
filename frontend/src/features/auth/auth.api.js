import api from "../../lib/axios";
import { API } from "../../constants/api";

export const register = async (body) => {
  const response = await api.post(API.AUTH.REGISTER, body);

  console.log("LOGIN RESPONSE:", response.data);

  return response.data;
};

export const login = async (body) => {
  const response = await api.post(API.AUTH.LOGIN, body);
  return response.data;
};

export const refresh = async () => {
  const response = await api.post(API.AUTH.REFRESH);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(API.AUTH.LOGOUT);
  return response.data;
};
