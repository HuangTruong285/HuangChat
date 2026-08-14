// ============================== MAP MESSAGE ==============================
/*
 * id : Id của tin nhắn
 * conversationId : Id của cuộc hội thoại
 * senderId : Id của người gửi
 * type: Loại tin nhắn
 * Content : Nội dung tin nhắn
 * imgUrl : Link hình ảnh khi gửi hình ảnh
 * createdAt : Thời gian tạo tin nhắn
 * updatedAt : Thời gian sửa tin nhắn
 */
export const toMessage = (message) => {
  if (!message) return null;

  return {
    id: message._id?.toString() ?? message.id?.toString(),
    conversationId: message.conversationId?._id
      ? message.conversationId._id?.toString()
      : message.conversationId?.toString(),
    senderId: message.senderId?._id
      ? message.senderId._id?.toString()
      : message.senderId?.toString(),
    type: message.type,
    content: message.content ?? "",
    imgUrl: message.imgUrl ?? "",
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
};

// ============================== MAP MESSAGE LIST ==============================
export const toMessageList = (messages = []) => {
  return messages.map(toMessage);
};

export const toMessageSender = (sender) => {
  if (!sender) return null;

  return {
    id: sender._id?.toString() ?? sender.id?.toString(),
    username: sender.username ?? "",
    displayName: sender.displayName ?? "",
    avatarUrl: sender.avatarUrl ?? null,
  };
};
