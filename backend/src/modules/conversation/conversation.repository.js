import Conversation from "./conversation.model.js";

// ============================== CREATE ==============================

// Tạo một cuộc trò chuyện mới
export const create = async (data) => {
  return Conversation.create(data);
};

// ============================== READ / FIND ==============================

// TÌm cuộc trò chuyện theo ID
export const findById = async (conversationId) => {
  return Conversation.findById(conversationId)
    .populate("participants.userId", "displayName avatarUrl")
    .populate("group.createdBy", "displayName avatarUrl");
};

// Tìm cuộc trò chuyện 1-1 giữa hai người cụ thể
export const findDirectConversation = async (userAId, userBId) => {
  return Conversation.findOne({
    type: "direct",
    "participants.userId": {
      $all: [userAId, userBId],
    },
  });
};

// Lấy tất cả cuộc trò chuyện mà một người dùng tham gia
export const findByUser = async (userId) => {
  return Conversation.find({
    "participants.userId": userId,
  })
    .sort({ lastMessageAt: -1 })
    .populate("participants.userId", "displayName avatarUrl");
};

// ============================== UPDATE ==============================

// Cập nhật thông tin
export const updateById = async (conversationId, data) => {
  return Conversation.findByIdAndUpdate(conversationId, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

// Cập nhật tin nhắn mới nhất
export const updateLastMessage = async (
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
      returnDocument: "after",
    },
  );
};

// Thêm thành viên mới vào danh sách
export const addParticipant = async (conversationId, participant) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $push: {
        participants: participant,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

// Xoá một thành viên ra khỏi cuộc trò chuyện
export const removeParticipant = async (conversationId, userId) => {
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
      returnDocument: "after",
    },
  );
};

// Đánh dấu người dùng đã xem tin nhắn
export const markAsSeen = async (conversationId, userId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $addToSet: {
        seenBy: userId,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

// Đặt lại danh sách người dùng đã xem về rỗng
export const clearSeenBy = async (conversationId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      seenBy: [],
    },
    {
      returnDocument: "after",
    },
  );
};

// ============================== DELETE ==============================

// Xoá cuộc trò chuyện
export const deleteById = async (conversationId) => {
  return Conversation.findByIdAndDelete(conversationId);
};
