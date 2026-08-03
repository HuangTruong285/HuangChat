import mongoose from "mongoose";

/*
    receiver: Ai nhận thông báo
    sender: Ai là người gửi, null nếu là thông báo từ hệ thống
    type: Loại thông báo. Ví dụ các value phổ biến: "FRIEND_REQUEST", "FRIEND_ACCEPT", "NEW_MESSAGE", "GROUP_INVITE", "SYSTEM"
    title: Tiêu đề
    content: Nội dung
    isRead: Đã đọc chưa?
*/

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
    },

    title: {
      type: String,
    },

    content: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Chỉ cần createdAt, không cần updatedAt
    versionKey: false,
  },
);

// Tối ưu truy vấn lấy danh sách thông báo của 1 user theo thời gian mới nhất + lọc chưa đọc
notificationSchema.index({ receiver: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
