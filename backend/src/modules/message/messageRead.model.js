import mongoose from "mongoose";

/*
    message: Tin nhắn nào
    user: người nào đọc
    readAt: Đọc lúc nào
*/

const messageReadSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // Dùng duy nhất field readAt để tối ưu dung lượng DB
    versionKey: false,
  },
);

// 1. Đảm bảo 1 user chỉ có 1 bản ghi "đã xem" cho 1 tin nhắn duy nhất
messageReadSchema.index({ message: 1, user: 1 }, { unique: true });

// 2. Tối ưu tìm kiếm danh sách user đã đọc một tin nhắn cụ thể
messageReadSchema.index({ message: 1, readAt: -1 });

const MessageRead = mongoose.model("MessageRead", messageReadSchema);

export default MessageRead;
