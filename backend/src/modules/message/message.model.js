import mongoose from "mongoose";

/*
    conversation: nằm trong phòng nào
    sender: ai gửi
    type: loại tin nhắn (văn bản, file, ảnh,...)
    content: Nội dung
    replyTo: Trả lời cho tin nhắn nào
    edited: Đã chỉnh sửa chưa
    editedAt: Lưu thời gian chỉnh sửa
    deleted: tin nhắn bị xoá chưa
*/

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["text", "image", "file", "video", "audio", "system"],
      default: "text",
    },
    content: {
      type: String,
      default: null,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Tối ưu câu truy vấn lấy lịch sử tin nhắn theo thứ tự thời gian trong 1 phòng chat
messageSchema.index({ conversation: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
