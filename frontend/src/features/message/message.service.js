import * as messageApi from "./message.api";

export const sendMessage = async (data) => {
  const response = messageApi.sendMessage(data);

  return response.data;
};

export const getMessageByConversation = async (conversationId) => {
  const response = await messageApi.getMessages(conversationId);

  return response.data;
};
