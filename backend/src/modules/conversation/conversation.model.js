import mongoose from "mongoose";

// Schema thành viên
const participantSchema = new mongoose.Schema(
  {
    // ID người dùng
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Thời điểm người đó than gia cuộc trò chuyện
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

// Schema thông tin nhóm
const groupSchema = new mongoose.Schema(
  {
    // Tên nhóm
    name: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    // Đường dẫn ảnh đại diện
    avatarUrl: {
      type: String,
      default: null,
    },
    // ID người tạo nhóm
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    _id: false,
  },
);

// Schema tin nhắn cuối cùng (bản sao)
const lastMessageSchema = new mongoose.Schema(
  {
    // ID tin nhắn cuối
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // Nội dung tin nhắn
    content: {
      type: String,
      default: "",
    },
    // ID người gửi tin nhắn
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Thời gian tin nhắn được tạo
    createdAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  },
);

// Schema cuộc trò chuyện
const conversationSchema = new mongoose.Schema(
  {
    // Phân loại cuộc trò chuyện
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },

    // Thành viên tham gia
    participants: {
      type: [participantSchema],
      required: true,
    },

    // Chứa thông tin nhóm
    group: {
      type: groupSchema,
      default: null,
    },

    // Chưa thông tin bản sao tin nhắn cuối
    lastMessage: {
      type: lastMessageSchema,
      default: null,
    },

    // Thời gian gửi tin nhắn cuối cùng
    lastMessageAt: {
      type: Date,
      default: null,
    },

    // Mảng chứa danh sách ID những người đã xem tin nhắn cuối cùng
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Đếm số tin nhắn chưa đọc của từng người dùng.
    unreadCounts: {
      type: Map,
      of: Number,
      default: () => new Map(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Lấy danh sách cuộc trò chuyện của user theo thời gian hoạt động mới nhất
conversationSchema.index({
  "participants.userId": 1,
  lastMessageAt: -1,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
