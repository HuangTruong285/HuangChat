import mongoose from "mongoose";

/*
    type: Loại phòng private hay group
    member: Các thành viên trong phòng
    name: Tên phòng
    avatar: Avatar phòng
    owner: Chủ phòng (chỉ dùng cho group)
    lastMessage: Tin nhắn cuối cùng
    lastMessageAt: Thời gian tin nhắn cuối cùng
    
*/

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["private", "group"],
    },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    name: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timesstamps: true,
    versionKey: false,
  },
);

// Tối ưu tốc độ truy vấn danh sách cuộc trò chuyện của 1 user
conversationSchema.index({ members: 1, lastMessageAt: -1 });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
