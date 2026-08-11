import Conversation from "./conversation.model.js";

// ============================== CREATE ==============================

// Tạo một cuộc trò chuyện mới
export const create = (data) => {
  return Conversation.create(data);
};

// ============================== READ / FIND ==============================

// TÌm cuộc trò chuyện theo ID
export const findById = (conversationId) => {
  return Conversation.findById(conversationId)
    .populate("participants.userId", "displayName avatarUrl")
    .populate("group.createdBy", "displayName avatarUrl");
};

// Tìm cuộc trò chuyện 1-1 giữa hai người cụ thể
export const findDirectConversation = (userAId, userBId) => {
  return Conversation.findOne({
    type: "direct",
    "participants.userId": {
      $all: [userAId, userBId],
    },
  });
};

// Lấy tất cả cuộc trò chuyện mà một người dùng tham gia
export const findByUser = (userId) => {
  return Conversation.find({
    "participants.userId": userId,
  })
    .sort({ lastMessageAt: -1 })
    .populate("participants.userId", "displayName avatarUrl");
};

// ============================== UPDATE ==============================

// Cập nhật thông tin
export const updateById = (conversationId, data) => {
  return Conversation.findByIdAndUpdate(conversationId, data, {
    new: true,
    runValidators: true,
  });
};

// Cập nhật tin nhắn mới nhất
export const updateLastMessage = (
  conversationId,
  lastMessage,
  lastMessageAt = new Date(),
) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      lastMessage,
      lastMessageAt,
    },
    {
      new: true,
    },
  );
};

// Thêm thành viên mới vào danh sách
export const addParticipant = (conversationId, participant) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $push: {
        participants: participant,
      },
    },
    {
      new: true,
    },
  );
};

// Xoá một thành viên ra khỏi cuộc trò chuyện
export const removeParticipant = (conversationId, userId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $pull: {
        participants: {
          userId,
        },
      },
    },
    {
      new: true,
    },
  );
};

// Đánh dấu người dùng đã xem tin nhắn
export const markAsSeen = (conversationId, userId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $addToSet: {
        seenBy: userId,
      },
    },
    {
      new: true,
    },
  );
};

// Đặt lại danh sách người dùng đã xem về rỗng
export const clearSeenBy = (conversationId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      seenBy: [],
    },
    {
      new: true,
    },
  );
};

// ============================== DELETE ==============================

// Xoá cuộc trò chuyện
export const deleteById = (conversationId) => {
  return Conversation.findByIdAndDelete(conversationId);
};
