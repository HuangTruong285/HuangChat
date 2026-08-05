import mongoose from "mongoose";

// Schema tin nhắn
const messageSchema = new mongoose.Schema(
  {
    // ID cuộc trò chuyện của tin nhắn này
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    // ID của người gửi tin nhắn
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Loại tin nhắn
    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    // Nội dung văn bản của tin nhắn
    content: {
      type: String,
      trim: true,
      default: "",
    },
    // Đường dẫn (URL) của hình ảnh nếu tin nhắn thuộc loại Image
    imgUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Chỉ mục kết hợp tối ưu tốc độ truy vấn
messageSchema.index({
  conversationId: 1,
  createdAt: -1,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
