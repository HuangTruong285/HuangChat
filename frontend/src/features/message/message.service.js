import * as messageApi from "./message.api";

export const sendMessage = (data) => {
  return messageApi.sendMessage(data);
};

export const getMessageByConversation = (conversationId) => {
  return messageApi.getMessages(conversationId);
};
