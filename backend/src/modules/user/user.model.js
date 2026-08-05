import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Tên tài khoản dùng để đăng nhập / nhận diện hệ thống
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Email người dùng
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Mật khẩu đã được mã hóa
    hashedPassword: {
      type: String,
      required: true,
    },

    // Tên hiển thị trong ứng dụng chat
    displayName: {
      type: String,
      required: true,
    },
    // Đường dẫn ảnh đại diện (URL)
    avatar: {
      type: String,
      default: null,
    },

    // Trạng thái hoạt động phục vụ hiển thị online/offline trong ứng dụng chat
    status: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
