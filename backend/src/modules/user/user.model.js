import mongoose from "mongoose";

/*
  username: Tên đăng nhập duy nhất
  email: Email đăng nhập và nhận thông báo
  displayName: Tên hiển thị người dùng đặt
  password: Mật khẩu đã mã hoá
  avatar: Ảnh đại diện
  bio: Tiểu sử ngắn
  status: Trạng thái hoạt động
  lastSeen: Thời gian tương tác cuối cùng
  role: Phân quyền người dùng trong hệ thống
  isVerified: Trạng thái đã xác thực email chưa
*/

const userSchema = new mongoose.Schema(
  {
    // Tên đăng nhập duy nhất
    username: {
      type: String,
      required: true,
      unique: true,
    },

    // Email đăng nhập và nhận thông báo
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Tên hiển thị người dùng đặt
    displayName: {
      type: String,
      default: null,
    },

    // Mật khẩu (mã hoá bcrypt)
    password: {
      type: String,
      required: true,
      select: false,
    },

    // Link URL ảnh đại diện
    avatar: {
      type: String,
      default: null,
    },

    // Tiểu sử ngắn của người dùng
    bio: {
      type: String,
      default: null,
    },

    // Trạng thái hoạt động
    status: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
    },

    // Thời gian tương tác cuối cùng
    lastSeen: {
      type: Date,
      default: null,
    },

    // Phân quyền người dùng trong hệ thống
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Trạng thái đã xác thực email chưa
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
