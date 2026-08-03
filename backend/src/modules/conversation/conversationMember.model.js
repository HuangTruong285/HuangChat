import mongoose from "mongoose";

/*
    conversation: Nhóm nào
    user: User nào
    nickname: Tên nickname của user
    role: Vai trò của user
    joinAt: Tham gia nhóm lúc nào
    lastReadMessage: Tin nhắn cuối cùng đã đọc
    mutedUntil: Kiểm tra xem user có tắt thông báo.
    leftAt: Thời gian rời nhóm
*/

const conversationMemberSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nickname: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },
    joinAt: {
      type: Date,
      default: Date.now,
    },
    lastReadMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    mutedUntil: {
      type: Date,
      default: null,
    },
    leftAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Đảm bảo một user không bị trùng lặp trong cùng một conversation
conversationMemberSchema.index({ conversation: 1, user: 1 }, { unique: true });

// Tối ưu tìm danh sách các phòng chat đang hoạt động của user (chưa rời nhóm)
conversationMemberSchema.index({ user: 1, leftAt: 1 });

const ConversationMember = mongoose.model(
  "ConversationMember",
  conversationMemberSchema,
);

export default ConversationMember;
