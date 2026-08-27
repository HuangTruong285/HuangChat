import { toPublicUser } from "../user/index.js";

// ==============================
// HELPER
// ==============================
const toId = (value) => {
  if (!value) return null;

  return value._id ? value._id.toString() : value.toString();
};

// ==============================
// MAP MESSAGE
// ==============================
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
    id: toId(message._id),
    conversationId: toId(message.conversationId),
    senderId: toId(message.senderId),
    type: message.type,
    content: message.content ?? "",
    imgUrl: message.imgUrl ?? null,
    imgPublicId: message.imgPublicId ?? null,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
};

// ==============================
// MAP MESSAGE LIST
// ==============================
export const toMessageList = (messages = []) => {
  return messages.map(toMessage);
};

export const toMessageWithSender = (message) => {
  if (!message) return null;

  return {
    id: toId(message._id),
    conversationId: toId(message.conversationId),
    sender: toPublicUser(message.senderId),
    type: message.type,
    content: message.content ?? "",
    imgUrl: message.imgUrl ?? null,
    imgPublicId: message.imgPublicId ?? null,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
};

export const toMessageWithSenderList = (messages = []) => {
  return messages.map(toMessageWithSender);
};
