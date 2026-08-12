import api from "./axios";
import { API } from "../constants/api";

export const getMyConversations = () => {
  const response = api.get(API.CONVERSATION.LIST);
  return response.data;
};

export const getConversation = (conversationId) => {
  const response = api.get(API.CONVERSATION.DETAIL(conversationId));
  return response.data;
};

export const createDirectConversation = (userId) => {
  const response = api.post(API.CONVERSATION.CREATE.DIRECT, { userId });
  return response.data;
};

export const createGroupConversation = (data) => {
  const response = api.post(API.CONVERSATION.CREATE_GROUP, data);
  return response.data;
};
