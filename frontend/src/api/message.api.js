import api from "./axios";
import { API } from "../constants/api";

export const getMessages = (conversationId) => {
  const response = api.get(API.MESSAGE.LIST(conversationId));
  return response;
};

export const sendMessage = (data) => {
  const response = api.post(API.MESSAGE.CREATE, data);
  return response;
};

export const deleteMessage = (messageId) => {
  const response = api.delete(API.MESSAGE.DELETE(messageId));
  return response;
};
