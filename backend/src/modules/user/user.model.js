import mongoose from "mongoose";

/*
  username: Tên đăng nhập duy nhất
  email: Email đăng nhập và nhận thông báo
  password: Mật khẩu đã mã hoá

  displayName: Tên hiển thị người dùng đặt
  avatar: Ảnh đại diện
  bio: Tiểu sử ngắn

  status: Trạng thái hoạt động
  lastSeen: Thời gian tương tác cuối cùng

  isVerified: Trạng thái xác thực tài khoản
  isActive: Khoá / Mở khoá tài khoản
*/

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    displayName: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["offline", "online", "away", "busy"],
      default: "offline",
    },
    lastSeen: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
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
