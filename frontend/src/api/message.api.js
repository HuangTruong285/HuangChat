import api from "./axios";
import { API } from "../constants/api";

export const sendMessage = async (data) => {
  const response = await api.post(API.MESSAGE.CREATE, data);
  return response.data;
};

export const getMessages = async (conversationId) => {
  const response = await api.get(API.MESSAGE.LIST(conversationId));
  return response.data;
};

export const deleteMessage = async (messageId) => {
  const response = await api.delete(API.MESSAGE.DELETE(messageId));
  return response.data;
};
