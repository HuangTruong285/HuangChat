import * as messageRepository from "./message.repository.js";
import { conversationRepository } from "../conversation/index.js";

import ApiError from "../../utils/ApiError.js";

// ============================== SEND MESSAGE ==============================
export const sendMessage = async ({
  conversationId,
  senderId,
  type = "text",
  content = "",
  imgUrl = "",
}) => {
  // Kiểm tra xem cuộc trò chuyện có tồn tại không
  const conversation = await conversationRepository.findById(conversationId);
  if (!conversation) {
    throw ApiError.notFound("Conversation not found");
  }

  // Kiểm tra xem người dùng có thuộc cuộc trò chuyện
  const isParticipant = conversation.participants.some(
    (participant) => participant.userId._id.toString() === senderId.toString(),
  );
  if (!isParticipant) {
    throw ApiError.forbidden("You are not a participant");
  }

  // Tạo tin nhắn và lưu vào DB
  const message = await messageRepository.create({
    conversationId,
    senderId,
    type,
    content,
    imgUrl,
  });

  // Cập nhật tin nhắn mới nhất (last Message)
  await conversationRepository.updateLastMessage(conversationId, {
    _id: message._id,
    content: message.content,
    senderId: message.senderId,
    createdAt: message.createdAt,
  });

  // Tăng số lượng tin nhắn của người nhận lên 1
  const unreadCounts = {};
  conversation.participants.forEach((participant) => {
    const id = participant.userId._id.toString();

    unreadCounts[id] =
      id === senderId.toString()
        ? 0
        : (conversation.unreadCounts.get(id) || 0) + 1;
  });

  // Cập nhật thông tin những người đã xem tin nhắn này vào cuộc trò chuyện
  await conversationRepository.updateById(conversationId, {
    seenBy: [senderId],
    unreadCounts,
  });

  return message;
};

// ============================== GET MESSAGE ==============================
// Lấy tin nhắn từ cuộc hội thoại (phân trang)
export const getMessages = async (
  conversationId,
  { page = 1, limit = 30 } = {},
) => {
  // Kiêmt tra xem cuộc trò chuyện có tồn tại
  const conversation = await conversationRepository.findById(conversationId);
  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  return messageRepository.findByConversation(conversationId, {
    page,
    limit,
  });
};

// ============================== SEND MESSAGE ==============================
// Xoá tin nhắn
export const deleteMessage = async (messageId) => {
  // Kiểm tra tin nhắn có tồn tại không
  const message = await messageRepository.findById(messageId);
  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  // Xoá tin nhắn
  await messageRepository.deleteById(messageId);

  return;
};
