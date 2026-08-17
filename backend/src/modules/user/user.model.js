import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Tên tài khoản dùng để đăng nhập
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Email người dùng
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Mật khẩu đã được mã hóa (không lưu mật khẩu thô để bảo mật)
    hashedPassword: {
      type: String,
      required: true,
      select: false,
    },

    // Tên hiển thị trong ứng dụng chat (ví dụ: Biệt danh, Tên thật)
    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    // Đường dẫn xem ảnh đại diện (URL)
    avatarUrl: {
      type: String,
      default: null,
    },

    // ID quản lý ảnh đại diện (thường dùng khi lưu ảnh trên Cloudinary/S3)
    avatarId: {
      type: String,
      default: null,
    },

    // Trạng thái hoạt động phục vụ hiển thị online/offline trong ứng dụng chat
    status: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
    },

    // Thời gian user hoạt động lần cuối
    lastSeen: {
      type: Date,
      default: null,
    },

    // Tài khoản còn hoạt động không
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
