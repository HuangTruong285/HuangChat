import Conversation from "./conversation.model.js";

// ============================== CREATE ==============================

// Tạo một cuộc trò chuyện mới
const create = (data) => {
  return Conversation.create(data);
};

// ============================== READ / FIND ==============================

// TÌm cuộc trò chuyện theo ID
const findById = (conversationId) => {
  return Conversation.findById(conversationId)
    .populate("participants.userId", "displayName avatarUrl")
    .populate("group.createdBy", "displayName avatarUrl");
};

// Tìm cuộc trò chuyện 1-1 giữa hai người cụ thể
const findDirectConversation = (userAId, userBId) => {
  return Conversation.findOne({
    type: "direct",
    "participants.userId": {
      $all: [userAId, userBId],
    },
  });
};

// Lấy tất cả cuộc trò chuyện mà một người dùng tham gia
const findByUser = (userId) => {
  return Conversation.find({
    "participants.userId": userId,
  })
    .sort({ lastMessageAt: -1 })
    .populate("participants.userId", "displayName avatarUrl");
};

// ============================== UPDATE ==============================

// Cập nhật thông tin
const updateById = (conversationId, data) => {
  return Conversation.findByIdAndUpdate(conversationId, data, {
    new: true,
    runValidators: true,
  });
};

// Cập nhật tin nhắn mới nhất
const updateLastMessage = (
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
const addParticipant = (conversationId, participant) => {
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
const removeParticipant = (conversationId, userId) => {
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
const markAsSeen = (conversationId, userId) => {
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
const clearSeenBy = (conversationId) => {
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
const deleteById = (conversationId) => {
  return Conversation.findByIdAndDelete(conversationId);
};
