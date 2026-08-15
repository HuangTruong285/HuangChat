import Message from "./message.model.js";

// ============================== DELETE ==============================

// Tạo một message
export const create = async (messageData) => {
  return Message.create(messageData);
};

// ============================== READ / FIND ==============================

// Tìm tin nhắn theo id tin nhắn
export const findById = async (messageId) => {
  return Message.findById(messageId);
};

// Lấy tin nhắn của một cuộc trò chuyện với cơ chế phân trang
export const findByConversation = async (
  conversationId,
  { page = 1, limit = 30 } = {},
) => {
  const skip = (page - 1) * limit;

  return Message.find({ conversationId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .populate("senderId", "displayName avatarUrl");
};

// Lấy tin nhắn mới nhất của một cuộc trò chuyện
export const findLatestByConversation = async (conversationId) => {
  return Message.findOne({ conversationId })
    .sort({ createdAt: -1 })
    .populate("senderId", "displayName avatarUrl");
};

// Đếm tổng số tin nhắn có trong cuộc trò chuyện này
export const countByConversation = async (conversationId) => {
  return Message.countDocuments({ conversationId });
};

// ============================== UPDATE ==============================

// Cập nhật thông tin tin nhắn
export const updateById = async (messageId, data) => {
  return Message.findByIdAndUpdate(messageId, data, {
    new: true,
    runValidators: true,
  });
};

// ============================== DELETE ==============================

// Xoá tin nhắn theo id message
export const deleteById = async (messageId) => {
  return Message.findByIdAndDelete(messageId);
};
