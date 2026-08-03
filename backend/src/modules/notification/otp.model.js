import mongoose from "mongoose";

/*
    user: otp cho ai
    code: Chuỗi mã OTP đã được mã hoá
    expiresAt: Hết hạn lúc nào
    used: Đã được sử dụng chưa?
*/

const otpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    code: {
      type: String,
    },

    expiresAt: {
      type: Date,
    },

    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// 1. Tự động dọn dẹp (xóa) document khi hết hạn
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 2. Tối ưu câu truy vấn tìm kiếm OTP mới nhất chưa sử dụng của User
otpSchema.index({ user: 1, used: 1, createdAt: -1 });

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
