import mongoose from "mongoose";

// Định nghĩa cấu trúc dữ liệu của user trong MongoDB
const userSchema = new mongoose.Schema(
  {
    // Tên đăng nhập duy nhất, dùng để đăng nhập hoặc nhận diện user
    username: {
      type: String,
      required: true,
      unique: true,
    },

    // Email dùng để đăng nhập, liên hệ và xác thực tài khoản
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Mật khẩu của người dùng, sẽ được mã hóa trước khi lưu
    password: {
      type: String,
      required: true,
      select: false,
    },

    // Ảnh đại diện của người dùng
    avatar: {
      type: String,
      default: "",
    },

    // Trạng thái online/offline của user
    status: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
    },

    // Thời gian người dùng hoạt động lần cuối, dùng để hiển thị trạng thái online/offline
    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
