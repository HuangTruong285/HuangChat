// ============================== MAP MESSAGE ==============================
export const toMessage = (message) => {
  if (!message) return null;

  return {
    id: message._id?.toString(),
    conversationId: message.conversationId?._id
      ? message.conversationId._id.toString()
      : message.conversationId?.toString(),
    senderId: message.senderId?._id
      ? message.senderId._id.toString()
      : message.senderId?.toString(),
    type: message.type,
    content: message.content,
    imgUrl: message.imgUrl,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
};

// ============================== MAP MESSAGE LIST ==============================
export const toMessageList = (messages = []) => {
  return messages.map(toMessage);
};
