import * as messageApi from "../api/message.api";

export const sendMessage = async (data) => {
  const response = messageApi.sendMessage(data);

  return response.data;
};

export const getMessageByConversation = async (conversationId) => {
  const response = await messageApi.getMessages(conversationId);

  return response.data;
};
