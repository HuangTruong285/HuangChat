import Message from "./message.model.js";

// ============================== DELETE ==============================

// Tạo một message
const create = (messageData) => {
  return Message.create(messageData);
};

// ============================== READ / FIND ==============================

// Tìm tin nhắn theo id tin nhắn
const findById = (messageId) => {
  return Message.findById(messageId);
};

// Lấy tin nhắn của một cuộc trò chuyện với cơ chế phân trang
const findByConversation = (conversationId, { page = 1, limit = 30 } = {}) => {
  const skip = (page - 1) * limit;

  return Message.find({ conversationId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("senderId", "displayName avatarUrl");
};

// Lấy tin nhắn mới nhất của một cuộc trò chuyện
const findLatestByConversation = (conversationId) => {
  return Message.findOne({ conversationId })
    .sort({ createdAt: -1 })
    .populate("senderId", "displayName avatarUrl");
};

// Đếm tổng số tin nhắn có trong cuộc trò chuyện này
const countByConversation = (conversationId) => {
  return Message.countDocuments({ conversationId });
};

// ============================== UPDATE ==============================

// Cập nhật thông tin tin nhắn
const updateById = (messageId, data) => {
  return Message.findByIdAndUpdate(messageId, data, {
    new: true,
    runValidators: true,
  });
};

// ============================== DELETE ==============================

// Xoá tin nhắn theo id message
const deleteById = (messageId) => {
  return Message.findByIdAndDelete(messageId);
};
