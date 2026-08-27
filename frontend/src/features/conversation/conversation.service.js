import * as conversationApi from "./conversation.api";

export const getMyConversations = () => {
  return conversationApi.getMyConversations();
};

export const getConversationById = (conversationId) => {
  return conversationApi.getConversationById(conversationId);
};
