import * as conversationApi from "../api/conversation.api";

export const getMyConversations = async () => {
  const response = await conversationApi.getMyConversations();
  return response.data;
};
