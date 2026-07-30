import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User model dùng để lưu thông tin người dùng trong MongoDB.
 *
 * Các field chính:
 * - username: tên đăng nhập duy nhất
 * - displayName: tên hiển thị
 * - email: địa chỉ email duy nhất
 * - password: mật khẩu đã được mã hóa
 * - avatar: ảnh đại diện
 * - status: trạng thái online/offline
 *
 * Các method thường dùng:
 * - comparePassword(candidatePassword): kiểm tra mật khẩu khi đăng nhập
 *
 * Ví dụ dùng nhanh:
 * const user = await User.create({ username, email, password });
 * const isMatch = await user.comparePassword(password);
 */

// Định nghĩa cấu trúc dữ liệu của user trong MongoDB
const userSchema = new mongoose.Schema(
  {
    // Tên đăng nhập duy nhất, dùng để đăng nhập hoặc nhận diện user
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },

    // Tên hiển thị trên giao diện
    displayName: {
      type: String,
      trim: true,
      maxlength: [50, "Display name cannot exceed 50 characters"],
    },

    // Email dùng để đăng nhập, liên hệ và xác thực tài khoản
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      maxlength: [255, "Email cannot exceed 255 characters"],
    },

    // Mật khẩu của người dùng, sẽ được mã hóa trước khi lưu
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    // Ảnh đại diện của người dùng
    avatar: {
      type: String,
      default: null,
    },

    // Trạng thái online/offline của user
    status: {
      type: String,
      enum: ["offline", "online", "busy", "away"],
      default: "offline",
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    versionKey: false, // Không lưu field __v
  },
);

// Tự động gán displayName bằng username nếu người dùng bỏ trống
userSchema.pre("validate", function (next) {
  if (!this.displayName && this.username) {
    this.displayName = this.username;
  }
});

// Trước khi lưu user, nếu password bị thay đổi thì mã hóa mật khẩu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Hàm kiểm tra mật khẩu khi người dùng đăng nhập
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password || !candidatePassword) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const transformFn = (_doc, ret) => {
  delete ret.password;
  return ret;
};
// Khi trả về dữ liệu user, ẩn password để bảo mật
userSchema.set("toJSON", { transform: transformFn });
// Tương tự khi chuyển object sang JSON
userSchema.set("toObject", { transform: transformFn });

const User = mongoose.model("User", userSchema);

export default User;
