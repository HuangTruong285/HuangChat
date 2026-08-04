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
const participantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false, // Không cần id
  },
);

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    _id: false,
  },
);

const lastMessageSchema = new mongoose.Schema(
  {
    _id: { type: String },
    content: {
      type: String,
      default: null,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  },
);

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },
    participants: {
      type: [participantSchema],
      required: true,
    },
    group: {
      type: groupSchema,
    },
    lastMessage: {
      type: lastMessageSchema,
      ref: "Message",
      default: null,
    },
    lastMessageAt: {
      type: Date,
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    unReadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
    timesstamps: true,
    versionKey: false,
  },
);

// Tối ưu tốc độ truy vấn danh sách cuộc trò chuyện của 1 user
conversationSchema.index({
  "participant.userId": 1,
  lastMessageAt: -1,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
