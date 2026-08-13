import api from "./axios";
import { API } from "../constants/api";

export const getMyConversations = async () => {
  const response = await api.get(API.CONVERSATION.LIST);
  return response.data;
};

export const getConversation = async (conversationId) => {
  const response = await api.get(API.CONVERSATION.DETAIL(conversationId));
  return response.data;
};

export const createDirectConversation = async (userId) => {
  const response = await api.post(API.CONVERSATION.CREATE.DIRECT, { userId });
  return response.data;
};

export const createGroupConversation = async (data) => {
  const response = await api.post(API.CONVERSATION.CREATE_GROUP, data);
  return response.data;
};
