import api from "./axios";
import { API } from "../constants/api";

export const getMe = async () => {
  const response = await api.get(API.USER.ME);
  return response.data;
};
