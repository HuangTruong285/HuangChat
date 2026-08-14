import * as conversationApi from "../api/conversation.api";

export const getMyConversations = async () => {
  const response = await conversationApi.getMyConversations();
  return response.data;
};

export const getConversationById = async (conversationId) => {
  const response = await conversationApi.getConversationById(conversationId);
  return response.data;
};
